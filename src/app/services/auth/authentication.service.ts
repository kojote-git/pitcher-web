import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// assets/js/util/cookie
declare var getCookie: any;
declare var setCookie: any;
declare var deleteCookie: any;

export interface HttpResponseCallback {
	perform(response: HttpResponse<Object>) : void;
}

export interface HttpErrorResponseCallback {
	perform(error: HttpErrorResponse) : void;
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
				if (onSuccess) {
					onSuccess.perform(response);
				}
			},
			error => {
				if (onFailure) {
					onFailure.perform(error);
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
				let credentials = JSON.stringify(response.body);
				setCookie("userCredentials", credentials);
				if (onSuccess) {
					onSuccess.perform(response);
				}
			},
			error => {
				if (onFailure) {
					onFailure.perform(error);
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
					Authorization: `Token ${jsonCredentials["access_token"]}`
				}
			}
		);
		this.http.request(
			this.endpoints.logoutRefresh.method,
			this.endpoints.logoutRefresh.url,
			{
				headers: {
					Authorization: `Token ${jsonCredentials["refresh_token"]}`
				}
			}
		);
		deleteCookie("userCredentials");
	}

	public isAuthenticated() : boolean {
		return getCookie("userCredentials") != undefined;
	}
}
