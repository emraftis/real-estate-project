<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        link: {
            type: Boolean,
            default: false,
        },
        to: {
            type: String,
            default: '/'
        },
        mode: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #2e2e2e;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  margin-top: 1rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #f16565;
  border-color: #c95454;
}

.flat {
  background-color: transparent;
  color: #5a5a5a;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #c95454;
  color: #f16565;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #f16565;
  color: white;
}
</style>