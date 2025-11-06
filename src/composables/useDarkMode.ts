import { ref, computed, watch } from 'vue'

// Stan trybu ciemnego
const isDark = ref(false)

// Ładowanie z localStorage przy inicjalizacji
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('burger-dark-mode')
  if (saved) {
    isDark.value = JSON.parse(saved)
  } else {
    // Sprawdź preferencje systemu
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

export function useDarkMode() {
  // Przełączanie trybu
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  // Ustawianie konkretnego trybu
  const setDarkMode = (dark: boolean) => {
    isDark.value = dark
  }

  // Computed dla CSS klasy
  const themeClass = computed(() => isDark.value ? 'dark' : 'light')

  // Inicjalizacja przy załadowaniu
  if (typeof window !== 'undefined') {
    // Ustaw klasę na body od razu przy inicjalizacji
    if (isDark.value) {
      document.body.classList.add('dark-mode')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  // Zapisz do localStorage przy zmianie
  watch(isDark, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('burger-dark-mode', JSON.stringify(newValue))
      
      // Dodaj/usuń klasę z body i data atrybut
      if (newValue) {
        document.body.classList.add('dark-mode')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.body.classList.remove('dark-mode')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }
  }, { immediate: true })

  return {
    isDark: computed(() => isDark.value),
    themeClass,
    toggleDarkMode,
    setDarkMode
  }
}