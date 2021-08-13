<template>
    <section>
        <base-card>
            <h1>Project List Page</h1>
            <router-link to="/new"><base-button class="outline">Create New Project</base-button></router-link>
        </base-card>
        <ul v-if="projectList.length > 0">
            <project-item 
            v-for="project in projectList"
            :key="project.projectId"
            :projectId="project.projectId"
            :projectName="project.projectName"
            :projectNOI="project.projectNOI"
            :projectValue="project.projectValue"
            ></project-item>
        </ul>
        <base-card v-else>
            <p>No projects have been created.</p>
        </base-card>
        
    </section>
</template>

<script>
import ProjectItem from '../components/projects/ProjectItem.vue';

export default {
    props: ['projectName','projectNOI','projectValue', 'projectId'],
    computed: {
        projectList() {
            return this.$store.getters.projects
        },
    },
    components: {
        ProjectItem,
    },
    methods: {
        async loadProjects() {
            await this.$store.dispatch('fetchProjects')
        }
    },
    created() {
        this.loadProjects();
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