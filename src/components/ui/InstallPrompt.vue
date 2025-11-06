<template>
  <div v-if="showInstallPrompt" class="install-prompt">
    <div class="install-content">
      <div class="install-icon">📱</div>
      <div class="install-text">
        <h3>{{ t('pwa.installTitle') }}</h3>
        <p>{{ t('pwa.installDescription') }}</p>
      </div>
      <div class="install-actions">
        <button @click="installApp" class="install-btn primary">
          {{ t('pwa.install') }}
        </button>
        <button @click="dismissPrompt" class="install-btn secondary">
          {{ t('pwa.later') }}
        </button>
      </div>
      <button @click="dismissPrompt" class="close-btn">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()
const showInstallPrompt = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  console.log('InstallPrompt mounted')
  
  // Sprawdź czy PWA może być zainstalowana
  if ('serviceWorker' in navigator) {
    console.log('Service Worker supported')
  } else {
    console.log('Service Worker NOT supported')
  }
  
  // Sprawdź czy beforeinstallprompt jest wspierane
  let installPromptSupported = false
  
  // Nasłuchuj na event beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired - PWA installable!')
    installPromptSupported = true
    e.preventDefault()
    deferredPrompt = e
    
    // Sprawdź czy użytkownik już nie odrzucił wcześniej
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (!dismissed) {
      showInstallPrompt.value = true
    }
  })

  // Fallback - pokaż prompt po 3 sekundach jeśli beforeinstallprompt się nie wywołał
  setTimeout(() => {
    if (!installPromptSupported && !showInstallPrompt.value) {
      console.log('beforeinstallprompt not fired, showing fallback prompt')
      showInstallPrompt.value = true
    }
  }, 3000)

  // Nasłuchuj na force install event
  window.addEventListener('force-install-prompt', () => {
    console.log('Force install prompt triggered')
    showInstallPrompt.value = true
  })

  // Sprawdź czy app jest już zainstalowana
  window.addEventListener('appinstalled', () => {
    console.log('App installed!')
    showInstallPrompt.value = false
    localStorage.setItem('pwa-installed', 'true')
  })
  
  // Sprawdź czy to standalone mode (już zainstalowana)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App running in standalone mode - already installed')
    showInstallPrompt.value = false
  } else {
    console.log('App running in browser mode')
  }
})

const installApp = async () => {
  console.log('Install clicked, deferredPrompt:', deferredPrompt)
  
  if (deferredPrompt) {
    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      console.log('User choice:', outcome)
      
      if (outcome === 'accepted') {
        console.log('PWA installed')
      }
      
      deferredPrompt = null
      showInstallPrompt.value = false
    } catch (error) {
      console.error('Install error:', error)
    }
  } else {
    // Fallback - pokaż instrukcje
    alert('Aby zainstalować aplikację:\n\n1. W Chrome: kliknij ikonę + w pasku adresu\n2. Lub Menu → Zainstaluj aplikację\n3. Na telefonie: Udostępnij → Dodaj do ekranu głównego')
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', 'true')
  
  // Pokaż ponownie za tydzień
  setTimeout(() => {
    localStorage.removeItem('pwa-install-dismissed')
  }, 7 * 24 * 60 * 60 * 1000)
}
</script>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 1000;
  animation: slideUp 0.3s ease-out;
}

@media (min-width: 768px) {
  .install-prompt {
    left: auto;
    right: 20px;
    max-width: 400px;
  }
}

.install-content {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #e5e7eb;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
}

.install-icon {
  font-size: 32px;
  grid-row: 1 / 3;
}

.install-text h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.install-text p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.install-actions {
  display: flex;
  gap: 8px;
  grid-column: 2 / 4;
  margin-top: 12px;
}

.install-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.install-btn.primary {
  background: #dc2626;
  color: white;
}

.install-btn.primary:hover {
  background: #b91c1c;
  transform: translateY(-1px);
}

.install-btn.secondary {
  background: #f3f4f6;
  color: #374151;
}

.install-btn.secondary:hover {
  background: #e5e7eb;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 16px;
  color: #9ca3af;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Dark mode */
body.dark-mode .install-content {
  background: #2d2d2d;
  border-color: #404040;
}

body.dark-mode .install-text h3 {
  color: #e5e5e5;
}

body.dark-mode .install-text p {
  color: #b3b3b3;
}

body.dark-mode .install-btn.secondary {
  background: #404040;
  color: #e5e5e5;
}

body.dark-mode .install-btn.secondary:hover {
  background: #555555;
}

body.dark-mode .close-btn {
  color: #b3b3b3;
}

body.dark-mode .close-btn:hover {
  background: #404040;
  color: #e5e5e5;
}
</style>