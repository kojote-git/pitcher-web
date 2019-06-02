import Chart from "chart.js";
import { DateRange, PlayStoreDetails, DetailedSearchService } from '../services/search/detailed-search.service';
import { ResearchComponent } from './research.component';

export class PlayStoreComponent {
    private playStoreDetails: PlayStoreDetails;

    constructor(id: number, 
        private searchService: DetailedSearchService,
        private researchComponent: ResearchComponent
    ) {
        this.searchService.loadPlayStoreDetails(id)
            .then(details => {
                this.playStoreDetails = details;
                this.researchComponent.setPlayStoreDetails(details);
                this.drawHistogram(details);
            })    
    }

    private drawHistogram(details: PlayStoreDetails) {
        let rates = details.hist;
        new Chart(
            document.getElementById("play-store-rating-chart").getContext("2d"),
            {
                type: "horizontalBar",
                data: {
                    labels: ["5 ☆", "4 ☆", "3 ☆", "2 ☆", "1 ☆"],
                    datasets: [{
                        label: "Rating chart",
                        borderColor: "rgb(15, 189, 108)",
                        backgroundColor: "rgb(15, 189, 108)",
                        data: [rates.five, rates.four, rates.three, rates.two, rates.one]
                    }]
                }
            }
        )
    }

}