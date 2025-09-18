import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { useAnalytics } from "@/hooks/use-analytics";
import Index from "./pages/Index";
import BusinessDetail from "./pages/BusinessDetail";
import CategoryDetail from "./pages/CategoryDetail";
import VillageDetail from "./pages/VillageDetail";
import BeachDetail from "./pages/BeachDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Portal from "./pages/Portal";
import Categories from "./pages/Categories";
import Villages from "./pages/Villages";
import Beaches from "./pages/Beaches";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import SubmitBusiness from "./pages/SubmitBusiness";
import TouristasAI from "./pages/TouristasAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Analytics wrapper component
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { trackPageView } = useAnalytics('G-029BPEJWP9');

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location, trackPageView]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Business Routes */}
            <Route path="/business/:slug" element={<BusinessDetail />} />
            
            {/* Category Routes */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<CategoryDetail />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            
            {/* Village Routes */}
            <Route path="/villages" element={<Villages />} />
            <Route path="/villages/:slug" element={<VillageDetail />} />
            <Route path="/village/:slug" element={<VillageDetail />} />
            
            {/* Beach Routes */}
            <Route path="/beaches" element={<Beaches />} />
            <Route path="/beaches/:slug" element={<BeachDetail />} />
            <Route path="/beach/:slug" element={<BeachDetail />} />
            
            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/submit-business" element={<SubmitBusiness />} />
            <Route path="/touristas-ai" element={<TouristasAI />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            </AnalyticsWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
