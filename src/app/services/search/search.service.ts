import { Observable } from 'rxjs';

export interface ResearchView {
	id: number;
	topic: string;
	description: string;
	creation: string;
	views: number;
	likes: number;
	subscriptions: number;
}

export interface DateInterval {
	// format yyyy-MM-dd
	begin?: string,
	end?: string
}

export interface Filters {
	date?: DateInterval,
	services?: string[],
	sortBy?: string,
	analyser?: string,
	keyword?: string
}

export interface PageSpecification {
	page: number,
	size: number,
}

export interface Page {
	researches: ResearchView[],
	totalPages: number,
	size: number,
	page: number
}

export interface SearchService {
    findAll() : Observable<ResearchView[]>;
	filter(filters: Filters) : Observable<ResearchView[]>;
	fetchPage(filters: Filters, pageSpec: PageSpecification) : Promise<Page>;
	findById(id: any) : Observable<ResearchView>;
}