<template>
    <div>
    <the-header></the-header>
    <section class="new-background">
        <base-card class="card-container">
            <h2>Edit Project</h2>
            <div>
                <edit-project @edit-data="editData"></edit-project>
            </div>
        </base-card>
    </section>
</div>
</template>

<script>
import TheHeader from "../components/layout/TheHeader.vue";
import EditProject from "../components/projects/EditProjectForm.vue";

export default {
    components: {
        TheHeader,
        EditProject,
    },
    methods: {
        editData(data) {
            this.$store.dispatch('editProject', data);
            this.$router.replace(`/projects/${this.id}`)
        }
    },
}
</script>
