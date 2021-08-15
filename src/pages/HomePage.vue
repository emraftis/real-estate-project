<template>
    <div class="intro">
        <div class="intro-text">
            <p class="text">NOI Calculator & </p>
            <p class="text">Building Valuator</p>
        </div>

        <div class="intro-buttons">
            <router-link class="intro-button" v-if="!isLoggedIn" to="/auth"><base-button><span class="padding">Get Started</span></base-button></router-link>
            <router-link class="intro-button" @click="pageRoute" v-else to="/projects"><base-button><span class="padding">My Projects</span></base-button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        pageRoute() {
            console.log(this.$route)
        }
    }
}
</script>


<style scoped>
    
    .intro {
    background: url('https://images.unsplash.com/photo-1487837647815-bbc1f30cd0d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80');
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: 0 3rem;
    }

    .intro-text {
    color: black;
    font-size: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
    margin-left: 10%;
    }

    .intro-button {
        font-size: 1.6rem;
    }

    .text {
    margin-top: 0.25em;
    padding-bottom: 0.15em;
    font-weight: 600;
    }

    .intro-buttons {
        display: flex;
        flex-direction: row-reverse;
        margin-right: 10%;
        margin-top: 10%;
    }

    .padding {
        padding: 15px;
        font-weight: 400;
    }

</style>