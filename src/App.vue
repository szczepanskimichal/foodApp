<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue';
</script>
<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <div class="brand">
          <span class="brand-icon">Logo</span>
          <span class="brand-text">ShmashingBurger</span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <h1>Welcome to ShmashingBurger</h1>
        <p>Your favorite place for delicious burgers!</p>
      </div>
    </main>


    <AppFooter />
  </div>
</template>
<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
  padding: 1rem 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.main-content {
  flex: 1;
  padding: 3rem 0;
  text-align: center;
}

.main-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.main-content p {
  font-size: 1.125rem;
  color: #6b7280;
}

.footer {
  background-color: #111827;
  color: white;
  padding: 1rem 0;
  text-align: center;
}
</style>