import { DetailedSearchService, TwitterDetails, DateRange } from '../services/search/detailed-search.service';
import Chart from "chart.js";

export class TwitterComponent {
    private details: TwitterDetails;

    constructor(id: number, search: DetailedSearchService, dateRange?: DateRange) {
        search.loadTwitterDetails(id, dateRange)
            .then(details => {
                this.details = details;
                this.drawDiagrams();
            });
    }

    drawDiagrams() {
        this.mentions();
        this.frequentWords();
        this.opinionPercentage();
    }

    mentions() {
        let dates = this.details.popularity_rate.map(rate => rate.date);
        let values = this.details.popularity_rate.map(rate => rate.rate);
        new Chart(
            (document.getElementById("twitter-mentions") as any).getContext("2d"), 
            {
                type: "line",
                data: {
                    labels: dates,
                    datasets: [{
                        label: "Number of mentions",
                        data: values,
                        fill: false,
                        borderColor: "rgb(15, 189, 109)",
                        backgroundColor: "rgb(15, 189, 109)"
                    }]
                }
            }
        );
    }

    frequentWords() {
        let words = this.details.frequent_words.map(word => word.word);
        let rates = this.details.frequent_words.map(word => word.rate);
        new Chart(
            (document.getElementById("twitter-most-frequent-words") as any).getContext("2d"),
            {
                type: "bar",
                data: {
                    labels: words,
                    datasets: [{
                        label: "Most Frequent Words",
                        data: rates,
                        borderColor: "rgb(15, 189, 109)",
                        backgroundColor: "rgb(15, 189, 109)"
                    }]
                }
            }
        );
    }

    opinionPercentage() {
        let sentiment = this.details.sentiment;
        new Chart(
            (document.getElementById("twitter-total-opinion-percentage") as any).getContext("2d"),
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