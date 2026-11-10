import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Car, Navigation, Calendar, ExternalLink } from 'lucide-react';
import { BRANCHES } from '../data/barbershopData';
import { Branch } from '../types/barbershop';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';
import { BishkekGoogleMap } from './BishkekGoogleMap';

interface LocationsSectionProps {
  onSelectBranchBooking: (branchId: 'erkindik' | 'tokombaeva') => void;
  language: Language;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onSelectBranchBooking,
  language,
}) => {
  const [activeBranchId, setActiveBranchId] = useState<'erkindik' | 'tokombaeva'>('erkindik');

  const t = TRANSLATIONS[language];
  const currentBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  return (
    <section id="locations" className="py-20 sm:py-28 bg-[#14171d] border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
              {t.locations.sectionNum}
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
              {t.locations.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {t.locations.subtitle}
          </p>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0d0f12] border border-neutral-800 rounded-xl mb-8 max-w-md">
          {BRANCHES.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setActiveBranchId(branch.id)}
              className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeBranchId === branch.id
                  ? 'bg-neutral-800 text-[#d4ab53] shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {branch.id === 'erkindik' ? t.locations.centerTab : t.locations.southTab}
            </button>
          ))}
        </div>

        {/* 2-Column Grid: Branch Details & Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Column */}
          <div className="lg:col-span-6 bg-[#0d0f12] border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <div className="text-xs font-semibold text-[#d4ab53] uppercase tracking-wider mb-1">
                  {currentBranch.district}
                </div>
                <h3 className="text-2xl font-bold text-neutral-100 font-['Cinzel']">
                  {currentBranch.name}
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-neutral-200">
                <MapPin className="w-5 h-5 text-[#d4ab53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{currentBranch.address}</div>
                  <div className="text-xs text-neutral-400 mt-1">{currentBranch.landmark}</div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 text-sm text-neutral-200">
                <Clock className="w-5 h-5 text-[#d4ab53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{t.locations.workingHours}</div>
                  <div className="text-xs text-neutral-400 mt-1">{t.locations.workingHoursDesc}</div>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start gap-3 text-sm text-neutral-200">
                <Car className="w-5 h-5 text-[#d4ab53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{t.locations.parking}</div>
                  <div className="text-xs text-neutral-400 mt-1">{currentBranch.parking}</div>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${currentBranch.phone.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700/80 rounded-lg hover:border-[#d4ab53] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#d4ab53]" />
                  <span>{currentBranch.phone}</span>
                </a>

                <a
                  href={currentBranch.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-400 bg-neutral-900 border border-neutral-700/80 rounded-lg hover:border-emerald-500 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.locations.whatsAppBtn}</span>
                </a>
              </div>
            </div>

            {/* Actions: Book in this branch + Map links */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectBranchBooking(currentBranch.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-[#0d0f12] bg-[#d4ab53] hover:bg-[#c69431] rounded-lg transition-colors active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.locations.bookThisBranch}</span>
              </button>

              <a
                href={currentBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#d4ab53]" />
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </a>

              <a
                href={currentBranch.twoGisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors"
              >
                <span>2GIS</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <BishkekGoogleMap
              activeBranchId={activeBranchId}
              onSelectBranch={setActiveBranchId}
              language={language}
            />

            {/* Map Instruction & Navigation Tips */}
            <div className="bg-[#0d0f12] p-4 rounded-xl border border-neutral-800 text-xs text-neutral-400 space-y-2">
              <div className="flex items-center justify-between text-neutral-300 font-medium">
                <span>{t.locations.directionsTip}</span>
                <span className="text-[#d4ab53] text-[11px] font-mono">
                  {activeBranchId === 'erkindik' ? '42.8746° N, 74.6067° E' : '42.8228° N, 74.6202° E'}
                </span>
              </div>
              <p className="leading-relaxed">
                {activeBranchId === 'erkindik'
                  ? 'Удобный подъезд с улицы Токтогула или Киевской. На перекрестке с Эркиндик поверните во двор со шлагбаумом к парадному входу ORDEN.'
                  : 'По Южной магистрали в сторону 7-го микрорайона. Въезд на гостевую стоянку прямо перед главным входом в ЖК «Империал» напротив парка Асанбай.'}
              </p>
              <div className="text-[11px] text-neutral-500 pt-1">
                {t.locations.mapControlsNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
