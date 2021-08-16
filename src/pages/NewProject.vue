<template>
<div>
    <the-header></the-header>
    <div class="overlay">
    <section class="new-background">
        <base-card class="card-container">
            <h2>New Project</h2>
            <div>
                <project-details-form @save-data="saveData"></project-details-form>
            </div>
        </base-card>
    </section>
    </div>
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
    background: url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=100');
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

</style>