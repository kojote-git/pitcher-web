import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

export interface ResearchData {
    topic: string,
    description?: string,
    modules: string[],
    update_interval?: string,
    isPublic: boolean,
    analyzers: string,
    keywords: string[]
}

@Injectable({
    providedIn: "root"
})
export class ResearchService {

    constructor(private auth: AuthenticationService) {
    }

    createResearch(researchData: ResearchData) : Promise<any> {
        return this.auth.onBehalf({
            method: "POST",
            url: "http://localhost:5080/research/use",
            body: researchData
        });
    }
}