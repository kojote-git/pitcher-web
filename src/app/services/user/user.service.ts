import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthenticationService } from '../auth/authentication.service';
import { SERVER } from '../shared';

export interface UserDetails {
    id: number,
    username: string,
    fullname: string,
    subType: string,
    created: number,
    bio: string,
    liked: number,
    subscriptions: number,
    isCompany: boolean,
    employed: string,
    online: boolean,
    myResearches: number[],
    subscribed: number[]
}

@Injectable({
    providedIn: "root"
})
export default class UserService {

    constructor(private auth: AuthenticationService) {
    }

    public loadDetails() : Promise<UserDetails> {
        return this.auth.onBehalf({
            url: `${SERVER}/user/info`,
            method: "GET"
        }).then(resp => resp as UserDetails);
    }

    public uploadAvatar(input) : Promise<any> {
        if (input.files.length === 0) {
            return null;
        } 
        let formData = new FormData();
        formData.append("avatar", input.files[0]);
        return this.auth.onBehalf({
            url: `${SERVER}/update_or_delete_user`,
            method: "POST",
            body: formData,
        });
    }

    public editProfile(data) : Promise<any> {
        return this.auth.onBehalf({
            url: `${SERVER}/update_or_delete_user`,
            method: "PUT",
            body: data
        });
    }

}