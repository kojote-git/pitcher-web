import { Injectable } from '@angular/core';

export interface DetailedResearchView {
    id: number,
    topic: string,
    description: string,
    creation: string,
    last_update: string,
    views: number,
    owner: {
        id: number,
        username: string,
        fullname: string,
    },
    keywords: string[],
    active_modules: string[],
    likes: number,
    subscriptions: number
};

@Injectable({
    providedIn: "root"
})
export class DetailedSearchService {
    private researches: DetailedResearchView[] = [
        {
            id: 1, description: "hello world research",
            topic: "hello world",
            creation: "18.04.2000", last_update: "18.04.2000",
            views: 100, owner: { id: 1, username: "kojote", fullname: "Pavel Budantsev"},
            keywords: ["hello", "world", "dsawdsaw"],
            active_modules: ["twitter", "play_store", "news", "trends"],
            likes: 10,
            subscriptions: 20
        }
    ];

    findById(id: number) : DetailedResearchView {
        return this.researches[0];
    }
}