<script setup lang="ts">
</script>

<template>
  <footer>
    <p>© 2025 ShmashingBurger. All rights reserved.</p>
  </footer>
</template>

<style>
footer {
  background-color: #f8f8f8;
  padding: 1rem;
  text-align: center;
  color: #374151;
}

/* Dark Mode Styles */
body.dark-mode footer {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}

[data-theme="dark"] footer {
  background-color: #1a1a1a !important;
  color: #e5e5e5 !important;
}
</style>
