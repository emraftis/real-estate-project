<template>
    <form @submit.prevent="submitForm">

        <div class="first-step" v-if="!firstStep.val && !secondStep.val">
            <div class="form-control" :class="{invalid: !projectName.isValid}">
                <label for="projectName">Address / Project Name:  </label>
                <input type="text" id="projectName" v-model="projectName.val" @blur="clearValid('projectName')">
                <p v-if="!projectName.isValid">Project name must not be empty.</p>
            </div>
            <div class="form-control" :class="{invalid: !projectDescription.isValid}">
                <label for="description">Description:  </label>
                <textarea name="description" id="description" rows="5" v-model="projectDescription.val" @blur="clearValid('projectDescription')"></textarea>
                <p v-if="!projectDescription.isValid">Description must not be empty.</p>
            </div>
            <router-link to="/"><base-button>Cancel</base-button></router-link>
            <base-button @click.prevent="firstStepComplete">Next</base-button>
        </div>


        <div class="second-step" v-if="firstStep.val && !secondStep.val">
            <div class="form-control" :class="{invalid: !annualRevenue.isValid}">
                <label for="annualRevenue">Annual Revenue: </label>
                <input type="number" min="0" id="annualRevenue" v-model.number="annualRevenue.val" @blur="clearValid('annualRevenue')">
                <p v-if="!annualRevenue.isValid">revenue must not be less than $0.</p>
            </div>
            <div class="form-control" :class="{invalid: !annualExpenses.isValid}">
                <label for="annualExpenses">Annual Unrecoverable Expenses: </label>
                <input type="number" min="0" id="annualExpenses" v-model.number="annualExpenses.val" @blur="clearValid('annualExpenses')">
                <p v-if="!annualExpenses.isValid">expenses must not be less than $0.</p>
            </div>
            <div>
                <base-button @click.prevent="secondStepGoBack">Back</base-button>
                <base-button @click.prevent="secondStepComplete">Next</base-button>
            </div>
        </div>


        <div class="final-step" v-if="firstStep.val && secondStep.val">
            <div class="form-control" :class="{invalid: !vacancyAllowanceInput.isValid}">
                <label for="vacancyAllowanceInput">Vacancy Allowance, as a % of Rental Income:</label>
                <input type="number" min="0" step="0.01" id="vacancyAllowanceInput" v-model="vacancyAllowanceInput.val" @blur="clearValid('vacancyAllowanceInput')" />
                <p v-if="!vacancyAllowanceInput.isValid">Please enter a valid vacancy allowance %</p>
            </div>
            <div class="form-control" :class="{invalid: !managementFeeInput.isValid}">
                <label for="managementFeeInput">Management Fee, as a % of Effective Gross Income:</label>
                <input type="number" min="0" step="0.01" id="managementFeeInput" v-model="managementFeeInput.val" @blur="clearValid('managementFeeInput')" >
                <p v-if="!managementFeeInput.isValid">Please enter a valid management fee %</p>
            </div>
            <div class="form-control" :class="{invalid: !structuralAllowanceInput.isValid}">
                <label for="structuralAllowanceInput">Structural Allowance, as a % of Effective Gross Income:</label> 
                <input type="number" min="0" step="0.01" id="structuralAllowanceInput" v-model="structuralAllowanceInput.val" @blur="clearValid('structuralAllowanceInput')">
                <p v-if="!structuralAllowanceInput.isValid">Please enter a valid structural allowance %</p>
            </div>
            <div class="form-control" :class="{invalid: !capRateInput.isValid}">
                <label for="capRateInput">Capitalization (Cap) Rate, based on market rates and property type:</label>
                <input type="number" min="0" step="0.01" id="capRateInput" v-model="capRateInput.val" @blur="clearValid('capRateInput')">
                <p v-if="!capRateInput.isValid">Please enter a valid cap rate %</p>
            </div>
            <base-button v-if="firstStep && secondStep" @click.prevent="thirdStepGoBack">Back</base-button>
            <base-button v-if="firstStep && secondStep">Create Project</base-button>
        
        </div>
    </form>
</template>

<script>


export default {
    emits: ['save-data'],
    data() {
        return {
            projectName: {
                val: '',
                isValid: true
            },
            projectDescription: {
                val: '',
                isValid: true
            },
            annualRevenue: {
                val: null,
                isValid: true
            },
            annualExpenses: {
                val: null,
                isValid: true
            },
            vacancyAllowanceInput: {
                val: null,
                isValid: true
            },
            managementFeeInput: {
                val: null,
                isValid: true
            },
            structuralAllowanceInput: {
                val: null,
                isValid: true
            },
            capRateInput: {
                val: null,
                isValid: true
            },
            firstStep: {
                val: false,
                isValid: true
            },
            secondStep: {
                val: false,
                isValid: true
            },
            formIsValid: true,
        }
    },
    computed: {
        projectNOI() {
            const revenue = this.annualRevenue.val;
            const expenses = this.annualExpenses.val;
            const vacancyRate = this.vacancyAllowanceInput.val/100;
            const managementRate = this.managementFeeInput.val/100;
            const structuralRate = this.structuralAllowanceInput.val/100;
            const EGI = revenue * (1-vacancyRate);
            const managementDollars = managementRate * EGI;
            const structuralDollars = structuralRate * EGI;
            return EGI - expenses - managementDollars - structuralDollars;
        },
        projectValue() {
            const revenue = this.annualRevenue.val;
            const expenses = this.annualExpenses.val;
            const vacancyRate = this.vacancyAllowanceInput.val/100;
            const managementRate = this.managementFeeInput.val/100;
            const structuralRate = this.structuralAllowanceInput.val/100;
            const EGI = revenue * (1-vacancyRate);
            const managementDollars = managementRate * EGI;
            const structuralDollars = structuralRate * EGI;
            const capRatePercent = this.capRateInput.val/100;
            const NOI = EGI - expenses - managementDollars - structuralDollars;
            return NOI / parseFloat(capRatePercent.toString());
        },
    },
    methods: {
        firstStepComplete() {
            this.validateFirst();
            if (this.firstStep.isValid) {
                this.firstStep.val = true;
            } else {
                return
            }
        },
        secondStepComplete() {
            this.validateSecond();
            if (this.secondStep.isValid) {
                this.secondStep.val = true;
            } else {
                return
            }
        },
        secondStepGoBack() {
            this.secondStep.val = false;
            this.firstStep.val = false;
        },
        thirdStepGoBack() {
            this.secondStep.val = false;
        },
        clearValid(input) {
            this.[input].isValid = true;
        },
        validateFirst() {
            this.firstStep.isValid = true;
            
            if (this.projectName.val === '') {
                this.projectName.isValid = false;
                this.firstStep.isValid = false;
            }
            if (this.projectDescription.val === '') {
                this.projectDescription.isValid = false;
                this.firstStep.isValid = false;
            }
        },
        validateSecond() {
            this.secondStep.isValid = true;

            if (this.firstStep.val && this.annualRevenue.val == null) {
                this.annualRevenue.isValid = false;
                this.secondStep.isValid = false;
            }
            if (!this.annualExpenses.val) {
                this.annualExpenses.isValid = false;
                this.secondStep.isValid = false;
            }
        },
        validateForm() {
            this.formIsValid = true;

            if (this.vacancyAllowanceInput.val === null) {
                this.vacancyAllowanceInput.isValid = false;
                this.formIsValid = false;
            }
            if (this.managementFeeInput.val === null) {
                this.managementFeeInput.isValid = false;
                this.formIsValid = false
            }
            if (this.structuralAllowanceInput.val === null) {
                this.structuralAllowanceInput.isValid = false;
                this.formIsValid = false
            }
            if (this.capRateInput.val === null) {
                this.capRateInput.isValid = false;
                this.formIsValid = false
            }
        },
        submitForm() {
        this.validateForm()

        if (!this.formIsValid) {
            return;
        }

            //this random projectNumber is not unique... need to fix it eventually. 
            let projectNumber = (Math.floor(Math.random() * 100) + 50).toString() + (Math.floor(Math.random() * 100) + 50).toString() + (Math.floor(Math.random() * 100) + 50).toString();
                // this might work?
                // if (this.$state.getters.projects.find(project => projectId === projectNumber)) {
                //     projectNumber + Math.floor(Math.random() * 10).toString();
                // }
            const formData = {
                projectId: projectNumber,
                projectName: this.projectName.val,
                description: this.projectDescription.val,
                projectNOI: this.projectNOI,
                projectValue: this.projectValue,
                annualRevenue: this.annualRevenue.val,
                annualExpenses: this.annualExpenses.val,
                vacancyAllowance: this.vacancyAllowanceInput.val,
                managementFee: this.managementFeeInput.val,
                structuralAllowance: this.structuralAllowanceInput.val,
                capRate: this.capRateInput.val,
            }
            this.$emit('save-data', formData);
        },
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

</style>