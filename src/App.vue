<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import useExperiment from './useExperiment';


const variant = useExperiment('course-page-mobile-layout')

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />

  <div>
    <button v-if="variant === 'original'" class="btn" >checkout</button>
    <button v-else-if="variant === 'v1'" class="btn--v1" >checkout</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

button {
  color: white;
}
.btn {
  background-color: blue;
}
.btn--v1 {
  background-color: red;
}
</style>
