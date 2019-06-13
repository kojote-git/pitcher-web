import { Component, OnInit } from '@angular/core';
import UserService, { UserDetails } from '../services/user/user.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
	selector: 'app-profile-edit',
	templateUrl: './profile-edit.component.html',
	styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
	// default values
	private profile: UserDetails = {
		id: 0, bio: "Hello World", employed: "Hello World", myResearches: [],
		isCompany: false, subType: "Hello World", liked: 0,
		subscriptions: 0, online: false, 
		fullname: "Hello World", username: "Hello World", created: 0,
		subscribed: []
	};

	constructor(private auth: AuthenticationService, private userService: UserService, private router: Router) {
		if (!this.auth.isAuthenticated()) {
			router.navigate(["/"]);
			return;
		}
		userService.loadDetails()
			.then(details => this.profile = details);
	}

	ngOnInit() {
	}

	submit() {
		this.userService.editProfile({
			fullname: this.profile.fullname,
			bio: this.profile.bio
		}).then(e => console.log("edit ok"));
	}

	updateBio(e) {
		this.profile.bio = e.target.value;
	}
}
