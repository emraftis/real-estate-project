<template>
<div v-if="selectedProject">
    <section>
        <the-header></the-header>
            <base-card>
                <h2>{{ projectName }}</h2>
                <p class="project-description">{{ projectDescription }}</p>
            </base-card>
    </section>
    <section>
        <base-card>
            <h2>NOI Calculation:</h2>
            <table class="table-container">
                <tr>
                    <td><strong>Rental Income:</strong></td>
                    <td class="value-col"><strong>{{ formatCurrency(annualIncome) }}</strong></td>
                </tr>
                <tr>
                    <td>Less: Vacancy Allowance ({{ vacancyAllowance }}%):</td>
                    <td class="value-col">{{ formatCurrency(vacancyDollars) }}</td>
                </tr>
                <tr>
                    <td><strong>Effective Gross Income:</strong></td>
                    <td class="total-value-col"><strong>{{ formatCurrency(EGI) }}</strong></td>
                </tr>
                <tr>
                    <td>Less: Unrecoverable Expenses: </td>
                    <td class="value-col">{{ formatCurrency(annualExpenses) }}</td>
                </tr>
                <tr>
                    <td>Less: Management Fees ({{ managementFeePercent }}%):</td>
                    <td class="value-col">{{ formatCurrency(managementFeeDollars) }}</td>
                </tr>
                <tr>
                    <td>Less: Structural Fees ({{ structuralPercent }}%):</td>
                    <td class="value-col">{{ formatCurrency(structuralDollars) }}</td>
                </tr>
                <tr>
                    <td><strong>Net Operating Income:</strong></td>
                    <td class="total-value-col"><strong>{{ formatCurrency(projectNOI) }}</strong></td>
                </tr>
            </table>
        </base-card>
        
        <base-card>
            <h2>Property Value Estimate</h2>
            <p>Using the Income Approach to Value</p>
            <table class="table-container">
                <tr>
                    <td>Net Operating Income:</td>
                    <td class="value-col">{{ formatCurrency(projectNOI) }}</td>
                </tr>
                <tr>
                    <td>Cap Rate:</td>
                    <td class="value-col">{{ capRate }}%</td>
                </tr>
                <tr>
                    <td><strong>Estimated Value</strong></td>
                    <td class="total-value-col"><strong>{{ formatCurrency(projectValue) }}</strong></td>
                </tr>
            </table>
        </base-card>
    </section>
</div>
<div v-else></div>
</template>

<script>
    //formatting for currency
import TheHeader from '../components/layout/TheHeader.vue';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export default {
    data() {
        return {
            selectedProject: null,
            isLoading: true
        }
    },
    components: {
        TheHeader,
    },
    props: ['id'],
    async created() {
        await this.loadProjects();
        this.selectedProject = await this.$store.getters.projects.find(project => project.projectId === this.$route.params.id) 
    },
    updated() {
        this.refresh()
    },
    methods: {
        formatCurrency(number) {
            return formatter.format(number);
        },
        async loadProjects() {
            await this.$store.dispatch('fetchProjects')
        },
        refresh() {
            this.selectedProject = this.$store.getters.projects.find(project => project.projectId === this.$route.params.id) 
        },
    },
    computed: {
        projectDetailsLink() {
            return "/projects/" + this.$route.params.id;
        },
        projectName() {
            return this.selectedProject.projectName
        },
        projectDescription() {
            return this.selectedProject.description
        },
        projectNOI() {
            return this.selectedProject.projectNOI
        },
        projectValue() {
            return this.selectedProject.projectValue
        },
        vacancyAllowance() {
            return this.selectedProject.vacancyAllowance
        },
        vacancyDollars() {
            const dollars = this.selectedProject.vacancyAllowance/100 * this.selectedProject.annualRevenue
            return -1*dollars
        },
        managementFeePercent() {
            return this.selectedProject.managementFee
        },
        managementFeeDollars() {
            const dollars = this.selectedProject.managementFee/100 * (this.selectedProject.annualRevenue * (1 - this.selectedProject.vacancyAllowance/100));
            return -1*dollars
        },
        structuralPercent() {
            return this.selectedProject.structuralAllowance
        },
        structuralDollars() {
            const dollars = this.selectedProject.structuralAllowance/100 * (this.selectedProject.annualRevenue * (1 - this.selectedProject.vacancyAllowance/100));
            return -1*dollars
        },
        EGI() {
            const EGI = this.selectedProject.annualRevenue - (this.selectedProject.vacancyAllowance/100 * this.selectedProject.annualRevenue)
            return EGI
        },
        annualIncome() {
            return this.selectedProject.annualRevenue
        },
        annualExpenses() {
            return this.selectedProject.annualExpenses
        },
        capRate() {
            return this.selectedProject.capRate
        },
    }, 
}
</script>

<style scoped>
ul, li {
    list-style: none;
}

.project-description {
    padding: 1rem;
}

.table-container {
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.value-col, .total-value-col {
    padding-left: 2rem;
    padding-bottom: 5px;
}

.total-value-col {
    border-top: 1.5px solid black;
}
</style>