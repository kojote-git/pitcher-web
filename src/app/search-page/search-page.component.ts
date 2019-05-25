import { Component, OnInit, Inject } from '@angular/core';
import { Filters, DateInterval, SearchService } from '../services/search/search.service';

declare var createSelectionList: any;

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
    private researches: Object[] = [];
    private keyword: string;

	constructor(@Inject("SearchService") private searchService: SearchService) { 
        searchService.findAll()
            .subscribe(researches => this.researches = researches);
    }

	ngOnInit() {
		document.getElementById("filters-toggle")
		.addEventListener("click", function(e) {
			let filters = document.getElementById("filters");
			filters.classList.toggle("filters-collapsed");
			filters.classList.toggle("filters-expanded");
		});
	}

	public applyFilters() {
        this.searchService.filter(this.gatherFilters())
            .subscribe(researches => this.researches = researches);
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
