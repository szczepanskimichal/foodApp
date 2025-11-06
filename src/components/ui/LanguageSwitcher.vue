<template>
  <div class="language-switcher">
    <button @click="toggleDropdown" class="lang-button">
      {{ currentLanguageData.flag }} {{ currentLanguageData.name }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </button>
    
    <div v-show="isOpen" class="dropdown">
      <button
        v-for="lang in availableLanguages"
        :key="lang.code"
        @click="selectLanguage(lang.code as LanguageCode)"
        class="lang-option"
        :class="{ active: lang.code === currentLanguage }"
      >
        {{ lang.flag }} {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n, type LanguageCode } from '../../composables/useI18n'

const { currentLanguage, currentLanguageData, availableLanguages, setLanguage } = useI18n()

const isOpen = ref(false)

const toggleDropdown = (event: Event) => {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

const selectLanguage = (langCode: LanguageCode) => {
  setLanguage(langCode)
  isOpen.value = false
}

// Zamknij dropdown przy kliknięciu na zewnątrz
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  const switcher = document.querySelector('.language-switcher')
  
  if (switcher && !switcher.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  z-index: 10;
  position: relative;
}

.lang-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}

.arrow {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 140px;
  overflow: hidden;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.lang-option:hover {
  background: #f3f4f6;
}

.lang-option.active {
  background: #fef2f2;
  color: #dc2626;
  font-weight: 600;
}

.lang-option:first-child {
  border-radius: 0.375rem 0.375rem 0 0;
}

.lang-option:last-child {
  border-radius: 0 0 0.375rem 0.375rem;
}

/* Dark Mode Styles */
body.dark-mode .lang-button {
  background: rgba(45, 45, 45, 0.8) !important;
  border-color: #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .lang-button:hover {
  background: rgba(64, 64, 64, 0.8) !important;
}

body.dark-mode .dropdown {
  background: #2d2d2d !important;
  border-color: #404040 !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
}

body.dark-mode .lang-option {
  color: #e5e5e5 !important;
}

body.dark-mode .lang-option:hover {
  background: #404040 !important;
}

body.dark-mode .lang-option.active {
  background: rgba(220, 38, 38, 0.1) !important;
  color: #dc2626 !important;
}
</style>