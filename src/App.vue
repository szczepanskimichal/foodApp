<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue';
import AppNavigation from './components/layout/AppNavigation.vue';
</script>
<template>
  <AppNavigation />

    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>


    <AppFooter />

</template>
<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding: 3rem 0;
  text-align: center;
}
.footer {
  background-color: #111827;
  color: white;
  padding: 1rem 0;
  text-align: center;
}
</style>