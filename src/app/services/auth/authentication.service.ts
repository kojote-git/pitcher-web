import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// assets/js/util/cookie
declare var getCookie: any;
declare var setCookie: any;
declare var deleteCookie: any;

export interface HttpResponseCallback {
	(response: HttpResponse<Object>) : void;
}

export interface HttpErrorResponseCallback {
	(error: HttpErrorResponse) : void;
}

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private authEndpoint = "http://localhost:5080";
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
			).subscribe(response => {
				deleteCookie("userCredentials");
			});
		});
	}

	public isAuthenticated() : boolean {
		return getCookie("userCredentials") != undefined;
	}

	public getAccessToken() {
		let jsonCredentials = JSON.parse(getCookie("userCredentials"));
		return jsonCredentials["access_token"];
	}
}
