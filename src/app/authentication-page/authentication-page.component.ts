import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { SERVER } from "../services/shared";

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
	private signUpErrorMessage;
	private signInErrorMessage;
	private readonly server = SERVER;

	private signIn = {
		user_password: "",
		user: ""
	};

	private signUp = {
		email: "",
		username: "",
		isCompany: false,
		password: "",
		reenterPassword: "",
		fullname: ""
	};

	constructor(private authService: AuthenticationService, private router: Router) {
		if (authService.isAuthenticated()) {
			router.navigate(["/"]);
		}
		router.routeReuseStrategy.shouldReuseRoute = () => false;
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
		this.authService.login(this.signIn, 
			response => { 
				this.router.navigate(["/"]);
			},
			error => {
				this.signInErrorMessage = error.error.message;
			}
		);
	}

	public submitSignUp() {
		if (this.signUp.password !== this.signUp.reenterPassword) {
			this.signUpErrorMessage = "passwords don't match";
			return;
		}
		if (this.signUp.email.length < 3 && this.signUp.email.indexOf("@") === -1) {
			this.signUpErrorMessage = "invalid email address";
			return;
		}
		this.authService.register(this.signUp, 
			response => {
				this.router.navigate(["/"]);
			},
			error => {
				this.signUpErrorMessage = error.error.message;
			}
		);
	}
}
