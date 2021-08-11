<template>
    <li>
        <base-card>
            <h2>{{ projectName }}</h2>
            <h3>{{ typeName }}</h3>
            <p>NOI: $ {{ projectNOI }}</p>
            <p>Est. Value: $ {{ projectValue }}</p>
            <router-link :to="projectDetailsLink"><base-button>Details</base-button></router-link>
            <router-link :to="projectEditLink"><base-button class="outline">Edit</base-button></router-link>
        </base-card>
    </li>
</template>

<script>
export default {
    props: ['projectName', 'projectType', 'projectNOI', 'projectValue', 'projectId'],
    computed: {
        typeName() {
            if (this.projectType === 'single-tenant-commercial') {
                return 'Single Tenant - Commercial'
            } 
            if (this.projectType === 'multi-tenant-commercial') {
                return 'Multi Tenant - Commercial'
            } else {
                return this.projectType;
            }
        }, 
        projectDetailsLink() {
            return "/projects/" + this.projectId;
        },
        projectEditLink() {
            return "/projects/" + this.projectId + "/edit"
        }
    },
}
</script>

<style scoped>

h2, h3, p {
    margin-top: 0.5rem;
}
</style>