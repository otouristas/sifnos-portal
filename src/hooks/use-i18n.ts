import { useState, useEffect, useContext } from 'react';
import { I18nContext } from '@/components/providers/i18n-provider';

type Language = 'en' | 'el';

interface Translation {
  [key: string]: string | Translation;
}

const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      categories: 'Categories',
      villages: 'Villages',
      blog: 'Blog',
      portal: 'Sifnos Portal',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      listBusiness: 'List Your Business'
    },
    hero: {
      title: 'TravelSifnos.gr',
      subtitle: 'The most complete business directory for beautiful Sifnos island. Discover authentic experiences, local businesses, and hidden gems.',
      searchPlaceholder: 'Search businesses, restaurants, accommodation...',
      searchButton: 'Search',
      stats: {
        businesses: 'Businesses',
        villages: 'Villages',
        categories: 'Categories'
      }
    },
    categories: {
      title: 'Explore Sifnos',
      subtitle: 'Discover authentic local businesses across all categories that make Sifnos special',
      accommodation: 'Accommodation',
      accommodationDesc: 'Hotels, villas, rooms & guesthouses',
      foodDrink: 'Food & Drink',
      foodDrinkDesc: 'Restaurants, taverns, cafés & bakeries',
      pottery: 'Pottery & Crafts',
      potteryDesc: 'Studios, workshops & traditional crafts',
      experiences: 'Experiences',
      experiencesDesc: 'Tours, activities & local experiences',
      rentals: 'Vehicle Rentals',
      rentalsDesc: 'Cars, scooters, ATVs & boat rentals',
      wellness: 'Wellness',
      wellnessDesc: 'Yoga, spas, retreats & wellness',
      culture: 'Culture',
      cultureDesc: 'Museums, history & cultural sites',
      beaches: 'Beaches & Nature',
      beachesDesc: 'Beaches, hiking trails & natural sites'
    },
    common: {
      verified: 'Verified',
      viewDetails: 'View Details',
      viewAll: 'View All',
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Try Again',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      rating: 'Rating',
      price: 'Price',
      location: 'Location'
    }
  },
  el: {
    nav: {
      home: 'Αρχική',
      categories: 'Κατηγορίες',
      villages: 'Χωριά',
      blog: 'Ιστολόγιο',
      portal: 'Πύλη Σίφνου',
      about: 'Σχετικά',
      contact: 'Επικοινωνία',
      login: 'Σύνδεση',
      listBusiness: 'Καταχωρήστε την Επιχείρησή σας'
    },
    hero: {
      title: 'TravelSifnos.gr',
      subtitle: 'Ο πιο ολοκληρωμένος οδηγός επιχειρήσεων για το όμορφο νησί της Σίφνου. Ανακαλύψτε αυθεντικές εμπειρίες, τοπικές επιχειρήσεις και κρυφά διαμάντια.',
      searchPlaceholder: 'Αναζήτηση επιχειρήσεων, εστιατορίων, καταλυμάτων...',
      searchButton: 'Αναζήτηση',
      stats: {
        businesses: 'Επιχειρήσεις',
        villages: 'Χωριά',
        categories: 'Κατηγορίες'
      }
    },
    categories: {
      title: 'Εξερευνήστε τη Σίφνο',
      subtitle: 'Ανακαλύψτε αυθεντικές τοπικές επιχειρήσεις σε όλες τις κατηγορίες που κάνουν τη Σίφνο ξεχωριστή',
      accommodation: 'Καταλύματα',
      accommodationDesc: 'Ξενοδοχεία, βίλες, δωμάτια & ξενώνες',
      foodDrink: 'Φαγητό & Ποτό',
      foodDrinkDesc: 'Εστιατόρια, ταβέρνες, καφετέριες & αρτοποιεία',
      pottery: 'Κεραμική & Χειροτεχνία',
      potteryDesc: 'Στούντιο, εργαστήρια & παραδοσιακές τέχνες',
      experiences: 'Εμπειρίες',
      experiencesDesc: 'Εκδρομές, δραστηριότητες & τοπικές εμπειρίες',
      rentals: 'Ενοικίαση Οχημάτων',
      rentalsDesc: 'Αυτοκίνητα, μοτοσυκλέτες, ATV & ενοικίαση σκαφών',
      wellness: 'Ευεξία',
      wellnessDesc: 'Γιόγκα, σπα, retreats & ευεξία',
      culture: 'Πολιτισμός',
      cultureDesc: 'Μουσεία, ιστορία & πολιτιστικοί χώροι',
      beaches: 'Παραλίες & Φύση',
      beachesDesc: 'Παραλίες, μονοπάτια πεζοπορίας & φυσικοί χώροι'
    },
    common: {
      verified: 'Επαληθευμένο',
      viewDetails: 'Προβολή Λεπτομερειών',
      viewAll: 'Προβολή Όλων',
      loading: 'Φόρτωση...',
      error: 'Κάτι πήγε στραβά',
      retry: 'Δοκιμάστε Ξανά',
      close: 'Κλείσιμο',
      save: 'Αποθήκευση',
      cancel: 'Ακύρωση',
      submit: 'Υποβολή',
      search: 'Αναζήτηση',
      filter: 'Φίλτρο',
      clear: 'Καθαρισμός',
      rating: 'Αξιολόγηση',
      price: 'Τιμή',
      location: 'Τοποθεσία'
    }
  }
};

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function createI18nHook() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'en' || saved === 'el')) {
        return saved;
      }
      // Auto-detect based on browser language
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith('el') ? 'el' : 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return {
    language,
    setLanguage,
    t,
    isRTL: language === 'ar' // Add more RTL languages as needed
  };
}
