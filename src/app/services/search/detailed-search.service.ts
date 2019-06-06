import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER } from "../shared";

export interface DateRange {
    begin: string,
    end: string
}

export interface GoogleTrendsDetails {
    popularity: {
        date: string,
        rate: number
    }[],
    countries: {
        country: string,
        rate: number
    }[],
    related: string[]
}

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

export interface PlayStoreDetails {
    hist: {
        one: number,
        two: number,
        three: number,
        four: number,
        five: number
    },
    app_info: {
        name: string,
        rate: number,
        downloads: string,
        reviews: number,
        not_clear_reviews: number
    },
    top_reviews: {
        rate: number,
        text: string,
        sentiment: number
    }[]
}

export interface NewspapersDetails {
    news: {
        source: string,
        link: string,
        title: string
    }[],
    words: string[],
    sentiment: {
        negative_percent: number,
        positive_percent: number,
        neutral_percent: number
    }
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

    private playStore: PlayStoreDetails = {
        hist: {
            one: 23,
            two: 21,
            three: 40,
            four: 192,
            five: 300
        },
        app_info: {
            name: "hello world",
            rate: 4.7,
            downloads: "1000+",
            reviews: 100,
            not_clear_reviews: 10
        },
        top_reviews: [
            {
                rate: 5,
                text: "hello world",
                sentiment: 0.7
            }
        ]
    }

    private googleTrends: GoogleTrendsDetails = {
        popularity: [
            {
                date: "04.2018",
                rate: 10
            }, {
                date: "05.2018",
                rate: 20
            }
        ],
        countries: [
            {
                country: "Ukraine",
                rate: 35
            }, {
                country: "Belarus",
                rate: 40
            }, {
                country: "Russia",
                rate: 20
            }
        ],
        related: ["hello", "world", "abc", "cba"]
    }

    private newsPappers: NewspapersDetails = {
        news: [
            {
                source: "hello world",
                link: "hello world",
                title: "hello world"
            },
            {
                source: "hello world",
                link: "hello world",
                title: "hello world"
            },
            {
                source: "hello world",
                link: "hello world",
                title: "hello world"
            },
            {
                source: "hello world",
                link: "hello world",
                title: "hello world"
            },
            {
                source: "hello world",
                link: "hello world",
                title: "hello world"
            },
            {
                source: "hello world",
                link: "hello world",
                title: "hello world"
            }
        ],
        words: ["hello world", "hello", "world", "world", "hello"],
        sentiment: {
            positive_percent: 33,
            negative_percent: 33,
            neutral_percent: 34
        }
    }

    findById(id: number) : Promise<DetailedResearchView> {
        return of(this.researches[0]).toPromise();
    }

    loadTwitterDetails(id: number, dateRange?: DateRange) : Promise<TwitterDetails> {
        return of(this.twitter).toPromise();
    }

    loadPlayStoreDetails(id: number, dateRange?: DateRange) : Promise<PlayStoreDetails> {
        return of(this.playStore).toPromise();
    }

    loadGoogleTrendsDetails(id: number, dateRange?: DateRange) : Promise<GoogleTrendsDetails> {
        return of(this.googleTrends).toPromise();
    }

    loadNewspapersDetails(id: number, dateRange?: DateRange) : Promise<NewspapersDetails> {
        return of(this.newsPappers).toPromise();
    }
}