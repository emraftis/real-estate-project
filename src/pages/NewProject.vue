<template>
    <section>
        <base-card>
            <h2>New Project</h2>
            <div>
                <project-details-form @save-data="saveData"></project-details-form>
            </div>
        </base-card>
    </section>
</template>

<script>
import ProjectDetailsForm from '../components/projects/ProjectDetailsForm.vue';

export default {

    methods: {
        saveData(data) {
            this.$store.dispatch('createProject', data);
            console.log(this.$router);
            this.$router.replace('/projects');
        },
    },
    components: {
        ProjectDetailsForm
    },
    // methods: {
    //     saveData(data) {},
    // }
}
</script>