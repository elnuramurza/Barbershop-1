import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/barbershopData';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[language];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0d0f12] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
            {t.faq.kicker}
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
            {t.faq.title}
          </h2>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#14171d] border border-neutral-800 rounded-xl overflow-hidden transition-colors hover:border-neutral-700"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-neutral-100 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d4ab53] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-neutral-800/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
