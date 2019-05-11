import { Observable } from 'rxjs';

export interface DateInterval {
	begin?: Date,
	end?: Date
}

export interface Filters {
	date?: DateInterval,
	services?: string[],
	sortBy?: string
}

export interface SearchService {
    findAll() : Observable<Object[]>;
    filter(filters: Filters) : Observable<Object[]>;
}