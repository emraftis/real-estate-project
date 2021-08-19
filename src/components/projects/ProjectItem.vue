<template>
    <li>
        <base-card class="card-container">
            <h2>{{ projectName }}</h2>
            <p>{{ shortDescription(160) }}</p>
            <p>Net Operating Income: {{ formatCurrency(projectNOI) }}</p>
            <p>Estimated Value: {{ formatCurrency(projectValue) }}</p>
            <div class="buttons">
                <router-link :to="projectDetailsLink"><base-button>Details</base-button></router-link>
                <base-button id="delete-button" class="outline" @click="deleteItem">Delete</base-button>
            </div>
        </base-card>
    </li>
</template>

<script>
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export default {
    props: ['projectName', 'projectNOI', 'projectValue', 'projectId', 'projectDescription', 'projectKey'],
    computed: {
        projectDetailsLink() {
            return "/projects/" + this.projectId; 
        },
        theUserId() {
            return localStorage.getItem("userId");
        },
        theProjectKey() {
            return this.projectKey.projectKey;
        }
        
    },
    methods: {
        formatCurrency(number) {
            return formatter.format(number);
        },
        shortDescription(charLength) {
            if (this.projectDescription.length < charLength) {
                return this.projectDescription
            } else {
                return this.projectDescription.slice(0,charLength) + "..."
            }
        },
        deleteItem() {
            const firebaseId = this.theProjectKey;
            this.$store.dispatch('deleteProject', firebaseId)
        }
    },
}
</script>

<style scoped>

h2, h3, p {
    margin-top: 0.5rem;
}

.card-container {
    background-color: white;
    opacity: 0.95;
}

.buttons {
    display: flex;
}

#delete-button {
    margin-left: auto;    
}
</style>