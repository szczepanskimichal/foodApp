<template>
  <button @click="toggleDarkMode" class="theme-toggle" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from '../../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.theme-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(20deg);
}

/* Dark mode styling */
body.dark-mode .theme-toggle {
  background: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
}

body.dark-mode .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.3) !important;
}
</style>