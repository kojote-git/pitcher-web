import { ResearchComponent } from './research.component';
import { GoogleTrendsDetails, DetailedSearchService } from '../services/search/detailed-search.service';
import Chart from "chart.js";

export class TrendsComponent {
    constructor(
        id: number,
        private researchComponent: ResearchComponent,
        private searchService: DetailedSearchService    
    ) {
        this.searchService.loadGoogleTrendsDetails(id)
            .then(details => {
                this.drawPopularity(details);
                this.drawPopularityInCountries(details);
                researchComponent.setGoogleTrendsDetails(details);
            })
    }

    private drawPopularity(details: GoogleTrendsDetails) {
        new Chart(
            (document.getElementById("google-trends-popularity") as any).getContext("2d"),
            {
                type: "line",
                data: {
                    labels: details.popularity.map(popularity => popularity.date),
                    datasets: [{
                        label: "Popylarity dynamics",
                        data: details.popularity.map(popularity => popularity.rate),
                        backgroundColor: "rgb(15, 189, 108)",
                        borderColor: "rgb(15, 189, 108)",
                        fill: false
                    }]
                }
            }
        );
    }

    private drawPopularityInCountries(details: GoogleTrendsDetails) {
        new Chart(
            (document.getElementById("google-trends-popularity-in-countries") as any).getContext("2d"),
            {
                type: "horizontalBar",
                data: {
                    labels: details.countries.map(country => country.country),
                    datasets: [{
                        label: "Popularity in countries",
                        data: details.countries.map(country => country.rate),
                        backgroundColor: "rgb(15, 189, 108)",
                        borderColor: "rgb(15, 189, 108)"
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                min: 0
                            }
                        }]
                    }
                }
            }
        );
    }
}