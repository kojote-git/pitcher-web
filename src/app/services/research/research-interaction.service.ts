import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ResearchInteractionService {
    private serverUrl = "http://localhost:5080";
    private endpoints = {
        postLike: {
            url: this.serverUrl + "/research/like",
            method: "POST"
        },
        getLikes: {
            url: this.serverUrl + "/research/like",
            method: "GET"
        },
        removeLike: {
            url: this.serverUrl + "/research/like",
            method: "DELETE"
        },
        getSubscriptions: {
            url: this.serverUrl + "/research/subscribe",
            method: "GET"
        },
        subscribe: {
            url: this.serverUrl + "/research/subscribe",
            method: "POST"
        },
        unsubscribe: {
            url: this.serverUrl + "/research/subscribe",
            method: "DELETE"
        }
    };

    constructor(private auth: AuthenticationService, private http: HttpClient) {
    }

    public getLikesForCurrentUser(): Observable<number[]> {
        if (!this.auth.isAuthenticated()) {
            return of([]);
        }
        let token = this.auth.getAccessToken();
        return from(
            this.auth.onBehalf({
                method: this.endpoints.getLikes.method,
                url: this.endpoints.getLikes.url
            })
        ).pipe(
            map(resp => resp["liked"]
                ? resp["liked"].map((obj: Object) => obj["id"])
                : []
            )
        );
    }

    public getSubscriptionsForCurrentUser(): Observable<number[]> {
        if (!this.auth.isAuthenticated()) {
            return of([]);
        }
        return from(
            this.auth.onBehalf({
                method: this.endpoints.getSubscriptions.method,
                url: this.endpoints.getSubscriptions.url
            })
        )
        .pipe(
            map(resp => resp["subscribed"]
                ? resp["subscribed"].map((obj: Object) => obj["id"])
                : []                
            )
        );
    }

    public like(researchId: number) : Observable<Object>{
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        return from(
            this.auth.onBehalf({
                method: this.endpoints.postLike.method,
                url: this.endpoints.postLike.url,
                body: {
                    research_id: researchId
                }
            })
        );
    }

    public removeLike(researchId: number): Observable<Object> {
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        return from(
            this.auth.onBehalf({
                method: this.endpoints.removeLike.method,
                url: this.endpoints.removeLike.url,
                body: {
                    research_id: researchId
                }
            })
        );
    }

    public subscribe(researchId: number): Observable<Object> {
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        return from(
            this.auth.onBehalf({
                method: this.endpoints.subscribe.method,
                url: this.endpoints.subscribe.url,
                body: {
                    research_id: researchId
                }
            })
        );
    }

    public unsubscribe(researchId: number): Observable<Object> {
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        return from(
            this.auth.onBehalf({
                method: this.endpoints.unsubscribe.method,
                url: this.endpoints.unsubscribe.url,
                body: {
                    research_id: researchId
                }
            })
        );
    }

    public postView(researchId: number) {

    }
}