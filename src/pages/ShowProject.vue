<template>
<div>
    <the-header></the-header>
    <div>
        <section>
            <base-card>
                <h2>{{ projectName }}</h2>
                <p>{{ projectDescription }}</p>
                <p>NOI: {{ formatCurrency(projectNOI) }}</p>
                <p>Estimated Value: {{ formatCurrency(projectValue) }}</p>
            </base-card>
        </section>
    </div>
</div>
</template>

<script>
import TheHeader from '../components/layout/TheHeader.vue';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export default {
    data() {
        return {
            selectedProject: null
        }
    },
    components: {
        TheHeader,
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
    methods: {
        formatCurrency(number) {
            return formatter.format(number);
        },
    },
    created() {
        this.selectedProject = this.$store.getters.projects.find(project => project.projectId == this.id)
   }
}
</script>