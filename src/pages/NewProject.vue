<template>
    <section>
        <base-card>
            <h2 v-if="!typeOfProject">New Project</h2>
            <h2 v-else>{{ pageTitle }}</h2>
            <div v-if="!typeOfProject">
                <base-button @click="singleTenant">Single Tenant</base-button>
                <base-button @click="multiTenant">Multi Tenant</base-button>
            </div>
            <div v-if="typeOfProject">
                <project-details-form :type="typeOfProject"></project-details-form>
                <project-tenant-form></project-tenant-form>
                <project-assumptions-form></project-assumptions-form>
            </div>
        </base-card>
    </section>
</template>

<script>
import ProjectTenantForm from '../components/projects/ProjectTenantForm.vue';
import ProjectDetailsForm from '../components/projects/ProjectDetailsForm.vue';
import ProjectAssumptionsForm from '../components/projects/ProjectAssumptionsForm.vue';

export default {
    props: ['type'],
    data() {
        return {
            typeOfProject: null
        }
    },
    computed: {
        pageTitle() {
            const projectTypeTitle = this.typeOfProject[0].toUpperCase() + this.typeOfProject.substring(1);
            return "New " + projectTypeTitle + "-Tenant Project"
        }
    },
    methods: {
        singleTenant() {
            this.typeOfProject = 'single'
        },
        multiTenant() {
            this.typeOfProject = 'multi'
        }
    },
    components: {
        ProjectTenantForm,
        ProjectDetailsForm,
        ProjectAssumptionsForm
    },
    // methods: {
    //     saveData(data) {},
    // }
}
</script>