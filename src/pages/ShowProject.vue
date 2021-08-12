<template>
    <div>
        <section>
            <base-card>
                <h2>{{ projectName }}</h2>
                <p>{{ projectDescription }}</p>
                <p>NOI: ${{ projectNOI }}</p>
                <p>Estimated Value: ${{ projectValue }}</p>
            </base-card>
        </section>
        <section>
            <!-- ProjectFinancials component (showing NOI calculation) -->
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedProject: null
        }
    },
    props: ['id'],
    computed: {
        projectName() {
            return this.selectedProject.projectName
        },
        projectDescription() {
            return this.selectedProject.description
        },
        projectNOI() {
            return this.selectedProject.projectNOI
        },
        projectValue() {
            return this.selectedProject.projectValue
        }
    },
    created() {
        this.selectedProject = this.$store.getters.projects.find(project => project.projectId == this.id)
   }
}
</script>