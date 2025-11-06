import { ref, computed, reactive } from 'vue'

// Dostępne języki
export const languages = {
  no: { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  pl: { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
}

export type LanguageCode = keyof typeof languages

// Reaktywny aktualny język
const currentLanguage = ref<LanguageCode>('no')

// Słowniki tłumaczeń
const translations = reactive({
  // Nawigacja
  nav: {
    no: { home: 'Hjem', menu: 'Meny', about: 'Om oss', location: 'Plassering', reviews: 'Anmeldelser' },
    en: { home: 'Home', menu: 'Menu', about: 'About', location: 'Location', reviews: 'Reviews' },
    pl: { home: 'Start', menu: 'Menu', about: 'O nas', location: 'Lokalizacja', reviews: 'Opinie' },
    de: { home: 'Startseite', menu: 'Menü', about: 'Über uns', location: 'Standort', reviews: 'Bewertungen' }
  },
  
  // Menu
  menu: {
    no: { 
      title: 'Vår meny', 
      subtitle: 'Deilige burgere laget med kjærlighet og ferske ingredienser',
      addToCart: 'Legg i kurv'
    },
    en: { 
      title: 'Our Menu', 
      subtitle: 'Delicious burgers made with love and fresh ingredients',
      addToCart: 'Add to Cart'
    },
    pl: { 
      title: 'Nasze Menu', 
      subtitle: 'Pyszne burgery robione z miłością i świeżymi składnikami',
      addToCart: 'Dodaj do koszyka'
    },
    de: { 
      title: 'Unser Menü', 
      subtitle: 'Köstliche Burger mit Liebe und frischen Zutaten zubereitet',
      addToCart: 'In den Warenkorb'
    }
  },

  // About
  about: {
    no: {
      title: 'Om The Burger Truck',
      contactUs: 'Kontakt oss',
      joinTeam: 'Bli med på teamet'
    },
    en: {
      title: 'About The Burger Truck',
      contactUs: 'Contact Us',
      joinTeam: 'Join Our Team'
    },
    pl: {
      title: 'O The Burger Truck',
      contactUs: 'Skontaktuj się',
      joinTeam: 'Dołącz do zespołu'
    },
    de: {
      title: 'Über The Burger Truck',
      contactUs: 'Kontaktiere uns',
      joinTeam: 'Tritt unserem Team bei'
    }
  }
})

// Inicjalizacja z localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('burger-language') as LanguageCode
  if (saved && saved in languages) {
    currentLanguage.value = saved
  }
}

export function useI18n() {
  // Funkcja tłumaczenia
  const t = (key: string) => {
    const [section, item] = key.split('.')
    
    if (!section || !item) {
      console.warn(`Invalid translation key: ${key}`)
      return key
    }
    
    const sectionTranslations = translations[section as keyof typeof translations]
    if (!sectionTranslations) {
      console.warn(`Translation section not found: ${section}`)
      return key
    }
    
    const langTranslations = sectionTranslations[currentLanguage.value]
    if (!langTranslations) {
      console.warn(`Language not found: ${currentLanguage.value} for section: ${section}`)
      return key
    }
    
    const translation = langTranslations[item as keyof typeof langTranslations]
    if (!translation) {
      console.warn(`Translation not found: ${key} for language: ${currentLanguage.value}`)
      return key
    }
    
    return translation
  }

  // Zmiana języka
  const setLanguage = (lang: LanguageCode) => {
    currentLanguage.value = lang
    if (typeof window !== 'undefined') {
      localStorage.setItem('burger-language', lang)
    }
  }

  return {
    currentLanguage: computed(() => currentLanguage.value),
    currentLanguageData: computed(() => languages[currentLanguage.value]),
    availableLanguages: computed(() => Object.values(languages)),
    t,
    setLanguage
  }
}