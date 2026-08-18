import React, { useState, useEffect } from 'react';
import { studioApi } from './services/api';
import { Service, PortfolioItem, PricingPlan, Review, FAQItem } from './types';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Home Sections
import { HeroSection } from './components/home/HeroSection';
import { ServicesSection } from './components/home/ServicesSection';
import { WhyUsSection } from './components/home/WhyUsSection';
import { TimelineSection } from './components/home/TimelineSection';
import { PortfolioSection } from './components/home/PortfolioSection';
import { PricingSection } from './components/home/PricingSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FaqSection } from './components/home/FaqSection';
import { CtaBanner } from './components/home/CtaBanner';

// Pages
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { OrderPage } from './pages/OrderPage';
import { TrackPage } from './pages/TrackPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedOrderService, setSelectedOrderService] = useState<string>('');
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('');

  // Data loaded dynamically from centralized API store
  const [services, setServices] = useState<Service[]>(() => studioApi.getServices());
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => studioApi.getPortfolio());
  const [pricing, setPricing] = useState<PricingPlan[]>(() => studioApi.getPricing());
  const [reviews, setReviews] = useState<Review[]>(() => studioApi.getReviews());
  const [faqs, setFaqs] = useState<FAQItem[]>(() => studioApi.getFaqs());

  // Listen to hash changes for simple URL routing (e.g. #admin, #order, #track)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (['home', 'services', 'portfolio', 'pricing', 'order', 'track', 'about', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string, params?: { service?: string; orderId?: string }) => {
    if (params?.service) {
      setSelectedOrderService(params.service);
    }
    if (params?.orderId) {
      setActiveTrackingOrderId(params.orderId);
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for starting order with specific service pre-selected
  const handleStartOrder = (serviceName?: string) => {
    navigateTo('order', { service: serviceName || '' });
  };

  // Handler for viewing track page with an order ID
  const handleViewOrder = (orderId: string) => {
    navigateTo('track', { orderId });
  };

  // Synchronize dynamic store updates
  const refreshAppData = () => {
    setServices(studioApi.getServices());
    setPortfolio(studioApi.getPortfolio());
    setPricing(studioApi.getPricing());
    setReviews(studioApi.getReviews());
    setFaqs(studioApi.getFaqs());
  };

  return (
    <div className="min-h-screen bg-[#061516] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-teal-950">
      {/* Header Navigation (hidden in standalone Admin view) */}
      {currentPage !== 'admin' && (
        <Header
          currentPage={currentPage}
          onNavigate={(page) => navigateTo(page)}
          onStartOrder={() => handleStartOrder()}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {/* 1. Home Page */}
        {currentPage === 'home' && (
          <div>
            <HeroSection
              onStartOrder={() => handleStartOrder()}
              onExplorePortfolio={() => navigateTo('portfolio')}
            />

            <ServicesSection
              services={services}
              onOrderService={(srv) => handleStartOrder(srv)}
              onViewAllServices={() => navigateTo('services')}
            />

            <WhyUsSection />

            <TimelineSection />

            <PortfolioSection
              portfolio={portfolio}
              onViewAllPortfolio={() => navigateTo('portfolio')}
              onOrderProject={() => handleStartOrder()}
            />

            <PricingSection
              pricingPlans={pricing}
              onSelectPlan={(planTitle) => handleStartOrder(planTitle)}
            />

            <TestimonialsSection reviews={reviews} />

            <FaqSection
              faqs={faqs}
              onContactClick={() => navigateTo('contact')}
            />

            <CtaBanner
              onOrderClick={() => handleStartOrder()}
              onContactClick={() => navigateTo('contact')}
            />
          </div>
        )}

        {/* 2. Services Page */}
        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            onOrderService={(srv) => handleStartOrder(srv)}
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {/* 3. Portfolio Page */}
        {currentPage === 'portfolio' && (
          <PortfolioPage
            portfolio={portfolio}
            onOrderProject={() => handleStartOrder()}
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {/* 4. Order Page (Multi-step Wizard) */}
        {currentPage === 'order' && (
          <OrderPage
            initialProjectType={selectedOrderService}
            onOrderSuccess={(orderId) => {
              refreshAppData();
              handleViewOrder(orderId);
            }}
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {/* 5. Track Order Page */}
        {currentPage === 'track' && (
          <TrackPage
            initialOrderId={activeTrackingOrderId}
            onNewOrder={() => handleStartOrder()}
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {/* 6. Pricing dedicated view */}
        {currentPage === 'pricing' && (
          <div className="pt-24">
            <PricingSection
              pricingPlans={pricing}
              onSelectPlan={(planTitle) => handleStartOrder(planTitle)}
            />
            <CtaBanner
              onOrderClick={() => handleStartOrder()}
              onContactClick={() => navigateTo('contact')}
            />
          </div>
        )}

        {/* 7. About Page */}
        {currentPage === 'about' && (
          <AboutPage
            onOrderClick={() => handleStartOrder()}
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {/* 8. Contact Page */}
        {currentPage === 'contact' && (
          <ContactPage onBackToHome={() => navigateTo('home')} />
        )}

        {/* 9. Admin Dashboard Page */}
        {currentPage === 'admin' && (
          <AdminPage
            onBackToSite={() => {
              refreshAppData();
              navigateTo('home');
            }}
          />
        )}
      </main>

      {/* Footer (hidden in Admin view) */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={(page) => navigateTo(page)}
          onStartOrder={() => handleStartOrder()}
        />
      )}
    </div>
  );
}

export default App;
