import React, { useState } from 'react';
import { Clock, Check, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data/barbershopData';
import { ServiceItem } from '../types/barbershop';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  language: Language;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.services.all },
    { id: 'hair', label: t.services.hair },
    { id: 'beard', label: t.services.beard },
    { id: 'combo', label: t.services.combos },
    { id: 'spa', label: t.services.spa },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#0d0f12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
              {t.services.sectionNum}
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
              {t.services.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {t.services.subtitle}
          </p>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#14171d] border border-neutral-800 rounded-xl overflow-x-auto mb-10 max-w-fit scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-neutral-800 text-[#d4ab53] shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between bg-[#14171d] border rounded-2xl p-6 transition-all duration-200 hover:border-[#d4ab53]/50 group ${
                service.popular ? 'border-[#c69431]/40 ring-1 ring-[#c69431]/20' : 'border-neutral-800'
              }`}
            >
              <div>
                {/* Unboxed metadata line with typographic separator */}
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4ab53] font-medium">{service.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="tabular-nums">{service.durationMin} {t.services.duration}</span>
                    </span>
                  </div>
                  {service.popular && (
                    <span className="text-[11px] font-semibold text-[#d4ab53] tracking-wider uppercase">
                      {t.services.popularBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-neutral-100 group-hover:text-[#d4ab53] transition-colors mb-2.5 font-['Cinzel']">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed mb-5 font-light">
                  {service.description}
                </p>

                {/* What's included */}
                <div className="space-y-2 mb-6 pt-4 border-t border-neutral-800/80">
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {t.services.includesHeader}
                  </div>
                  {service.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#d4ab53] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking Trigger */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider">{t.services.priceHeader}</div>
                  <div className="text-2xl font-bold text-neutral-100 tabular-nums">
                    {service.price.toLocaleString('ru-RU')} <span className="text-sm font-normal text-[#d4ab53]">{t.services.currency}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0d0f12] bg-[#d4ab53] hover:bg-[#c69431] rounded-lg transition-colors shadow-sm whitespace-nowrap active:scale-95"
                >
                  <span>{t.services.selectBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
