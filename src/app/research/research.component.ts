import { Component, OnInit } from '@angular/core';
import { DetailedSearchService, DetailedResearchView } from '../services/search/detailed-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-research',
	templateUrl: './research.component.html',
	styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
	private research: DetailedResearchView;

	constructor(
		private searchService: DetailedSearchService,
		private route: ActivatedRoute
	) {
		route.params.subscribe(params => {
			this.research = this.searchService.findById(params["id"]);
		});
	}

	ngOnInit() {
	}

}
