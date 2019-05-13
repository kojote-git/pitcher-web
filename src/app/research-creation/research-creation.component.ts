import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-research-creation',
	templateUrl: './research-creation.component.html',
	styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent implements OnInit {
	private keywords: string[] = [];

	constructor() { }

	ngOnInit() {
		document.getElementById("google-play-service")
			.addEventListener("click", this.toggleGooglePlaySection);
		document.querySelectorAll('input[name="google-play-suboption"]')
			.forEach(element => {
				element.addEventListener("change", this.toggleGooglePlaySuboption);
			});
		document.getElementById("use-auto-update")
			.addEventListener("change", this.toggleUseAutoUpdateOptions);
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
}
