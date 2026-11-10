import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/barbershopData';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="py-20 sm:py-28 bg-[#0d0f12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
              {t.reviews.sectionNum}
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
              {t.reviews.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xl font-bold text-neutral-100 font-['Cinzel']">5.0 / 5.0</div>
              <div className="text-xs text-neutral-400">{t.reviews.scoreLabel}</div>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between bg-[#14171d] border border-neutral-800 rounded-2xl p-6 relative group hover:border-[#d4ab53]/40 transition-colors"
            >
              <div>
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500">{rev.date}</span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Service details */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-neutral-100">{rev.author}</span>
                  <span title={t.reviews.verifiedVisit} className="inline-flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 text-[#d4ab53]" />
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mb-2">{rev.role}</div>
                <div className="text-[11px] text-[#d4ab53]/90 flex items-center gap-1.5 font-medium">
                  <span>{rev.serviceName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.branch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
