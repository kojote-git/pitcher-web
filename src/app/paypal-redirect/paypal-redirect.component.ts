import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER } from '../services/shared';

@Component({
	selector: 'app-paypal-redirect',
	templateUrl: './paypal-redirect.component.html',
	styleUrls: ['./paypal-redirect.component.css']
})
export class PaypalRedirectComponent implements OnInit {
	private responseMessage: string;

	constructor(
		auth: AuthenticationService, 
		router: Router, 
		activatedRoute: ActivatedRoute,
		http: HttpClient	
	) { 
		if (!auth.isAuthenticated()) {
			router.navigate(["/"]);
		}
		activatedRoute.queryParams.subscribe(params => {
			if (params["done"] !== 1) {
				this.responseMessage = "Something went wrong";
				return;
			}
			this.responseMessage = "Your payment is being processed...";
			http.post(`${SERVER}/payment/${params["type"]}/execute`, {
				agreement_id: params["id"]
			}).subscribe(res => router.navigate(["/"]))
		})
	}

	ngOnInit() {
	}

}
