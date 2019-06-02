import { Component, OnInit } from '@angular/core';
import { DetailedSearchService, DetailedResearchView, PlayStoreDetails } from '../services/search/detailed-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import TwitterComponent from './twitter.component';
import { PlayStoreComponent } from './playstore.component';
import { start } from 'repl';

@Component({
	selector: 'app-research',
	templateUrl: './research.component.html',
	styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
	private research: DetailedResearchView;
	private playstore: PlayStoreDetails;
	private serviceShown: string;

	constructor(
		private searchService: DetailedSearchService,
		private route: ActivatedRoute,
		private router: Router
	) {
		route.params.subscribe(params => {
			this.searchService.findById(params["id"]).then(resp => {
				this.research = resp;
				this.showService(this.research.active_modules[0]);
			});
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
				case "play_store":
					this.displayService(service);
					new PlayStoreComponent(this.research.id, this.searchService, this);
					break;
			}
		}
	}

	setPlayStoreDetails(playStoreDetails: PlayStoreDetails) {
		this.playstore = playStoreDetails;
	}

	private displayService(service: string) {
		if (this.serviceShown) {
			document.querySelector(`[data-service="${this.serviceShown}"]`)
				.classList.add("hidden");
		}
		document.querySelector(`[data-service="${service}"]`)
			.classList.remove("hidden");
		this.serviceShown = service;
	}

	getStarForRate(star: number) : string {
		if (this.playstore) {
			let rate = this.playstore.app_info.rate;
			if (rate > star) {
				return "fas fa-star";
			} else if (rate + 0.5 >= star) {
				return "fas fa-star-half-alt";
			} else {
				return "far fa-star";
			}
		}
	}
}
