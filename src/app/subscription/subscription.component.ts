import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-subscription',
	templateUrl: './subscription.component.html',
	styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

	constructor(private auth: AuthenticationService, private router: Router) { 
		if (!auth.isAuthenticated()) {
			router.navigate(["/"]);
		}
	}

	ngOnInit() {
	}
	
}
