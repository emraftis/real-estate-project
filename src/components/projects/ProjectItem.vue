<template>
    <li>
        <base-card class="card-container">
            <h2>{{ projectName }}</h2>
            <p>Net Operating Income: {{ formatCurrency(projectNOI) }}</p>
            <p>Estimated Value: {{ formatCurrency(projectValue) }}</p>
            <router-link :to="projectDetailsLink"><base-button>Details</base-button></router-link>
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
    props: ['projectName', 'projectNOI', 'projectValue', 'projectId'],
    computed: {
        projectDetailsLink() {
            return "/projects/" + this.projectId;
        },
        theUserId() {
            return localStorage.getItem("userId");
        }
    },
    methods: {
        formatCurrency(number) {
            return formatter.format(number);
        },
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
</style>