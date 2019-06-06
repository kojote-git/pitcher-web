import { NewspapersDetails, DetailedSearchService, DateRange } from '../services/search/detailed-search.service';
import { ResearchComponent } from './research.component';
import Chart from "chart.js";

export class NewspapersComponent {
    private details: NewspapersDetails;

    constructor(
        id: number,
        private searchService: DetailedSearchService,
        private researchComponent: ResearchComponent,
        dateRange?: DateRange
    ) {
        this.searchService.loadNewspapersDetails(id, dateRange)
            .then(resp => {
                this.details = resp;
                researchComponent.setNewspapersDetails(resp);
                this.drawPieChart();
            });
    }

    private drawPieChart() {
        let sentiment = this.details.sentiment;
        new Chart(
            (document.getElementById("newspapers-total-opinion-percentage") as any).getContext("2d"),
            {
                type: "pie",
                data: {
                    labels: ["Positive", "Neutral", "Negative"],
                    datasets: [{
                        label: "Total opinion percentage",
                        data: [sentiment.positive_percent, sentiment.neutral_percent, sentiment.negative_percent],
                        backgroundColor: [
                            "#87f5c8",
                            "#eaf25f",
                            "#ff7e75"
                        ]
                    }]
                }
            }
        );
    }
}