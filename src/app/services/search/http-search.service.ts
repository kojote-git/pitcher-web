import { SearchService, ResearchView, Filters, DateInterval } from './search.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

declare var Date: any;

@Injectable({
	providedIn: 'root'
})
export class HttpSearchService implements SearchService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<ResearchView[]> {
        return this.http.get<ResearchView[]>("http://localhost:5080/research/search")
            .pipe(
                map(resp => {
                    return resp["results"];  
                }),
                catchError(error => [])
            );
    }    
    
    filter(filters: Filters): Observable<ResearchView[]> {
        let params = {};
        if (filters.date) {
            this.addDateToParams(params, filters.date);
        }
        if (filters.services) {
            this.addServicesToParams(params, filters.services);   
        }
        if (filters.sortBy) {
            params["sorting"] = filters.sortBy;
        }
        let queryString = this.encodeQueryString(params);
        return this.http.get<ResearchView[]>("http://localhost:5080/research/search" + queryString)
            .pipe(
                map(resp => {
                    return resp["results"];
                })
            );
    }

    private addDateToParams(params: Object, date: DateInterval) {
        if (date.begin) {
            params["start_date"] = 
                Date.parseExact(date.begin, "yyyy-MM-dd").toString("dd.MM.yyyy");
        }
        if (date.end) {
            params["end_date"] = 
                Date.parseExcat(date.end, "yyyy-MM-dd").toString("dd.MM.yyyy");
        }
    }

    private addServicesToParams(params: Object, services: string[]) {
        let res = "";
        for (let i = 0; i < services.length; i++) {
            if (i == services.length - 1) {
                res += services[i];
            } else {
                res += services[i] + ",";
            }
        }
        params["modules"] = res;
    }

    
    findById(id: any): Observable<ResearchView> {
        throw new Error("Method not implemented.");
    }

    private encodeQueryString(params: Object) {
        const keys = Object.keys(params)
        return keys.length
            ? "?" + keys
                .map(key => encodeURIComponent(key)
                    + "=" + encodeURIComponent(params[key]))
                .join("&")
            : ""
    }
}