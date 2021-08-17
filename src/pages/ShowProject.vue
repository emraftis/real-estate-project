<template>
<div v-if="selectedProject">
    <the-header></the-header>
    <section class="show-background">
            <base-card class="card-container">
                <h2>{{ projectName }}</h2>
                <p class="project-description">{{ projectDescription }}</p>
            </base-card>
        <base-card class="card-container">
            <h2>NOI Calculation:</h2>
            <table class="table-container-NOI" ref="NOITable">
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
            <div class="excelButton">
                <base-button @click="getNOIExcel">Export to Excel</base-button>
            </div>
        </base-card>
        
        <base-card class="card-container">
            <h2>Property Value Estimate</h2>
            <p>Using the Income Approach to Value</p>
            <table class="table-container-value" ref="valueTable">
                <tr>
                    <td>Net Operating Income</td>
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
            <div class="excelButton">
                <base-button @click="getValueExcel">Export to Excel</base-button>
            </div>
        </base-card>
    </section>
</div>
<div v-else></div>
</template>

<script>
    //formatting for currency
import TheHeader from '../components/layout/TheHeader.vue';
import XLSX from 'xlsx';
console.log(XLSX);
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export default {
    data() {
        return {
            selectedProject: null,
            isLoading: true,
            error: false,
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
        handleError() {
            this.error = null;
        },
        formatCurrency(number) {
            return formatter.format(number);
        },
        async loadProjects() {
            await this.$store.dispatch('fetchProjects')
        },
        refresh() {
            this.selectedProject = this.$store.getters.projects.find(project => project.projectId === this.$route.params.id) 
        },
        getNOIExcel(_, fn, dl) {
            var elt = this.$refs.NOITable;
            var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
            return dl ?
                XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'base64'}) :
            XLSX.writeFile(wb, fn || (`Project-${this.id}-NOI.xlsx`))
        },
        getValueExcel(_, fn, dl) {
            var elt = this.$refs.valueTable;
            var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
            return dl ?
                XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'base64'}) :
            XLSX.writeFile(wb, fn || (`Project-${this.id}-Value.xlsx`))
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

.table-container-NOI, 
.table-container-value {
    text-align: right;
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

.show-background {
    background: url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=100');
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 100vh;
}

.card-container {
    background-color: white;
    opacity: 0.95;
}

.excelButton {
    display: flex;
    justify-content: center;
}
</style>