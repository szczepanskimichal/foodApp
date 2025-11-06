<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue';
import AppNavigation from './components/layout/AppNavigation.vue';
import ToastContainer from './components/ui/ToastContainer.vue';
import ConnectionWarning from './components/ui/ConnectionWarning.vue';
</script>
<template>
  <AppNavigation />
  <ConnectionWarning />

    <main class="main-content">
     
        <router-view />
    </main>


    <AppFooter />
    <ToastContainer />

</template>
<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 3rem 0;
  text-align: center;
  background-color: #ffffff;
  color: #374151;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.footer {
  background-color: #111827;
  color: white;
  padding: 1rem 0;
  text-align: center;
}

/* Dark Mode Styles */
body.dark-mode .main-content {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}

[data-theme="dark"] .main-content {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}

body.dark-mode {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}

[data-theme="dark"] {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}
</style>