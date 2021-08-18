<template>
<div class="background">
    <div >
    <the-header></the-header>
    
    <base-card class="faq">
        <h1>Frequently Asked Questions</h1>
        <base-card :class="{aboutWebContainer: !showAboutWeb}">
            <h2 @click="toggleAboutWeb">About this App / Website</h2>
            <div v-if="showAboutWeb">
                <h3>What is this website?</h3>
                <p>This website is a project created by Evan Raftis using VueJS. The idea for the project is to allow anyone to calculate and compare
                    NOI and project values. It also allows the user to save the project on this application, or export the data to Excel.</p>
                <h3>Where is my data being saved?</h3>
                <p>Your username and password are stored using Google's Firebase. Project data is also stored using Firebase's Realtime Database. 
                    We do not require any identifying information and your data is not used for any purposes outside of this application.</p>
                <h3>Does this cost anything?</h3>
                <p>No! This is 100% free.</p> 
            </div>
            <base-button v-if="showAboutWeb" @click="aboutWebOff" class="minimize-web-button">&#8679;</base-button>
        </base-card>  
        <base-card :class="{aboutNOIContainer: !showAboutNOI}"> 
            <h2 @click="toggleAboutNOI">About Net Operating Income</h2>
            <div v-if="showAboutNOI">
                <h3>What is NOI?</h3>
                <p>NOI is "Net Operating Income". This number is a representation of the annual cash flow that a Commercial Property can generate.</p>
                <h3>What is Effective Gross Income?</h3>
                <p>Effective Gross Income equals the total Rental income (including recoverable expenses) minus the "Vacancy Rate"</p>
                <h3>How can I improve my NOI?</h3>
                <p>The leading factor in the NOI calculation is the lease rate. Unrecoverable expenses should also be minimized.</p>
                <h3>How is NOI Calculated? (sample calcualtion)</h3>
                
                <table class="table-container-NOI" ref="NOITable">
                    <tr>
                        <td><strong>Rental Income:</strong></td>
                        <td class="value-col"><strong>$100,000</strong></td>
                    </tr>
                    <tr>
                        <td>Less: Vacancy Allowance (5%):</td>
                        <td class="value-col">-$5,000</td>
                    </tr>
                    <tr>
                        <td><strong>Effective Gross Income:</strong></td>
                        <td class="total-value-col"><strong>$95,000</strong></td>
                    </tr>
                    <tr>
                        <td>Less: Unrecoverable Expenses: </td>
                        <td class="value-col">$10,000</td>
                    </tr>
                    <tr>
                        <td>Less: Management Fees (4%):</td>
                        <td class="value-col">-$3,800</td>
                    </tr>
                    <tr>
                        <td>Less: Structural Fees (3%):</td>
                        <td class="value-col">-$2,850</td>
                    </tr>
                    <tr>
                        <td><strong>Net Operating Income:</strong></td>
                        <td class="total-value-col"><strong>$78,350</strong></td>
                    </tr>
                </table>
                <h3>What is the Vacancy Allowance?</h3>
                <p>The standard vacancy rate used by most financial institutions in Canada is 5%. This rate is subjective and can fluctuate based on different assumptions.
                    This rate is applied to total income from rental sources, including recoverable expenses as determined by the lease agreement.</p>
                <h3>What is the Management Fee?</h3>
                <p>The standard management fee is around 4%. The management fee is a percentage of Effective Gross Income, and is used for the NOI calculation.
                    This fee is used for day-to-day management of the Commercial Property and will fluctuate. The fee % closest to the actual expense should always be used.</p>
                <h3>What is the Structural Allowance?</h3>
                <p>The standard structural allowance is around 3%. The structural allowance is a percentage of Effective Gross Income and is used for the NOI calculation.
                    This fee is used for any repairs and maintenance related to the building. This fee is an allowance and should equal actual repairs and maintenance expenses, on average.</p>
            </div>
            <base-button v-if="showAboutNOI" @click="aboutNOIOff" class="minimize-NOI-button">&#8679;</base-button>
        </base-card>
        <base-card :class="{aboutValueContainer: !showAboutValue}">
            <h2 @click="toggleAboutValue">About Valuation</h2>
            <div v-if="showAboutValue">
                <h3>How is value calculated?</h3>
                <p>Value is estimated using the standard, 'Income Approach To Value'. This is a common calculation 
                    used in Commercial Real Estate that uses NOI and the estimated Cap Rate to estimate a value for a 
                    Property. In finance, to generate an asset value based on perpetual (ongoing) cash flows, the cash inflows 
                    are divided by the 'rate'. In this case, the cash inflows are 'NOI' and the 'rate' is the Cap Rate.</p>
                <h3>What is the Cap Rate?</h3>
                <p>The Cap Rate is a percentage rate normally derrived from comparable sales based on geographic location, property type, and property quality.
                    In a simple example, if a property is purchased for $1,000,000 and generates an NOI of $100,000 - the 'Cap Rate' would be 10%.</p>
                <p>Source for Cap Rates: <a href="https://www.collierscanada.com/en-ca/research#q=cap%20rate&sort=%40datez32xpublished%20descending">Colliers</a></p>
            </div>
            <base-button v-if="showAboutValue" @click="aboutValueOff" class="minimize-value-button">&#8679;</base-button>
        </base-card>
    </base-card>
    </div>
    <footer>
        <p></p>
    </footer>
</div>
</template>

<script>
import TheHeader from "../components/layout/TheHeader.vue";
export default {
    components: {
        TheHeader
    },
    data() {
        return {
            showAboutWeb: false,
            showAboutNOI: false,
            showAboutValue: false,
        }
    },
    methods: {
        toggleAboutWeb() {
            // this.showAboutNOI = false;
            // this.showAboutValue = false;
            return this.showAboutWeb = !this.showAboutWeb;
        },
        toggleAboutNOI() {
            // this.showAboutWeb = false;
            // this.showAboutValue = false;
            return this.showAboutNOI = !this.showAboutNOI;
        },
        toggleAboutValue() {
            // this.showAboutNOI = false;
            // this.showAboutWeb = false;
            return this.showAboutValue = !this.showAboutValue;
        },
        aboutWebOff() {
            return this.showAboutWeb = false;
        },
        aboutNOIOff() {
            return this.showAboutNOI = false;
        },
        aboutValueOff() {
            return this.showAboutValue = false;
        },
    },
}
</script>

<style scoped>

h1, h2, h3, p, .table-container-NOI {
    padding: 0.6rem;
}


.aboutWebContainer:hover,
.aboutNOIContainer:hover,
.aboutValueContainer:hover {
    background-color: #c95454;
    color: white;
}

.value-col, .total-value-col {
    padding-left: 2rem;
    padding-bottom: 5px;
}

.total-value-col {
    border-top: 1.5px solid black;
}

.faq {
    background-color: white;
    opacity: 95%;
}

.background {
    background: url('https://images.unsplash.com/photo-1481026469463-66327c86e544?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2024&q=100');
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

.minimize-web-button,
.minimize-NOI-button,
.minimize-value-button {
    font-size: 2rem;
    padding-top: 0;
    padding-bottom: 0;
    float: right;
    margin-top: -1rem;
}

</style>