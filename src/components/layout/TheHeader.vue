<template>
    <header>
        <nav>
            <h1><router-link to="/"><span class="logo-text">Real Estate Calculator</span></router-link></h1>
            <ul>
                <li><router-link to="/faq">FAQs</router-link></li>
                <li><router-link v-if="isLoggedIn" to="/new">New Project</router-link></li>
                <li><router-link v-if="isLoggedIn" to="/projects">My Projects</router-link></li>
                <li v-if="!isLoggedIn"><router-link to="/auth">Login</router-link></li>
                <li v-if="isLoggedIn"><span class="logoutBtn" @click="logout">Logout</span></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    homePagePath() {
            if (this.$route.path === "/") {
                return 1;
            }
            return -1;
        }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/auth');
    }
  }
}
</script>

<style scoped>
h1 {
    color: white;
    font-weight: 400;
}

li {
    color: white;
    font-weight: 600;
}

header {
  width: 100%;
  height: 4rem;
  background-color: #2e2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid white;
  background-color: #f16565;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
  background-color: #2e2e2e;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.logoutBtn {
 border: none;
 color: white;
 text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
}

.logoutBtn:hover, 
.logoutBtn:active {
  border: 1px solid white;
  background-color: #f16565;
}
 
</style>