<template>
    <div class="not-found-background">
        <the-header></the-header>
        <div class="card-container-spacer">
            <base-card class="card-container">
                <div class="card-spacer">
                    <h1>404: "/{{ thisPage }}" Not Found</h1>
                    <p>Sorry, we can't find this page. Please use the above navigation bar.</p>
                </div>
            </base-card>
        </div>
    </div>
</template>

<script>
import TheHeader from '../components/layout/TheHeader.vue';
export default {
    components: {
        TheHeader,
    },
    computed: {
        thisPage() {
            return this.$route.params.notFound;
        }
    },
}
</script>


<style scoped>
.not-found-background {
    background: url('https://images.unsplash.com/photo-1588665343610-04dfd562e2e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=100');
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 100vh;
}

.card-container {
    background: white;
    opacity: 95%;
    padding: 1rem;
}

h1 {
    margin-bottom: 5%;
}

p {
    margin-left: 2rem;
}

.card-spacer {
    padding: 1rem;
}

.card-container-spacer {
    margin-top: 5%;
}

</style>