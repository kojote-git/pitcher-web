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

export interface SearchService {
    findAll() : Observable<ResearchView[]>;
	filter(filters: Filters) : Observable<ResearchView[]>;
	findById(id: any) : Observable<ResearchView>;
}