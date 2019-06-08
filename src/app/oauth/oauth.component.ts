import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var setCookie: any;

@Component({
	selector: 'app-oauth',
	templateUrl: './oauth.component.html',
	styleUrls: ['./oauth.component.css']
})
export class OAuthComponent implements OnInit {

	constructor(router: Router, activatedRoute: ActivatedRoute) { 
		activatedRoute.queryParams.subscribe(params => {
			let userCredentials = {
				access_token: params["access_token"],
				refresh_token: params["refresh_token"]
			};
			setCookie("userCredentials", JSON.stringify(userCredentials));
			router.navigate(["/"]);
		});
	}

	ngOnInit() {
	}

}
