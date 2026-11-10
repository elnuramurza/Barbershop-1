/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MastersSection } from './components/MastersSection';
import { LoungeSection } from './components/LoungeSection';
import { BoutiqueSection } from './components/BoutiqueSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationsSection } from './components/LocationsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { StyleQuizModal } from './components/StyleQuizModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Product } from './types/barbershop';
import { Language } from './i18n/types';
import { ChatBot } from './components/ChatBot';
import { Calendar, Phone } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orden_language') as Language;
      if (saved && ['ru', 'kg', 'en', 'zh'].includes(saved)) {
        return saved;
      }
    }
    return 'ru';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedBarberId, setPreselectedBarberId] = useState<string | undefined>();
  const [preselectedBranchId, setPreselectedBranchId] = useState<'erkindik' | 'tokombaeva' | undefined>();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  // Listen to Google Maps quota exceeded event
  useEffect(() => {
    const handleQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('orden_language', newLang);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Booking triggers
  const handleOpenGeneralBooking = () => {
    setPreselectedServiceId(undefined);
    setPreselectedBarberId(undefined);
    setPreselectedBranchId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedBarberId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectBarber = (barberId: string) => {
    setPreselectedBarberId(barberId);
    setPreselectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectBranchBooking = (branchId: 'erkindik' | 'tokombaeva') => {
    setPreselectedBranchId(branchId);
    setIsBookingOpen(true);
  };

  const handleApplyQuizRecommendation = (serviceId: string, barberId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedBarberId(barberId);
    setIsBookingOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0d10] text-neutral-100 selection:bg-[#c69431] selection:text-[#0d0f12]">
      {/* Google Maps Quota Defense Banner (only if quota event triggered) */}
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Header adheres strictly to Top Bar Contract */}
      <Header
        onOpenBooking={handleOpenGeneralBooking}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenGeneralBooking}
          onOpenQuiz={() => setIsQuizOpen(true)}
          language={language}
        />

        {/* Services & Price Menu */}
        <ServicesSection
          onSelectService={handleSelectService}
          language={language}
        />

        {/* Master Craftsmen Roster */}
        <MastersSection
          onSelectBarber={handleSelectBarber}
          language={language}
        />

        {/* Lounge & Complimentary Club Bar */}
        <LoungeSection language={language} />

        {/* Cosmetics Boutique */}
        <BoutiqueSection
          onAddToCart={handleAddToCart}
          language={language}
        />

        {/* Reviews from Bishkek verified clients */}
        <ReviewsSection language={language} />

        {/* Bishkek Locations & Interactive Google Maps */}
        <LocationsSection
          onSelectBranchBooking={handleSelectBranchBooking}
          language={language}
        />

        {/* FAQ Accordion */}
        <FaqSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedBarberId={preselectedBarberId}
        preselectedBranchId={preselectedBranchId}
        language={language}
      />

      {/* Interactive Style Consultation Quiz */}
      <StyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onApplyRecommendation={handleApplyQuizRecommendation}
        language={language}
      />

      {/* Boutique Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        language={language}
      />

      {/* AI Concierge Chatbot */}
      <ChatBot
        language={language}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Mobile Sticky Booking Strip */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30">
        <div className="bg-[#14171d]/95 backdrop-blur-md border border-neutral-700/80 p-2.5 rounded-xl shadow-2xl flex items-center justify-between gap-3">
          <div className="pl-1">
            <div className="text-xs font-bold text-neutral-100 font-['Cinzel']">ORDEN Bishkek</div>
            <div className="text-[10px] text-[#d4ab53]">10:00 - 22:00</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:+996555148822"
              className="p-2.5 bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-700"
              title="Позвонить"
              aria-label="Позвонить в барбершоп"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={handleOpenGeneralBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#d4ab53] hover:bg-[#c69431] text-[#0d0f12] font-bold text-xs rounded-lg shadow-md whitespace-nowrap active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Записаться</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
