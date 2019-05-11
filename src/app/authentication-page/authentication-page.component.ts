import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

// assets/js/ui/tabs.js
declare var TabController: any;
declare var DATA_TAB_ID_BINDING: string;
declare var DATA_ACTIVE_TAB: string;
declare var DATA_TAB_ID: string;

@Component({
	selector: 'app-authentication-page',
	templateUrl: './authentication-page.component.html',
	styleUrls: ['./authentication-page.component.css']
})
export class AuthenticationPageComponent implements OnInit {
	private signIn = {
		password: "",
		email: ""
	};

	private signUp = {
		email: "",
		username: "",
		isCompany: false,
		companyName: "",
		password: ""
	};

	constructor(private authService: AuthenticationService) {
	}

	ngOnInit() {
		let authorizationFormTabsController = new TabController({
			tabIdBinding: DATA_TAB_ID_BINDING,
			tabId: DATA_TAB_ID,
			activeTab: DATA_ACTIVE_TAB,
			styles: {
				activeTab: [],
				activeTabIdBinding: [
					"auth-form-tab-control-active"
				]
			}
		});

		const queryParams = new URLSearchParams(window.location.search);
		const formTab = queryParams.get("form_tab");
		
		if (formTab === "sign-in") {
			authorizationFormTabsController
				.setActiveTabByName("sign-in");
		} else if (formTab === "sign-up") {
			authorizationFormTabsController
				.setActiveTabByName("sign-up");
		}

		const representsCompanyCheckBox = document.getElementById("represents-company");
		const companyName = document.getElementById("company-name")
		
		representsCompanyCheckBox.addEventListener("click", (e) => {
			if (!representsCompanyCheckBox["checked"]) {
				companyName["disabled"] = true;
			} else {
				companyName["disabled"] = false;
			}
		});		
	}

	public submitSignIn() {
		this.authService.login(this.signIn);
	}

	public submitSignUp() {
		this.authService.register(this.signUp);
	}
}
