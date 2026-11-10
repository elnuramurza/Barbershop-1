import React from 'react';
import { Wine, Coffee, Sparkles, Armchair, Gamepad2 } from 'lucide-react';
import { LOUNGE_IMAGE, BAR_COMPLIMENTS } from '../data/barbershopData';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface LoungeSectionProps {
  language: Language;
}

export const LoungeSection: React.FC<LoungeSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="lounge" className="py-20 sm:py-28 bg-[#0d0f12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
              {t.lounge.sectionNum}
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
              {t.lounge.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {t.lounge.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Lounge Image & Hospitality Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 relative min-h-[380px] lg:min-h-full">
            <img
              src={LOUNGE_IMAGE}
              alt="Лаунж-бар и кожаные кресла в барбершопе ORDEN Бишкек"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-neutral-200 text-xs sm:text-sm">
              <span className="text-[#d4ab53] font-semibold">Филиал Эркиндик 35: </span>
              {t.lounge.imageCaption}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#14171d] p-8 rounded-2xl border border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4ab53] tracking-wider uppercase mb-3">
                <Wine className="w-4 h-4 text-[#d4ab53]" />
                <span>{t.lounge.barKicker}</span>
              </div>
              <h3 className="font-['Cinzel'] text-2xl font-bold text-neutral-100 mb-3">
                {t.lounge.barTitle}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                {t.lounge.barDesc}
              </p>

              {/* Complimentary drink list */}
              <div className="space-y-4">
                {BAR_COMPLIMENTS.map((item) => (
                  <div key={item.id} className="pb-3 border-b border-neutral-800/80 last:border-0">
                    <div className="text-sm font-semibold text-neutral-100 flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-xs text-[#d4ab53] uppercase font-mono">{t.lounge.freeBadge}</span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Club Amenities */}
            <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
                <Armchair className="w-4 h-4 mx-auto text-[#d4ab53] mb-1.5" />
                <div className="text-[11px] font-medium text-neutral-300">Chesterfield</div>
              </div>
              <div className="p-2.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
                <Gamepad2 className="w-4 h-4 mx-auto text-[#d4ab53] mb-1.5" />
                <div className="text-[11px] font-medium text-neutral-300">PS5 Lounge</div>
              </div>
              <div className="p-2.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
                <Coffee className="w-4 h-4 mx-auto text-[#d4ab53] mb-1.5" />
                <div className="text-[11px] font-medium text-neutral-300">Arabica 100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
