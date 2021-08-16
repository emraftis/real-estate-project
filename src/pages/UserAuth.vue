<template>
    <div class="auth-background">
        <div class="container">
            <base-dialog :show="error" title="Error" @close="handleError">
                <p>{{ error }}</p>
            </base-dialog>
            <base-dialog :show="isLoading" title="Authenticating..." fixed>
                <base-spinner></base-spinner>
            </base-dialog>
            <base-card class="form-background">
                <form @submit.prevent="submitForm">
                    <h2 class="form-header">{{ formText }}</h2>
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model.trim="email">
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model.trim="password">
                    </div>
                    <p v-if="!formIsValid">Please enter a valid email and password, at least 6 characters long.</p>
                    <base-button>{{ submitButtonCapition }}</base-button>
                    <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCapiion }}</base-button>
                </form>
            </base-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: false,
        }
    },
    computed: {
        submitButtonCapition() {
            if (this.mode === 'login') {
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchModeButtonCapiion() {
            if (this.mode === 'signup') {
                return 'Login instead'
            } else {
                return 'Signup instead'
            }
        },
        formText() {
            if (this.mode === 'login') {
                return 'Login / Existing User:'
            } else {
                return 'Sign Up / New User:'
            }
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;                //validation
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true;                  //after validation, Loading begins

            try {
                if (this.mode === 'login') {
                    await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password
                    })
                } else {
                    await this.$store.dispatch('signup', {
                        email: this.email,
                        password: this.password
                    })
                }
                const redirectUrl = "/" + (this.$route.query.redirect || 'projects');
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error.message || 'Failed to authenticate';
            }



            

            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup'
            } else if (this.mode === 'signup') {
                this.mode = 'login'
            }
        },
        handleError() {
            this.error = null;
        }
    },
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.auth-background {
    background: url('https://images.unsplash.com/photo-1496192173661-0361468cb14a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80');
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100vh;
}

.form-background {
    background-color: white;
    opacity: 0.87;
}

.container {
    margin-top: 10%;
}

.form-header {
    margin-bottom: 5%;
}

</style>