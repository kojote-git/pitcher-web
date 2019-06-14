import { SearchService, ResearchView, Filters, DateInterval, PageSpecification, Page } from './search.service';
import { Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SERVER } from "../shared";

declare var Date: any;

@Injectable({
	providedIn: 'root'
})
export class HttpSearchService implements SearchService {
    fetchPage(filters: Filters, pageSpec: PageSpecification) : Promise<Page> {
        let start = (pageSpec.page * pageSpec.size) + 1;
        let limit = pageSpec.size;
        let res = this.http.get<Page>(`${SERVER}/research/search${this.encodeParams(filters)}&start=${start}&limit=${limit}`)
            .pipe(
                map(resp => {
                    let page: Page = {
                        totalPages: Math.ceil(resp["count"] / pageSpec.size),
                        size: pageSpec.size,
                        page: pageSpec.page,
                        researches: resp["results"]
                    }
                    return page;
                })
            );
        return res.toPromise();
    }

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<ResearchView[]> {
        return this.http.get<ResearchView[]>(`${SERVER}/research/search`)
            .pipe(
                map(resp => {
                    return resp["results"];  
                }),
                catchError(error => [])
            );
    }    
    
    filter(filters: Filters): Observable<ResearchView[]> {
        let queryString = this.encodeParams(filters);
        return this.http.get<ResearchView[]>(`${SERVER}/research/search${queryString}`)
            .pipe(
                map(resp => {
                    return resp["results"];
                })
            );
    }

    private encodeParams(filters: Filters): string {
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
        if (filters.analyser) {
            params["analyser"] = filters.analyser;
        }
        if (filters.keyword) {
            params["keyword"] = filters.keyword;
        }
        return this.encodeQueryString(params);
    }

    private addDateToParams(params: Object, date: DateInterval) {
        if (date.begin) {
            params["start_date"] = 
                Date.parseExact(date.begin, "yyyy-MM-dd").toString("dd.MM.yyyy");
        }
        if (date.end) {
            params["end_date"] = Date.parseExact(date.end, "yyyy-MM-dd").toString("dd.MM.yyyy");
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