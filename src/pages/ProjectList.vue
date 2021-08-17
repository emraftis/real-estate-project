<template>
<div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
            <p>{{ error }}</p>
    </base-dialog>
    <the-header></the-header>
    <div class="list-background"></div>
    <section>
        <base-card class="card-container">
            <div v-if="isLoggedIn">
                <h1 >My Projects</h1>
                <router-link to="/new"><base-button class="outline"><strong>Create New Project</strong></base-button></router-link>
            </div>
            <h1 v-else>Please login to view and create new projects</h1>   
        </base-card>
        <ul>
            <project-item 
            v-for="project in projectList"
            :key="project.projectId"
            :projectId="project.projectId"
            :projectName="project.projectName"
            :projectNOI="project.projectNOI"
            :projectValue="project.projectValue"
            ></project-item>
        </ul>
    </section>
</div>
</template>

<script>
import ProjectItem from '../components/projects/ProjectItem.vue';
import TheHeader from '../components/layout/TheHeader.vue';

export default {
    props: ['projectName','projectNOI','projectValue', 'projectId'],
    components: {
        ProjectItem,
        TheHeader,
    },
    methods: {
        async loadProjects() {
            await this.$store.dispatch('fetchProjects')
        }
    },
    created() {
        this.loadProjects();
    },
    computed: {
        projectList() {
            return this.$store.getters.projects;
        },
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
    },
}
</script>

<style scoped>
li, ul {
    list-style-type: none;
    list-style-position:inside;
    margin:0;
    padding:0;
}

.list-background {
    background: url('https://images.unsplash.com/photo-1521780171415-783b1cb576e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80');
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100vh;
}

.card-container {
    background-color: white;
    opacity: 0.95;
}
</style>