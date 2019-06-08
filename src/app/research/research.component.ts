import { Component, OnInit } from '@angular/core';
import { DetailedSearchService, DetailedResearchView, PlayStoreDetails, GoogleTrendsDetails, DateRange, NewspapersDetails } from '../services/search/detailed-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TwitterComponent } from './twitter';
import { PlayStoreComponent } from './playstore';
import { TrendsComponent } from './trends';
import { NewspapersComponent } from './newspapers';

@Component({
	selector: 'app-research',
	templateUrl: './research.component.html',
	styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
	private research: DetailedResearchView = {
		id: 0, topic: "", keywords: [],
		owner: {id:0, username: "", fullname: ""},
		active_modules: [], likes: 0, description: "",
		subscriptions:0, views:0, last_update:"", creation:""
	};
	private playstore: PlayStoreDetails;
	private trends: GoogleTrendsDetails;
	private newspapers: NewspapersDetails;
	private serviceShown: string;
	private serviceDateFrom: string;
	private serviceDateTo: string;

	constructor(
		private searchService: DetailedSearchService,
		private route: ActivatedRoute,
		private router: Router
	) {
		route.params.subscribe(params => {
			this.searchService.findById(params["id"]).then(resp => {
				this.research = resp;
				this.showService(this.research.active_modules[0]);
			}).catch(error => router.navigate(["/"]));
		});
	}

	ngOnInit() {
		
	}

	isDisabled(service: string) {
		return this.research ? !this.research.active_modules.includes(service) : true;
	}

	isActive(service: string) {
		return this.serviceShown == service ? "service-button-active" : "";
	}

	showService(service: string, dateRange?: DateRange) {
		if (this.research.active_modules.includes(service)) {
			switch (service) {
				case "twitter":
					this.displayService(service);
					new TwitterComponent(this.research.id, this.searchService, dateRange);
					break;
				case "play_store":
					this.displayService(service);
					new PlayStoreComponent(this.research.id, this.searchService, this, dateRange);
					break;
				case "search":
					this.displayService(service);
					new TrendsComponent(this.research.id, this, this.searchService, dateRange);
					break;
				case "news":
					this.displayService(service);
					new NewspapersComponent(this.research.id, this.searchService, this, dateRange);
					break;
			}
		}
	}

	refreshService() {
		let from = this.serviceDateFrom ? Date.parse(this.serviceDateFrom).toString(("dd.MM.yyyy" as any)) : "";
		let to = this.serviceDateTo ? Date.parse(this.serviceDateTo).toString(("dd.MM.yyyy" as any)) : "";
		this.showService(this.serviceShown, { begin: from, end: to});
	}

	setPlayStoreDetails(playStoreDetails: PlayStoreDetails) {
		this.playstore = playStoreDetails;
	}

	setGoogleTrendsDetails(details: GoogleTrendsDetails) {
		this.trends = details;
	}

	setNewspapersDetails(details: NewspapersDetails) {
		this.newspapers = details;
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
