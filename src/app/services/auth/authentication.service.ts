import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { SERVER } from "../shared";

// assets/js/util/cookie
declare var getCookie: any;
declare var setCookie: any;
declare var deleteCookie: any;
declare var jwt_decode: any;

export interface HttpResponseCallback {
	(response: HttpResponse<Object>) : void;
}

export interface HttpErrorResponseCallback {
	(error: HttpErrorResponse) : void;
}

export interface Request {
	method: string;
	url: string,
	headers?: Object,
	body?: any
}

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private authEndpoint = SERVER + "";
	private endpoints = {
		registration: {
			url: this.authEndpoint + "/registration",
			method: "POST"
		},
		login: {
			url: this.authEndpoint + "/login",
			method: "POST"
		},
		logoutAccess: {
			url: this.authEndpoint + "/logout/access",
			method: "POST"
		},
		logoutRefresh: {
			url: this.authEndpoint + "/logout/refresh",
			method: "POST"
		},
		refresh: {
			url: this.authEndpoint + "/token/refresh",
			method: "POST"
		}
	};

	constructor(private http: HttpClient) { }

	public register(
		formData: Object, 
		onSuccess?: HttpResponseCallback,
		onFailure?: HttpErrorResponseCallback
	) {
		this.http.request(
			this.endpoints.registration.method,
			this.endpoints.registration.url,
			{
				body: formData,
				observe: "response"
			}
		).subscribe(
			response => {
				let credentials = {
					id: response.body["id"],
					access_token: response.body["access_token"],
					refresh_token: response.body["refresh_token"]
				}
				setCookie("userCredentials", JSON.stringify(credentials));
				if (onSuccess) {
					onSuccess(response);
				}
			},
			error => {
				if (onFailure) {
					onFailure(error);
				}
			}
		);
	}

	public login(
		formData: Object,
		onSuccess?: HttpResponseCallback,
		onFailure?: HttpErrorResponseCallback
	) {
		this.http.request(
			this.endpoints.login.method,
			this.endpoints.login.url,
			{
				body: formData,
				observe: "response"
			}
		).subscribe(
			response => {
				let credentials = {
					id: response.body["id"],
					access_token: response.body["access_token"],
					refresh_token: response.body["refresh_token"]
				}
				setCookie("userCredentials", JSON.stringify(credentials));
				if (onSuccess) {
					onSuccess(response);
				}
			},
			error => {
				if (onFailure) {
					onFailure(error);
				}
			}
		);
	}

	public logout() {
		let credentials = getCookie("userCredentials");
		if (!credentials) {
			return;
		}
		let jsonCredentials = JSON.parse(credentials);
		deleteCookie("userCredentials");
		this.http.request(
			this.endpoints.logoutAccess.method,
			this.endpoints.logoutAccess.url,
			{
				headers: {
					Authorization: `Bearer ${jsonCredentials["access_token"]}`
				}
			}
		).subscribe(response => {
			this.http.request(
				this.endpoints.logoutRefresh.method,
				this.endpoints.logoutRefresh.url,
				{
					headers: {
						Authorization: `Bearer ${jsonCredentials["refresh_token"]}`
					}
				}
			);
		});
	}

	public isAuthenticated() : boolean {
		return getCookie("userCredentials") != undefined;
	}

	public getAccessToken() {
		let jsonCredentials = JSON.parse(getCookie("userCredentials"));
		return jsonCredentials["access_token"];
	}

	private getCredentials() : Object {
		return JSON.parse(getCookie("userCredentials"));
	}

	public onBehalf(request: Request) : Promise<any> {
		let credentials = this.getCredentials();
		if (this.isTokenExpired(credentials)) {
			return this.refreshToken(credentials)
				.toPromise()
				.then(response => {
					credentials["access_token"] = response["access_token"];
					this.resetCredentials(credentials);
					return this.sendRequestOnBehalf(credentials, request);
				});
		} else {
			return this.sendRequestOnBehalf(credentials, request);
		}
	}

	private resetCredentials(newCredentials: Object) {
		deleteCookie("userCredentials");
		setCookie("userCredentials", JSON.stringify(newCredentials));
	}

	private sendRequestOnBehalf(credentials: Object, request: Request) : Promise<any> {
		let accessToken = credentials["access_token"];
		let headers = {
			Authorization: `Bearer ${accessToken}`
		};
		if (request.headers) {
			this.mergeHeaders(headers, request.headers);
		}
		return this.http.request(
			request.method,
			request.url,
			{
				body: request.body,
				headers: headers
			}
		)
		.toPromise();
	}

	private mergeHeaders(target: Object, source: Object) {
		for (let header in source) {
			if (source.hasOwnProperty(header)) {}
			target[header] = source[header];
		}
	}

	private isTokenExpired(credentials: Object) : boolean {
		let jwt = jwt_decode(credentials["access_token"]);
		let expires = jwt["exp"] * 1000;
		let now = new Date().getTime();
		if (expires <= now) {
			return true;
		}
		return false;
	}

	private refreshToken(credentials: Object) : Observable<any> {
		let refreshToken = credentials["refresh_token"];
		return this.http.post(
			this.endpoints.refresh.url, null, {
				headers: {
					Authorization: `Bearer ${refreshToken}`
				}
			}
		);
	}
}
