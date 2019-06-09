import { Component, OnInit, Inject } from '@angular/core';
import { Filters, DateInterval, SearchService } from '../services/search/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResearchInteractionService } from '../services/research/research-interaction.service';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth/authentication.service';

declare var createSelectionList: any;

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
    private researches: Object[] = [];
    private liked: number[] = [];
    private subscribed: number[] = [];
    private keyword: string;
    private filters: Filters = null;
    private pagination = {
        currentPage: 0,
        range: [],
        next: 0,
        prev: 0
    }

    constructor(@Inject("SearchService") private searchService: SearchService, 
        private auth: AuthenticationService,
        private activatedRoute: ActivatedRoute,
        private interactionService: ResearchInteractionService) { 
        interactionService.getLikesForCurrentUser()
            .subscribe(resp => this.liked = resp);
        interactionService.getSubscriptionsForCurrentUser()
            .subscribe(resp => this.subscribed = resp);
    }

	ngOnInit() {
		document.getElementById("filters-toggle")
		    .addEventListener("click", function(e) {
			    let filters = document.getElementById("filters");
			    filters.classList.toggle("filters-collapsed");
			    filters.classList.toggle("filters-expanded");
            });
        this.searchByKeywordIfPresent();
	}

	public applyFilters() {
        this.filters = this.gatherFilters();
        this.fetchPage(0);
    }

    private searchByKeywordIfPresent() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.keyword) {
                this.keyword = params.keyword;
                this.applyFilters();
            }
        });
    }

    searchByKeywordClick() {
        this.applyFilters();
    }

    searchByKeywordKeydown(event: any) {
        let enter = 13;
        if (event.keyCode === enter) {
            this.applyFilters();
        }
    }
    
    like(id: number) {
        if (!this.isLiked(id)) {
            this.interactionService.like(id).subscribe();
            this.liked.push(id);
            this.findResearchById(id)["likes"]++;
        } else {
            this.interactionService.removeLike(id).subscribe();
            this.liked = this.liked.filter(i => i !== id);
            this.findResearchById(id)["likes"]--;
        } 
    }

    subscribe(id: number) {
        if (!this.isSubscribed(id)) {
            this.interactionService.subscribe(id).subscribe();
            this.subscribed.push(id);
            this.findResearchById(id)["subscriptions"]++;
        } else {
            this.interactionService.unsubscribe(id).subscribe();
            this.subscribed = this.subscribed.filter(i => i !== id);
            this.findResearchById(id)["subscriptions"]--;
        }
    }

    private findResearchById(id: number): Object {
        return this.researches.filter(r => r["id"] === id)[0];
    }

    isLiked(id: number): boolean {
        return this.auth.isAuthenticated() && 
            this.liked.includes(id);
    }

    isSubscribed(id: number): boolean {
        return this.auth.isAuthenticated() && 
            this.subscribed.includes(id);
    }

    classForLiked(id: number): string {
        if (this.isLiked(id)) {
            return "liked";
        }
        return "";
    }

    classForSubscribed(id: number): string {
        if (this.isSubscribed(id)) {
            return "subscribed";
        }
        return "";
    }

    private fetchPage(page: number) : void {
        this.searchService.fetchPage(this.filters, { page: page, size: 10 })
            .then(res => {
                this.researches = res.researches;
                let controls = 4;
                let range = [];
                if (res.totalPages != 0) {
                    let from, to;
                    if (page < controls - 1) {
                        from = 0;
                        to = controls;
                    } else {
                        from = page - Math.floor(controls / 2);
                        to = page + Math.floor(controls / 2);
                    }
                    to = to < res.totalPages ? to : res.totalPages;
                    for (let i = from; i < to; i++) {
                        range.push(i);
                    }
                }
                this.pagination = {
                    currentPage: page,
                    range: range,
                    next: page < res.totalPages - 1 ? page + 1 : page,
                    prev: page > 0 ? page - 1 : 0 
                };
            })
    }

	private gatherFilters() : Filters {
        let res: Filters = {};
        let date = this.getCreationInterval();
        let services = this.getChoosenServices();
        let sortBy = this.getSortParameter();
        let analyser = this.getAnalyser();
        if (Object.keys(date).length != 0) {
            res.date = date;
        }
        if (services.length != 0) {
            res.services = services;
        }
        if (sortBy) {
            res.sortBy = sortBy;
        }
        if (analyser) {
            res.analyser = analyser;
        }
        if (this.keyword) {
            res.keyword = this.keyword;
        }
        return res;
    }

    private getChoosenServices() {
        let temp = document.querySelectorAll("[data-filter-service]");
        let res: string[] = [];
        for (let i = 0; i < temp.length; i++) {
            let input = temp[i];
            if (input["checked"]) {
                res.push(input.getAttribute("data-filter-service"));
            }
        }
        return res;
    }

    private getCreationInterval() {
        let begin = document.getElementById("filter-date-from")["value"];
        let end = document.getElementById("filter-date-to")["value"];
        let res: DateInterval = {};
        if (begin != "") {
            res.begin = begin;
        }
        if (end != "") {
            res.end = end;
        }
        return res;
    }

    private getSortParameter(): string {
        return this.queryOption("filter-options-sort-by");
    }

    private getAnalyser() : string {
        return this.queryOption("filter-options-analyser");
    }

    private queryOption(name: string) {
        let res = document.querySelectorAll(`input[name='${name}'`);
        for (let i = 0; i < res.length; i++) {
            if (res[i]["checked"]) {
                return res[i]["value"];
            }
        }
        return "";
    }
}
