import { createContext, ReactNode } from 'react';
import { createI18nHook } from '@/hooks/use-i18n';

type Language = 'en' | 'el';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const i18nHook = createI18nHook();

  return (
    <I18nContext.Provider value={i18nHook}>
      {children}
    </I18nContext.Provider>
  );
}
