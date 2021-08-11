<template>
    <section>
        <base-card>
            <h1>Project List Page</h1>
            <router-link to="/new"><base-button class="outline">Create New Project</base-button></router-link>
        </base-card>
        <ul>
            <project-item 
            v-for="project in projectList"
            :key="project.projectId"
            :projectId="project.projectId"
            :projectName="project.projectName"
            :projectNOI="project.projectNOI"
            :projectType="project.type"
            :projectValue="project.projectValue"
            ></project-item>
        </ul>
    </section>
</template>

<script>
import ProjectItem from '../components/projects/ProjectItem.vue';

export default {
    props: ['projectName','projectNOI','projectType','projectValue', 'projectId'],
    computed: {
        projectList() {
            const projects = this.$store.getters.projects;
            return projects
        },
    },
    components: {
        ProjectItem,
    }
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