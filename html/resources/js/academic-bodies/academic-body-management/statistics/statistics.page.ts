import {Component, Prop, Vue} from 'vue-property-decorator';
// @ts-ignore
import LineChart from "./chart/LineChart";
// @ts-ignore
import BarChart from "./chart/BarChart";
import {academic_bodies} from "../../../@shared/repositories/academic_bodies/repository.ts";

@Component({
    components: {
        LineChart,
        BarChart
    },
    apollo: {
        statistics: {
            result({data, loading, networkStatus}) {
                if (!loading) {
                    this.academicBodyStatistics = {
                        ...data['academic_body_statistics']
                    };
                    this.setAcademicBodyByLevel(this.academicBodyStatistics);
                }
            },
            pollInterval: 20000,
            manual: true,
            query: function () { /** Wrapped for "this" access */
                return academic_bodies.statistics({
                    fields: [
                        "total",
                        "professorsWithSNIOrProdep",
                        "professorsInAcademicBody",
                        "ptcsAreNotAcademicBody",
                        "inTraining",
                        "inConsolidation",
                        "consolidated"
                    ],
                    args: this.filters
                })
            }
        }
    }
})
export default class AcademicBodyStatistics extends Vue {
    @Prop() filters!: {name: string, value: string}[];
    academicBodyStatistics = {
        total: 0,
        professorsWithSNIOrProdep: 0,
        professorsInAcademicBody: 0,
        ptcsAreNotAcademicBody: 0
    };
    academicBodyByLevel = {};

    mounted() {
        this.$apollo.queries.statistics.start();
    }

    setAcademicBodyByLevel(data: any) {
        this.academicBodyByLevel = {
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            data: {
                labels: ['CA por grado de consolidación'],
                datasets: [
                    {
                        label: 'En formación',
                        backgroundColor: '#218838',
                        data: [data['inTraining']]
                    },
                    {
                        label: 'En consolidación',
                        backgroundColor: '#dc8e00',
                        data: [data['inConsolidation']]
                    },
                    {
                        label: 'Consolidados',
                        backgroundColor: '#f87979',
                        data: [data['consolidated']]
                    }
                ]
            },
        };
    }
}
