import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-research-creation',
	templateUrl: './research-creation.component.html',
	styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent implements OnInit {
	private keywords: string[] = [];
	private topic = "";
	private description = "";
	private appName = "";
	private appDev = "";
	private appId = "";

	constructor(private authService: AuthenticationService, private router: Router) {
		if (!authService.isAuthenticated()) {
			router.navigate(["/"]);
		}
	}

	ngOnInit() {
		document.getElementById("google-play-service")
			.addEventListener("click", this.toggleGooglePlaySection);
		document.querySelectorAll('input[name="google-play-suboption"]')
			.forEach(element => {
				element.addEventListener("change", this.toggleGooglePlaySuboption);
			});
		document.getElementById("use-auto-update")
			.addEventListener("change", this.toggleUseAutoUpdateOptions);
		document.getElementById("enter-keyword")
			.addEventListener("keydown", e => {
				let target = (e.target as Element)
				if (e.key === "Enter") {
					this.addKeyword(target["value"]);
					target["value"] = "";
				}
			});
	}

	private gatherRequestData() : Object {
		let requestData = {};
		let modules = this.getModules();
		requestData["topic"] = this.getTopic();
		requestData["description"] = this.getDescription();
		requestData["modules"] = this.getModules();
		requestData["update_interval"] = this.getUpdateInterval();
		requestData["isPublic"] = this.getResearchType() === "public";
		requestData["analyzers"] = this.getAnalyzer();
		requestData["keywords"] = this.keywords;
		this.setPlayStoreParameters(requestData, modules);
		return requestData;
	}

	submit() : void {
		console.log(this.gatherRequestData());
	}

	private setPlayStoreParameters(requestData: Object, modules: string[]) : void {
		if (!modules.includes("play_store")) {
			requestData["app_name"] = requestData["app_id"] = requestData["app_dev"] = "";
			return;
		}
		if (this.queryOptionByName("google-play-suboption", "play-name") === "play-name") {
			requestData["app_name"] = this.appName;
			requestData["app_dev"] = this.appDev;
			requestData["app_id"] = "";
		} else {
			requestData["app_id"] = this.appId;
			requestData["app_name"] = "";
			requestData["app_dev"] = "";
		}
	}

	private getTopic() : string {
		return this.topic;
	}

	private getDescription() : string {
		return this.description;
	}

	private getModules() : string[] {
		let services = document.querySelectorAll("[data-service]");
		let res: string[] = [];
		for (let i = 0; i < services.length; i++) {
			if (services[i]["checked"] === true) {
				res.push(services[i]["value"]);
			}
		}
		return res;
	}

	private getUpdateInterval() : string {
		if (document.getElementById("use-auto-update")["checked"]) {
			return this.queryOptionByName("auto-update-option", "");
		}
		return "";
	}

	private getAnalyzer() : string {
		return this.queryOptionByName("analyzer", "vader");
	}

	private getResearchType() : string {
		return this.queryOptionByName("research-type", "public");
	}

	private queryOptionByName(name: string, defaultOption: string) : string {
		let options = document.querySelectorAll(`input[name="${name}"]`);
		for (let i = 0; i < options.length; i++) {
			if (options[i]["checked"]) {
				return options[i]["value"];
			}
		}
		return defaultOption;
	}


	private toggleGooglePlaySection(event: Event) : void {
		let target = event.target;
		if (target["checked"]) {
			document.getElementById("google-play-creation-section")
				.classList.remove("hidden");
		} else {
			document.getElementById("google-play-creation-section")
				.classList.add("hidden");
		}
	}

	private toggleGooglePlaySuboption(event: Event) : void {
		let target = (event.target as Element);
		let id = target.getAttribute("id");
		if (target["checked"]) {
			document.querySelectorAll("[data-google-play-suboption]")
				.forEach(e => e.classList.add("hidden"));
			document.querySelector(`[data-google-play-suboption="${id}"]`)
				.classList.remove("hidden");
		}
	}

	private toggleUseAutoUpdateOptions(event: Event) : void {
		let target = event.target;
		if (target["checked"]) {
			document.getElementById("auto-update-options")
				.classList.remove("hidden");
		} else {
			document.getElementById("auto-update-options")
				.classList.add("hidden");
		}
	}

	removeKeyword(keyword: string) : void {
		let i = this.keywords.indexOf(keyword);
		if (i != -1) {
			this.keywords.splice(i, 1);
		}
	}

	private addKeyword(keyword: string) : void {
		if (!this.keywords.includes(keyword)) {
			this.keywords.push(keyword);
		}
	}
}
