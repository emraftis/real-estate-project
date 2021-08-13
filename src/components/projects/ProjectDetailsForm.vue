<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="projectName">Address / Project Name:  </label>
            <input type="text" id="projectName" v-model="projectName">
        </div>
        <div>
            <label for="description">Description:  </label>
            <textarea name="description" id="description" rows="5" v-model="projectDescription"></textarea>
        </div>
        <div class="form-control">
            <label for="annualRevenue">Annual Revenue:  </label>
            <input type="number" id="annualRevenue" v-model="annualRevenue">
        </div>
        <div class="form-control">
            <label for="annualExpenses">Annual Unrecoverable Expenses:  </label>
            <input type="number" id="annualExpenses" v-model="annualExpenses">
        </div>
        <div class="form-control">
            <label for="vacancyAllowanceInput">Vacancy Allowance (%):  </label>
            <input type="number" id="vacancyAllowanceInput" v-model="vacancyAllowanceInput">
        </div>
        <div class="form-control">
            <label for="managementFeeInput">Management Fee (%):  </label>
            <input type="number" id="managementFeeInput" v-model="managementFeeInput">
        </div>
        <div class="form-control">
            <label for="structuralAllowanceInput">Structural Allowance (%):  </label>
            <input type="number" id="structuralAllowanceInput" v-model="structuralAllowanceInput">
        </div>
        <div class="form-control">
            <label for="capRateInput">Capitalization (Cap) Rate (%):  </label>
            <input type="number" id="capRateInput" v-model="capRateInput">
        </div>
        <base-button>Create</base-button>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            projectName: '',
            projectDescription: '',
            annualRevenue: null,
            annualExpenses: null,
            vacancyAllowanceInput: null,
            managementFeeInput: null,
            structuralAllowanceInput: null,
            capRateInput: null,
        }
    },
    computed: {
        projectNOI() {
            return ( this.annualRevenue * (1-(this.vacancyAllowanceInput/100)) ) - (this.managementFeeInput/100 * ( this.annualRevenue * (1-(this.vacancyAllowanceInput/100)) )) - (this.structuralAllowanceInput/100 * ( this.annualRevenue * (1-(this.vacancyAllowanceInput/100)) ));
        },
        projectValue() {
            return (( this.annualRevenue * (1-(this.vacancyAllowanceInput/100)) ) - (this.managementFeeInput/100 * ( this.annualRevenue * (1-(this.vacancyAllowanceInput/100)) )) - (this.structuralAllowanceInput/100 * ( this.annualRevenue * (1-(this.vacancyAllowanceInput/100)) ))) / (this.capRateInput/100);
        },
    },
    methods: {
        submitForm() {
            //validation
        // this.validateForm()

        // if (!this.formIsValid) {
        //     return;
        // }

            //this random projectNumber is not unique... need to fix it eventually. 
            let projectNumber = (Math.floor(Math.random() * 100) + 50).toString() + (Math.floor(Math.random() * 100) + 50).toString() + (Math.floor(Math.random() * 100) + 50).toString();
                // this might work?
                // if (this.$state.getters.projects.find(project => projectId === projectNumber)) {
                //     projectNumber + Math.floor(Math.random() * 10).toString();
                // }
            
            const formData = {
                projectId: projectNumber,
                projectName: this.projectName,
                description: this.projectDescription,
                projectNOI: this.projectNOI,
                projectValue: this.projectValue,
                annualRevenue: this.annualRevenue,
                annualExpenses: this.annualExpenses,
                vacancyAllowance: this.vacancyAllowanceInput,
                managementFee: this.managementFeeInput,
                maintenanceAllowance: this.maintenanceAllowanceInput,
                capRate: this.capRateInput,
            }
            this.$emit('save-data', formData);
        },
    }
}
</script>