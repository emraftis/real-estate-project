<template>
<div v-if="selectedProject">
    <section>
        <the-header></the-header>
            <base-card>
                <h2>{{ projectName }}</h2>
                <p>{{ projectDescription }}</p>
                <p>Net Operating Income: {{ formatCurrency(projectNOI) }}</p>
                <p>Estimated Project Value: {{ formatCurrency(projectValue) }}</p>
            </base-card>
    </section>
    <section>
        <base-card>
            <ul>
                <li>Rental Income: {{ formatCurrency(annualIncome) }}</li>
                <li>Less: Vacancy Allowance ({{ vacancyAllowance }}%): ({{ formatCurrency(vacancyDollars) }})</li>
                <li>Effective Gross Income: {{ formatCurrency(EGI) }}</li>
                <li>Less: Unrecoverable Expenses: {{ formatCurrency(annualExpenses) }}</li>
                <li>Less: Management Fees ({{ managementFeePercent }}%): ({{ formatCurrency(managementFeeDollars) }})</li>
                <li>Less: Structural Fees ({{ structuralPercent }}%): ({{ formatCurrency(structuralDollars) }})</li>
                <li>Net Operating Income: {{ formatCurrency(projectNOI) }}</li>
            </ul>
        </base-card>
        <base-card>
            <ul>
                <li>NOI / Cap Rate = Estimated Value</li>
                <li>Net Operating Income: {{ formatCurrency(projectNOI) }}</li>
                <li>Cap Rate: {{ capRate }}%</li>
                <li>Estimated Project Value: {{ formatCurrency(projectValue) }}</li>
            </ul>
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
            return dollars
        },
        managementFeePercent() {
            return this.selectedProject.managementFee
        },
        managementFeeDollars() {
            const dollars = this.selectedProject.managementFee/100 * (this.selectedProject.annualRevenue * (1 - this.selectedProject.vacancyAllowance/100));
            return dollars
        },
        structuralPercent() {
            return this.selectedProject.structuralAllowance
        },
        structuralDollars() {
            const dollars = this.selectedProject.structuralAllowance/100 * (this.selectedProject.annualRevenue * (1 - this.selectedProject.vacancyAllowance/100));
            return dollars
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
</style>