import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

export interface TwitterDetails {
    popularity_rate: {
        date: string,
        rate: number
    }[],
    sentiment: {
        positive_percent: number,
        neutral_percent: number,
        negative_percent: number,
    },
    frequent_words: {
        word: string,
        rate: number
    }[],
    tweets: {
        url: string,
        sentiment: number
    }[];
}

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
            keywords: ["hello", "world"],
            active_modules: ["twitter", "play_store", "news", "search"],
            likes: 10,
            subscriptions: 20
        }
    ];

    private twitter: TwitterDetails = {
        popularity_rate: [{
                date: "Mar 2017",
                rate: 123,
            }, {
                date: "Apr 2017",
                rate: 231,
            }, {
                date: "Mar 2017",
                rate: 352,
            }, {
                date: "Apr 2017",
                rate: 400,
            }, {
                date: "Mar 2017",
                rate: 1000,
            }, {
                date: "Apr 2017",
                rate: 200,
            }
        ],
        sentiment: {
            positive_percent: 33,
            negative_percent: 33,
            neutral_percent: 34
        },
        frequent_words: [
            { word: "hello", rate: 1000 },
            { word: "world", rate: 782 },
            { word: "dsadaw", rate: 132 },
            { word: "wodsaw", rate: 102 },
            { word: "worlddsadsawdsaw", rate: 32 },
            { word: "worldads", rate: 12 }
        ],
        tweets: [
            {
                url: "hello",
                sentiment: 1
            }
        ]
    };

    findById(id: number) : Promise<DetailedResearchView> {
        return of(this.researches[0]).toPromise();
    }

    loadTwitterDetails(id: number) : Promise<TwitterDetails> {
        return of(this.twitter).toPromise();
    }
}