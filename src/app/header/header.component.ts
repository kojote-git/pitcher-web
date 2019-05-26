import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private keyword: string;

	constructor(private authService: AuthenticationService, private router: Router) { }

	ngOnInit() {
	}

	search() {
		this.router.navigate(["/search"], { queryParams: {keyword: this.keyword}});		
	}

	searchOnKeydown(event: any) {
		let enter = 13;
		if (event["keyCode"] === enter) {
			this.search();
		}
	}

	isAuthenticated() : boolean {
		return this.authService.isAuthenticated();
	}

	logout() {
		this.authService.logout();
	}
}
