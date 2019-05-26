import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
        return this.http.get(this.endpoints.getLikes.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .pipe(
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
        let token = this.auth.getAccessToken();
        return this.http.get(this.endpoints.getSubscriptions.url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
        let token = this.auth.getAccessToken();
        return this.http.post(this.endpoints.postLike.url, {
                research_id: researchId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    public removeLike(researchId: number): Observable<Object> {
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        let token = this.auth.getAccessToken();
        return this.http.request(
            this.endpoints.removeLike.method,
            this.endpoints.removeLike.url,
            {
                body: {
                    research_id: researchId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    public subscribe(researchId: number): Observable<Object> {
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        let token = this.auth.getAccessToken();
        return this.http.post(
            this.endpoints.subscribe.url,
            {
                research_id: researchId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

    public unsubscribe(researchId: number): Observable<Object> {
        if (!this.auth.isAuthenticated()) {
            return of({});
        }
        let token = this.auth.getAccessToken();
        return this.http.request(
            this.endpoints.unsubscribe.method,
            this.endpoints.unsubscribe.url,
            {
                body: {
                    research_id: researchId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    public postView(researchId: number) {

    }
}