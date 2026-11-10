import React from 'react';
import { Calendar, Compass, ShieldCheck, Award, Sparkles, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/barbershopData';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0d0f12]">
      {/* Background Hero Image with Measured High-Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Интерьер премиального барбершопа ORDEN в Бишкеке"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f12]/95 via-[#0d0f12]/80 to-[#0d0f12]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-transparent to-[#0d0f12]/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Natural human editorial kicker */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53]">
            <span>{t.hero.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.hero.city}</span>
          </div>

          <h1 className="font-['Cinzel'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 leading-[1.1] text-balance">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-light">
            {t.hero.subtitle}
          </p>

          {/* Action Points */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-3 px-7 py-3.5 text-base font-semibold text-[#0d0f12] bg-gradient-to-r from-[#d4ab53] to-[#c69431] hover:from-[#dfc480] hover:to-[#d4ab53] rounded-lg transition-all shadow-lg shadow-[#c69431]/25 active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-5 h-5 text-[#0d0f12]" />
              <span>{t.hero.bookCta}</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-3 px-6 py-3.5 text-base font-medium text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#d4ab53]/60 rounded-lg transition-all backdrop-blur-sm active:scale-95 whitespace-nowrap"
            >
              <Compass className="w-5 h-5 text-[#d4ab53]" />
              <span>{t.hero.styleQuizCta}</span>
            </button>
          </div>

          {/* Location Trust Anchors */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4ab53] shrink-0" />
              <span>{t.hero.branchCenter}</span>
            </div>
            <div className="hidden sm:inline-block text-neutral-600">|</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4ab53] shrink-0" />
              <span>{t.hero.branchSouth}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI / Trust Strip below hero split */}
      <div className="relative z-10 border-t border-neutral-800/80 bg-[#14171d]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center shrink-0 text-[#d4ab53]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-100 font-['Cinzel'] tracking-wide">
                  {t.hero.kpiExperience}
                </div>
                <div className="text-xs text-neutral-400">{t.hero.kpiExperienceSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center shrink-0 text-[#d4ab53]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-100 font-['Cinzel'] tracking-wide">
                  {t.hero.kpiSterile}
                </div>
                <div className="text-xs text-neutral-400">{t.hero.kpiSterileSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center shrink-0 text-[#d4ab53]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-100 font-['Cinzel'] tracking-wide">
                  {t.hero.kpiLounge}
                </div>
                <div className="text-xs text-neutral-400">{t.hero.kpiLoungeSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center shrink-0 text-[#d4ab53]">
                <span className="font-['Cinzel'] font-bold text-lg text-[#d4ab53]">
                  {t.hero.kpiRating}
                </span>
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-100 font-['Cinzel'] tracking-wide">
                  Google & 2GIS
                </div>
                <div className="text-xs text-neutral-400">{t.hero.kpiRatingSub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
