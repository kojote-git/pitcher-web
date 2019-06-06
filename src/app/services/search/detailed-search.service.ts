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
    private ENDPOINT = `${SERVER}/research`;


    constructor(private http: HttpClient) {
    }

    findById(id: number) : Promise<DetailedResearchView> {
        return this.http.get<DetailedResearchView>(`${this.ENDPOINT}/use?res_id=${id}`).toPromise();
    }

    loadTwitterDetails(id: number, dateRange?: DateRange) : Promise<TwitterDetails> {
        return this.http.get<TwitterDetails>(`${this.ENDPOINT}/twitter?res_id=${id}`).toPromise();
    }

    loadPlayStoreDetails(id: number, dateRange?: DateRange) : Promise<PlayStoreDetails> {
        return this.http.get<PlayStoreDetails>(`${this.ENDPOINT}/play_store?res_id=${id}`).toPromise();
    }

    loadGoogleTrendsDetails(id: number, dateRange?: DateRange) : Promise<GoogleTrendsDetails> {
        return this.http.get<GoogleTrendsDetails>(`${this.ENDPOINT}/search?res_id=${id}`).toPromise();
    }

    loadNewspappersDetails(id: number, dateRange?: DateRange) : Promise<NewspapersDetails> {
        return this.http.get<NewspapersDetails>(`${this.ENDPOINT}/news?res_id=${id}`).toPromise();
    }
}