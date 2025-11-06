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
  
  // HomePage
  home: {
    no: { 
      heroTitle: 'Smak som aldri før',
      heroSubtitle: 'Våre håndlagde burgere er laget med de ferskeste ingrediensene og serveres med et smil',
      heroButton: 'Se Menyen',
      reviewsButton: 'Les Anmeldelser',
      featureQuality: 'Førsteklasses Kvalitet',
      featureQualityDesc: 'Vi bruker bare de beste ingrediensene fra lokale leverandører',
      featureFresh: 'Alltid Fersk',
      featureFreshDesc: 'Alle burgere lages fresh når du bestiller',
      featureFast: 'Rask Service',
      featureFastDesc: 'Fra bestilling til servering på under 10 minutter'
    },
    en: { 
      heroTitle: 'Taste like never before',
      heroSubtitle: 'Our handcrafted burgers are made with the freshest ingredients and served with a smile',
      heroButton: 'View Menu',
      reviewsButton: 'Read Reviews',
      featureQuality: 'Premium Quality',
      featureQualityDesc: 'We use only the finest ingredients from local suppliers',
      featureFresh: 'Always Fresh',
      featureFreshDesc: 'All burgers are made fresh when you order',
      featureFast: 'Fast Service',
      featureFastDesc: 'From order to serving in under 10 minutes'
    },
    pl: { 
      heroTitle: 'Smak jak nigdy wcześniej',
      heroSubtitle: 'Nasze ręcznie robione burgery są przygotowywane z najświeższych składników i podawane z uśmiechem',
      heroButton: 'Zobacz Menu',
      reviewsButton: 'Czytaj Opinie',
      featureQuality: 'Najwyższa Jakość',
      featureQualityDesc: 'Używamy tylko najlepszych składników od lokalnych dostawców',
      featureFresh: 'Zawsze Świeże',
      featureFreshDesc: 'Wszystkie burgery robimy na świeżo po zamówieniu',
      featureFast: 'Szybka Obsługa',
      featureFastDesc: 'Od zamówienia do podania w mniej niż 10 minut'
    },
    de: { 
      heroTitle: 'Geschmack wie nie zuvor',
      heroSubtitle: 'Unsere handgemachten Burger werden mit den frischesten Zutaten zubereitet und mit einem Lächeln serviert',
      heroButton: 'Speisekarte ansehen',
      reviewsButton: 'Bewertungen lesen',
      featureQuality: 'Premium Qualität',
      featureQualityDesc: 'Wir verwenden nur die besten Zutaten von lokalen Lieferanten',
      featureFresh: 'Immer Frisch',
      featureFreshDesc: 'Alle Burger werden frisch zubereitet, wenn Sie bestellen',
      featureFast: 'Schneller Service',
      featureFastDesc: 'Von der Bestellung bis zur Servierung in unter 10 Minuten'
    }
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

  // Menu Categories
  categories: {
    no: {
      all: 'Alle varer',
      burgers: 'Burgere',
      chicken: 'Kylling',
      sides: 'Tilbehør',
      drinks: 'Drikker',
      desserts: 'Desserter'
    },
    en: {
      all: 'All Items',
      burgers: 'Burgers',
      chicken: 'Chicken',
      sides: 'Sides',
      drinks: 'Drinks',
      desserts: 'Desserts'
    },
    pl: {
      all: 'Wszystkie pozycje',
      burgers: 'Burgery',
      chicken: 'Kurczak',
      sides: 'Dodatki',
      drinks: 'Napoje',
      desserts: 'Desery'
    },
    de: {
      all: 'Alle Artikel',
      burgers: 'Burger',
      chicken: 'Hähnchen',
      sides: 'Beilagen',
      drinks: 'Getränke',
      desserts: 'Desserts'
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
  },

  // Location
  location: {
    no: {
      title: 'Finn oss',
      subtitle: 'Vi er lokalisert i hjertet av byen',
      address: 'Adresse',
      hours: 'Åpningstider',
      contact: 'Kontakt',
      directions: 'Få veibeskrivelse',
      followUs: 'Følg oss'
    },
    en: {
      title: 'Find Us',
      subtitle: 'We are located in the heart of the city',
      address: 'Address',
      hours: 'Opening Hours',
      contact: 'Contact',
      directions: 'Get Directions',
      followUs: 'Follow Us'
    },
    pl: {
      title: 'Znajdź nas',
      subtitle: 'Jesteśmy zlokalizowani w sercu miasta',
      address: 'Adres',
      hours: 'Godziny otwarcia',
      contact: 'Kontakt',
      directions: 'Wskazówki dojazdu',
      followUs: 'Śledź nas'
    },
    de: {
      title: 'Finde uns',
      subtitle: 'Wir befinden uns im Herzen der Stadt',
      address: 'Adresse',
      hours: 'Öffnungszeiten',
      contact: 'Kontakt',
      directions: 'Wegbeschreibung',
      followUs: 'Folge uns'
    }
  },

  // Reviews
  reviews: {
    no: {
      title: 'Kundeanmeldelser',
      subtitle: 'Hva våre kunder sier om oss',
      writeReview: 'Skriv en anmeldelse'
    },
    en: {
      title: 'Customer Reviews',
      subtitle: 'What our customers say about us',
      writeReview: 'Write a Review'
    },
    pl: {
      title: 'Opinie klientów',
      subtitle: 'Co mówią o nas nasi klienci',
      writeReview: 'Napisz opinię'
    },
    de: {
      title: 'Kundenbewertungen',
      subtitle: 'Was unsere Kunden über uns sagen',
      writeReview: 'Bewertung schreiben'
    }
  },

  // 404 Page
  notFound: {
    no: {
      title: 'Siden ble ikke funnet',
      message: 'Beklager, siden du leter etter eksisterer ikke.',
      backHome: 'Tilbake til hjem'
    },
    en: {
      title: 'Page Not Found',
      message: 'Sorry, the page you are looking for does not exist.',
      backHome: 'Back to Home'
    },
    pl: {
      title: 'Strona nie znaleziona',
      message: 'Przepraszamy, strona której szukasz nie istnieje.',
      backHome: 'Powrót do strony głównej'
    },
    de: {
      title: 'Seite nicht gefunden',
      message: 'Entschuldigung, die Seite, die Sie suchen, existiert nicht.',
      backHome: 'Zurück zur Startseite'
    }
  },

  // Connection warnings
  connection: {
    no: {
      slowDetected: 'Langsom tilkobling oppdaget. Bilder og kart kan laste senere.'
    },
    en: {
      slowDetected: 'Slow connection detected. Images and maps may load slower.'
    },
    pl: {
      slowDetected: 'Wykryto wolne połączenie. Obrazy i mapy mogą ładować się wolniej.'
    },
    de: {
      slowDetected: 'Langsame Verbindung erkannt. Bilder und Karten können langsamer laden.'
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