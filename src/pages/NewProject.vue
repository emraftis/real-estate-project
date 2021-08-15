<template>
<div>
    <the-header></the-header>
    <section>
        <base-card>
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