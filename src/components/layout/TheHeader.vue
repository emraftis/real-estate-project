<template>
    <header>
        <nav>
            <div class="logo">
                <h1><router-link id="logo" to="/">Real Estate Calculator</router-link></h1>
            </div>
            <ul class="nav-links">
              <li><router-link to="/faq">FAQs</router-link></li>
              <li v-if="isLoggedIn"><router-link to="/new">New Project</router-link></li>
              <li v-if="isLoggedIn"><router-link to="/projects">My Projects</router-link></li>
              <li v-if="!isLoggedIn"><router-link to="/auth">Login</router-link></li>
              <li v-if="isLoggedIn"><span @click="logout"><a>Logout</a></span></li>
            </ul>
            <teleport to="body">
              <ul :class="navActive">
                  <li><router-link to="/faq"><span class="nav-text">FAQs</span></router-link></li>
                  <li v-if="isLoggedIn"><router-link to="/new"><span class="nav-text">New Project</span></router-link></li>
                  <li v-if="isLoggedIn"><router-link to="/projects"><span class="nav-text">My Projects</span></router-link></li>
                  <li v-if="!isLoggedIn"><router-link to="/auth"><span class="nav-text">Login</span></router-link></li>
                  <li v-if="isLoggedIn"><span @click="logout" class="nav-text">Logout</span></li>
              </ul>
            </teleport>
            <div class="burger" @click="navSlide">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
            
        </nav>
    </header>

</template>

<script>
export default {
  data() {
    return {
      navIsActive: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    navActive() {
      if (this.navIsActive === true) {
        return "nav-active"
      }
      return "nav-burger-links";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/auth');
    },
    navSlide() {
      return this.navIsActive = !this.navIsActive;
    }
  },

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


a, ul li {
  list-style: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 0.25rem;
}

h1 {
  margin-left: 4rem;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 7vh;
  background-color: #2e2e2e;
}

.nav-burger-links,
.nav-links {
  display: flex;
  width: 50%;
  justify-content: space-around;
  margin-left: auto;
  cursor: pointer;
}

.nav-burger-links {
  display: none;
}

.burger {
  display: none;
  padding: 1rem;
  margin-right: 1rem;
  cursor: pointer;
}

.burger div {
  width: 23px;
  height: 2px;
  background-color: white;
  margin: 5px;
}

a:active,
a.router-link-active {
  border-bottom: 3px solid #f16565;
}

a:hover {
  border-bottom: 2px solid white;
}

#logo {
  text-decoration: none;
  border: none;
}

@media screen and (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  h1 {
    font-size: 1rem;
    margin-left: 2rem;
  }

  .nav-burger-links,
  .nav-links {
    position: absolute;
    left: 0;
    height: 93vh;
    top: 7vh;
    background-color: rgba(80, 80, 80, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    transform: translateX(-101%);
    transition: transform 0.3s ease-in-out;
    z-index: 1;
  }

  .nav-burger-links {
    opacity: 1;
  }
  
  .burger {
    display: block;
  }

  nav {
    justify-content: space-between;
  }

  .nav-active {
    position: absolute;
    left: 0;
    height: 93vh;
    top: 7vh;
    background-color: rgba(80, 80, 80, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65%;
    transform: translateX(0%);
    transition: transform 0.3s ease-in-out;
    z-index: 1;
    display: flex;
    justify-content: space-around;
  }

  li {
    border-radius: 20px;
    padding-left: 2rem;
    padding-right: 2rem;

  }

  .nav-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  li:hover {
    background-color: #f16565;
  }

  a:active,
  a.router-link-active {
  border-bottom: none;
  }

  a:hover {
    border-bottom: none;
  }
}

</style>

