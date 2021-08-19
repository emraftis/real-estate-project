<template>
    <div class="intro">
        <div class="intro-text">
            <p>NOI Calculator & </p>
            <p>Building Valuator</p>
        </div>

        <div class="intro-button-container">
            <router-link v-if="!isLoggedIn" to="/auth"><base-button class="intro-buttons"><span class="intro-button-text">Get Started</span></base-button></router-link>
            <router-link v-else to="/projects"><base-button class="intro-buttons"><span class="intro-button-text">My Projects</span></base-button></router-link>
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
}
</script>


<style scoped>
    p {
        margin: 0;
        padding: 0;
    }

    .intro {
    background: url('https://images.unsplash.com/photo-1487837647815-bbc1f30cd0d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=100');
    background-size: cover;
    background-attachment: fixed;
    position: fixed;
    width: 100%;
    height: 100vh;
    padding: 0 3rem;

    }

    .intro-text {
    color: black;
    font-size: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    font-family: 'Abril Fatface', cursive;
    }

    .intro-button-text {
        padding: 15px;
        font-size: 2rem;
        font-family: 'Abril Fatface', cursive;
    }

    .intro-buttons:hover {
        transform-origin: center left;
        transform: scale(1.15)
    }

    @media screen and (max-width: 768px) {
        .intro-text {
            font-size: 4rem;
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .intro-button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin-top: 20%;
            transform: scale(0.85)
        }
    }
    



</style>