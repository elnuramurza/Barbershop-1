import React from 'react';
import { Star, Calendar, MapPin, Scissors } from 'lucide-react';
import { BARBERS, BARBER_ACTION_IMAGE } from '../data/barbershopData';
import { Barber } from '../types/barbershop';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface MastersSectionProps {
  onSelectBarber: (barberId: string) => void;
  language: Language;
}

export const MastersSection: React.FC<MastersSectionProps> = ({ onSelectBarber, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="masters" className="py-20 sm:py-28 bg-[#14171d] border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
              {t.masters.sectionNum}
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
              {t.masters.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {t.masters.subtitle}
          </p>
        </div>

        {/* Feature Banner: Master in Action */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-neutral-800 bg-[#0d0f12] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
            <img
              src={BARBER_ACTION_IMAGE}
              alt="Мастер за работой в барбершопе ORDEN Бишкек"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent to-transparent" />
          </div>
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4ab53] tracking-wider uppercase">
              <Scissors className="w-4 h-4 text-[#d4ab53]" />
              <span>{t.masters.featureKicker}</span>
            </div>
            <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-neutral-100 leading-snug">
              {t.masters.featureTitle}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {t.masters.featureDesc}
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-neutral-400">
              <div>
                <span className="block text-xl font-bold text-neutral-100 tabular-nums font-['Cinzel']">
                  {t.masters.featureKpi1}
                </span>
                <span>{t.masters.featureKpi1Sub}</span>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <span className="block text-xl font-bold text-neutral-100 tabular-nums font-['Cinzel']">
                  {t.masters.featureKpi2}
                </span>
                <span>{t.masters.featureKpi2Sub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barbers Roster Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BARBERS.map((barber: Barber) => (
            <div
              key={barber.id}
              className="flex flex-col justify-between bg-[#0d0f12] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#d4ab53]/50 transition-all duration-200 group"
            >
              <div>
                {/* Master Avatar & Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={barber.avatar}
                      alt={barber.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-full object-cover border-2 border-neutral-700/80 group-hover:border-[#d4ab53] transition-colors"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#d4ab53] uppercase tracking-wider">
                        {barber.rank}
                      </div>
                      <h4 className="text-lg font-bold text-neutral-100 font-['Cinzel']">
                        {barber.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-neutral-200 tabular-nums">{barber.rating}</span>
                        <span>·</span>
                        <span>{barber.experienceYears} {t.masters.yearsExp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Branch Tag & Instagram */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4ab53]" />
                      {barber.branchId === 'erkindik'
                        ? 'Эркиндик'
                        : barber.branchId === 'tokombaeva'
                        ? 'Токомбаева'
                        : 'Эркиндик / Токомбаева'}
                    </span>
                    <span className="text-neutral-500 hover:text-neutral-300">
                      {barber.instagram}
                    </span>
                  </div>

                  {/* Specialty */}
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      {t.masters.specialtyLabel}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      {barber.specialty}
                    </p>
                  </div>

                  {/* Master quote */}
                  <div className="mt-3 text-xs italic text-neutral-400 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/60">
                    "{barber.quote}"
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-2">
                <button
                  onClick={() => onSelectBarber(barber.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-[#d4ab53] hover:text-[#0d0f12] border border-neutral-700/60 hover:border-[#d4ab53] rounded-lg transition-all active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.masters.bookWithMaster}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
