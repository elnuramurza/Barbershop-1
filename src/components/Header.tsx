import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Phone, MapPin, Calendar, Globe, ChevronDown } from 'lucide-react';
import { Language, LANGUAGES } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenCart: () => void;
  cartCount: number;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenCart,
  cartCount,
  language,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.masters, href: '#masters' },
    { label: t.nav.lounge, href: '#lounge' },
    { label: t.nav.boutique, href: '#boutique' },
    { label: t.nav.locations, href: '#locations' },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 lg:gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a
            href="#"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            <span className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-widest text-neutral-100 group-hover:text-[#d4ab53] transition-colors">
              ORDEN
            </span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#d4ab53] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Language Switcher, Cart & Primary Booking CTA) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-[#d4ab53] bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
                aria-label="Сменить язык / Switch language"
              >
                <Globe className="w-3.5 h-3.5 text-[#d4ab53]" />
                <span>{currentLangObj.shortLabel}</span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#14171d] border border-neutral-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        language === lang.code
                          ? 'text-[#d4ab53] bg-neutral-800/80 font-bold'
                          : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-sm">{lang.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-300 hover:text-[#d4ab53] hover:bg-neutral-800/60 rounded-lg transition-colors"
              title={t.nav.cart}
              aria-label={t.nav.cart}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c69431] text-[#0d0f12] text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0d0f12] bg-gradient-to-r from-[#d4ab53] to-[#c69431] hover:from-[#dfc480] hover:to-[#d4ab53] rounded-lg transition-all shadow-md shadow-[#c69431]/20 whitespace-nowrap shrink-0 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookOnline}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#14171d] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-200 hover:text-[#d4ab53] transition-colors py-1.5 border-b border-neutral-800/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Language Switcher Row */}
          <div className="pt-2 border-t border-neutral-800/80">
            <div className="text-xs text-neutral-400 mb-2 font-medium">Язык / Тил / Language / 语言:</div>
            <div className="grid grid-cols-4 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                    language === lang.code
                      ? 'bg-[#d4ab53] text-[#0d0f12] border-[#d4ab53]'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}
                >
                  {lang.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-[#0d0f12] bg-[#d4ab53] hover:bg-[#c69431] rounded-lg transition-colors shadow-sm"
            >
              {t.nav.bookOnline}
            </button>
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4ab53]" />
                бул. Эркиндик 35 · ул. Токомбаева 21/1
              </span>
              <a href="tel:+996555148822" className="flex items-center gap-1 text-[#d4ab53] hover:underline">
                <Phone className="w-3.5 h-3.5" />
                +996 555 14-88-22
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
