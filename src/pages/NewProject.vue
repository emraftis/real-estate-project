<template>
<div>
    <the-header></the-header>
    <section class="new-background">
        <base-card class="card-container">
            <h2>New Project</h2>
            <div>
                <project-details-form @save-data="saveData"></project-details-form>
            </div>
        </base-card>
    </section>
</div>
</template>

<script>
import ProjectDetailsForm from '../components/projects/ProjectDetailsForm.vue';
import TheHeader from '../components/layout/TheHeader.vue';

export default {

    methods: {
        saveData(data) {
            this.$store.dispatch('createProject', data);
            this.$router.replace('/projects');
        },
    },
    components: {
        ProjectDetailsForm,
        TheHeader,
    },
}
</script>

<style scoped>

.new-background {
    background: url('https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=100');
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100vh;
}

.card-container {
    margin-top: 5%;
    background-color: white;
    opacity: 0.95;
}

@media screen and (max-width: 500px) {
    .new-background {
        max-width: 100%;
    }
}

    @media screen and (max-width: 750px) {}

</style>