<template>
<div>
    <the-header></the-header>
    <section>
        <base-card>
            <div v-if="isLoggedIn">
                <h1 >My Projects</h1>
                <router-link to="/new"><base-button class="outline">Create New Project</base-button></router-link>
            </div>
            <h1 v-else>Please login to view and create new projects</h1>
            
        </base-card>
        <ul v-if="hasProjects">
            <project-item 
            v-for="project in projectList"
            :key="project.projectId"
            :projectId="project.projectId"
            :projectName="project.projectName"
            :projectNOI="project.projectNOI"
            :projectValue="project.projectValue"
            ></project-item>
        </ul>
        <base-card v-else-if="isLoggedIn">
            <p>You dont have any projects yet!</p>
        </base-card>

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
        hasProjects() {
            return this.$store.getters.hasProjects;
        }
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
</style>