import { Component, OnInit } from '@angular/core';
import { DetailedSearchService, DetailedResearchView } from '../services/search/detailed-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import TwitterComponent from './twitter.component';

@Component({
	selector: 'app-research',
	templateUrl: './research.component.html',
	styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
	private research: DetailedResearchView;
	private lastDisplayedService: string;

	constructor(
		private searchService: DetailedSearchService,
		private route: ActivatedRoute,
		private router: Router
	) {
		route.params.subscribe(params => {
			this.searchService.findById(params["id"]).then(resp => this.research = resp);
		});
	}

	ngOnInit() {
	}

	isDisabled(service: string) {
		return this.research ? !this.research.active_modules.includes(service) : true;
	}

	showService(service: string) {
		if (this.research.active_modules.includes(service)) {
			switch (service) {
				case "twitter":
					this.displayService(service);
					new TwitterComponent(this.research.id, this.searchService);
					break;
			}
		}
	}

	private displayService(service: string) {
		if (this.lastDisplayedService) {
			document.querySelector(`[data-service="${this.lastDisplayedService}"]`)
				.classList.add("hidden");
		}
		document.querySelector(`[data-service="${service}"]`)
			.classList.remove("hidden");
		this.lastDisplayedService = service;
	}
}
