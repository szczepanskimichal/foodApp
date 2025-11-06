<template>
  <div class="pwa-debug" v-if="showDebug">
    <h3>PWA Debug Info</h3>
    <ul>
      <li>Service Worker: {{ swSupported ? '✅' : '❌' }}</li>
      <li>HTTPS/localhost: {{ isSecure ? '✅' : '❌' }}</li>
      <li>Manifest: {{ manifestValid ? '✅' : '❌' }}</li>
      <li>beforeinstallprompt: {{ installPromptFired ? '✅' : '❌' }}</li>
      <li>Display mode: {{ displayMode }}</li>
      <li>User Agent: {{ userAgent }}</li>
      <li>PWA dismissed: {{ pwaDismissed ? '✅' : '❌' }}</li>
      <li>PWA installed: {{ pwaInstalled ? '✅' : '❌' }}</li>
    </ul>
    <div class="debug-actions">
      <button @click="clearPWAStorage">Wyczyść PWA Storage</button>
      <button @click="forceShowInstall">Pokaż Install Prompt</button>
      <button @click="showDebug = false">Zamknij</button>
    </div>
  </div>
  <button @click="showDebug = true" class="debug-btn">🔧 PWA Debug</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showDebug = ref(false)
const swSupported = ref(false)
const isSecure = ref(false)
const manifestValid = ref(false)
const installPromptFired = ref(false)
const displayMode = ref('')
const userAgent = ref('')
const pwaDismissed = ref(false)
const pwaInstalled = ref(false)

onMounted(() => {
  swSupported.value = 'serviceWorker' in navigator
  isSecure.value = location.protocol === 'https:' || location.hostname === 'localhost'
  userAgent.value = navigator.userAgent
  
  // Sprawdź localStorage
  pwaDismissed.value = !!localStorage.getItem('pwa-install-dismissed')
  pwaInstalled.value = !!localStorage.getItem('pwa-installed')
  
  // Sprawdź display mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    displayMode.value = 'standalone'
  } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
    displayMode.value = 'fullscreen'
  } else {
    displayMode.value = 'browser'
  }
  
  // Sprawdź manifest
  const manifestLink = document.querySelector('link[rel="manifest"]')
  if (manifestLink) {
    manifestValid.value = true
  }
  
  // Nasłuchuj beforeinstallprompt
  window.addEventListener('beforeinstallprompt', () => {
    installPromptFired.value = true
  })
})

const clearPWAStorage = () => {
  localStorage.removeItem('pwa-install-dismissed')
  localStorage.removeItem('pwa-installed')
  pwaDismissed.value = false
  pwaInstalled.value = false
  alert('PWA storage wyczyszczony! Odśwież stronę.')
}

const forceShowInstall = () => {
  // Wywołaj event który pokaże install prompt
  window.dispatchEvent(new CustomEvent('force-install-prompt'))
  showDebug.value = false
}
</script>

<style scoped>
.pwa-debug {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #dc2626;
  border-radius: 8px;
  padding: 20px;
  z-index: 9999;
  max-width: 400px;
}

.debug-btn {
  position: fixed;
  bottom: 10px;
  left: 10px;
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.debug-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.debug-actions button {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.pwa-debug ul {
  text-align: left;
}

.pwa-debug li {
  margin: 8px 0;
  font-family: monospace;
}

body.dark-mode .pwa-debug {
  background: #2d2d2d;
  color: white;
}
</style>