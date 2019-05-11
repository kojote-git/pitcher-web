import { SearchService, Filters } from './search.service';
import { Observable, of } from 'rxjs';

declare var Date: any;

export class DemoSearchService implements SearchService {
    private researches =  [{
            name: "elections in Ukraine",
            description: "help people to find relevant information about elections and candidates",
            date: "18/02/2019",
            services: ["Twitter"]
        }, {
            name: "The Elders Scrolls: Blades",
            description: "trying find out opinions of people on this game",
            date: "30/04/2019",
            services: ["Twitter", "Google Play Store"]
        }, {
            name: "Pitcher brand",
            description: "let's find out what people think about pitcher and their products",
            date: "02/04/2019",
            services: ["Twitter"]
        }, {
            name: "Samsung brand",
            description: "while some people are talking that Samsung loses their position on market " +
                "I'm trying to figure out whether it's true or not",
            date: "03/04/2019",
            services: ["Twitter"]
        }
    ];

    findAll(): Observable<Object[]> {
        return of(this.researches);
    }    
    
    filter(filterOptions: Filters): Observable<Object[]> {
        let temp = this.researches.slice();
        const dateFormat = "dd/MM/yyyy"
        if (filterOptions.date != undefined) {
            temp = this.filterByDate(temp, filterOptions.date);
        }
        if (filterOptions.services != undefined) {
            temp = this.filterByServices(temp, filterOptions.services);
        }
        if (filterOptions.sortBy != undefined) {
            if (filterOptions.sortBy == "date") {
                temp.sort((left, right) => {
                    let rightDate = Date.parseExact(right.date, dateFormat);
                    let leftDate = Date.parseExact(left.date, dateFormat);
                    return leftDate.compareTo(rightDate);
                });
            }
        }
        return of(temp);
    }

    private filterByServices(researches, services) {
        return researches.filter(research => {
            for (let i = 0; i < services.length; i++) {
                if (research.services.includes(services[i])) {
                    return true;
                }
            }
            return false;
        });
    }

    private filterByDate(researches, date) {
        let begin = date.begin;
        let end = date.end;
        if (begin != undefined) {
            begin = Date.parseExact(begin, "yyyy-MM-dd");
            researches = researches.filter(research => {
                let date = Date.parseExact(research.date, "dd/MM/yyyy");
                return date.getTime() > begin.getTime();
            });
        }
        if (end != undefined) {
            end = Date.parseExact(end, "yyyy-MM-dd");
            researches = researches.filter(research => {
            let date = Date.parseExact(research.date, "dd/MM/yyyy");
                return date.getTime() < end.getTime();
            });
        }
        return researches;
    }   
}