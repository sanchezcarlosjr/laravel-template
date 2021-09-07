import Vue from "vue";
import Component from "vue-class-component";
// @ts-ignore
import LineChart from "./chart/LineChart";
// @ts-ignore
import BarChart from "./chart/BarChart";
import SniStatisticsTable from "./table.presenter.vue";
import {Prop} from "vue-property-decorator";
import {snis} from "@shared/repositories/sni/repository";

interface SniStatisticsQuery {
    periods: string[];
    datasets: [{ id: string, label: string, data: number[], stack: string }];
}

class StackColor {
    private static paletteColors = [
        ["#17a2b8", "#20c997", "#218838"],
        ["#fd7e14", "#dc3545", "#e83e8c"],
        ["#007bff", "#6610f2", "#6f42c1"],
        ["#6c757d", "#495057", "#343a40"]
    ];
    private actualStack = 0;
    private stack = new Map<string, { paletteColor: number, color: number }>();

    definePaletteColor(id: string) {
        if (!this.stack.has(id)) {
            this.stack.set(id, {
                paletteColor: this.actualStack++,
                color: 0
            });
        } else {
            // @ts-ignore
            this.stack.get(id).color++;
        }
        return StackColor.paletteColors[this.stack.get(id)?.paletteColor as number][this.stack.get(id)?.color as number];
    }
}

enum KindOfStatistic {
    GRAPH,
    TABLE
}

@Component({
    components: {
        BarChart,
        SniStatisticsTable
    },
    apollo: {
        statistics: {
            result({data, loading, networkStatus}) {
                if (loading) {
                    return;
                }
                this.sni_statistics = data["sni_statistics"];
                this.renderGraph();
            },
            pollInterval: 20000,
            manual: true,
            query: function () { /** Wrapped for "this" access */
                return snis.statistics({
                    fields: [
                        'periods',
                        'datasets.label',
                        'datasets.data',
                        'datasets.stack'
                    ],
                    args: [
                        ...this.filters,
                        {name: "to", value: this.to},
                        {name: "from", value: this.from},
                    ]
                })
            }
        }
    }
})
export default class SniStatistics extends Vue {
    @Prop() filters!: { name: string, value: string }[];
    tabIndex: KindOfStatistic = 0;
    from = "";
    to = "";
    sni_statistics: SniStatisticsQuery = {periods: [], datasets: [{id: "", label: "", data: [], stack: ""}]};
    sniByLevelData = {};
    sniByLevelOptions = {
        tooltips: {
            mode: 'x',
            callbacks: {
                title: function (tooltipItems: [{ label: string, datasetIndex: number }], data: SniStatisticsQuery) {
                    return `${tooltipItems[0].label} ${data.datasets[tooltipItems[0].datasetIndex].stack}`;
                },
                footer: function (tooltipItems: any, sniStatisticsQuery: SniStatisticsQuery) {
                    let total = tooltipItems.reduce((a: number, e: any) => a + parseInt(e.yLabel), 0);
                    return 'Total: ' + total;
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    periods: { text: string, value: string }[] = [];

    constructor() {
        super();
        const date = new Date();
        let actualYear = date.getFullYear();
        const finishedYear = actualYear - 6;
        const period = (date.getMonth() + 1 > 6) ? "2" : "1";
        this.to = `${actualYear}-${period}`;
        this.from = `${finishedYear}-${period}`;
        while (actualYear >= finishedYear) {
            this.periods.push({text: `${actualYear}-2`, value: `${actualYear}-2`});
            this.periods.push({text: `${actualYear}-1`, value: `${actualYear}-1`});
            actualYear--;
        }
    }

    get fields() {
        return ["Periodo", ...this.sni_statistics.datasets.map((value) => value.label), "Total"];
    }

    get items() {
        return this.sni_statistics.periods.map((value, index) => {
            let total = 0;
            return {
                "Periodo": value,
                ...this.sni_statistics.datasets.reduce((acc, actual) => {
                    total += actual.data[index];
                    return {...acc, [actual.label]: actual.data[index]};
                }, {}),
                "Total": total
            }
        });
    }

    mounted() {
        this.$apollo.queries.statistics.start();
    }

    renderGraph() {
        const stackColors = new StackColor();
        this.sniByLevelData = {
            labels: this.sni_statistics?.periods,
            datasets: this.sni_statistics?.datasets.map((dataset) => {
                return {
                    backgroundColor: stackColors.definePaletteColor(dataset.stack),
                    ...dataset
                }
            })
        };
    }
}
