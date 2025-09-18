import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics(measurementId: string = 'G-029BPEJWP9') {
  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [measurementId]);

  const trackEvent = (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  };

  const trackPageView = (path: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId, {
        page_path: path,
        page_title: title,
      });
    }
  };

  const trackSearch = (searchTerm: string, filters?: Record<string, any>) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
    });

    if (filters && Object.keys(filters).length > 0) {
      trackEvent({
        action: 'search_filter',
        category: 'engagement',
        label: JSON.stringify(filters),
      });
    }
  };

  const trackBusinessView = (businessId: string, businessName: string, category: string) => {
    trackEvent({
      action: 'view_business',
      category: 'business_interaction',
      label: `${businessName} (${category})`,
    });
  };

  const trackBookingAttempt = (businessId: string, businessType: string) => {
    trackEvent({
      action: 'booking_attempt',
      category: 'conversion',
      label: businessType,
    });
  };

  const trackReviewSubmission = (businessId: string, rating: number) => {
    trackEvent({
      action: 'submit_review',
      category: 'engagement',
      label: 'business_review',
      value: rating,
    });
  };

  const trackLanguageChange = (fromLang: string, toLang: string) => {
    trackEvent({
      action: 'language_change',
      category: 'user_preference',
      label: `${fromLang}_to_${toLang}`,
    });
  };

  const trackTouristasAIInteraction = (action: string, message?: string) => {
    trackEvent({
      action: `touristas_ai_${action}`,
      category: 'ai_interaction',
      label: message ? message.substring(0, 100) : undefined,
    });
  };

  const trackBusinessSubmission = (category: string, subscriptionPlan: string) => {
    trackEvent({
      action: 'business_submission',
      category: 'conversion',
      label: `${category}_${subscriptionPlan}`,
    });
  };

  const trackLiveSearchUsage = (query: string, resultCount: number) => {
    trackEvent({
      action: 'live_search',
      category: 'search_engagement',
      label: query,
      value: resultCount,
    });
  };

  const trackSponsoredBusinessClick = (businessName: string, category: string) => {
    trackEvent({
      action: 'sponsored_business_click',
      category: 'sponsored_content',
      label: `${businessName} (${category})`,
    });
  };

  const trackPortalSectionView = (section: string) => {
    trackEvent({
      action: 'portal_section_view',
      category: 'content_engagement',
      label: section,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackSearch,
    trackBusinessView,
    trackBookingAttempt,
    trackReviewSubmission,
    trackLanguageChange,
    trackTouristasAIInteraction,
    trackBusinessSubmission,
    trackLiveSearchUsage,
    trackSponsoredBusinessClick,
    trackPortalSectionView,
  };
}
