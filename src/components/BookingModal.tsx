import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Check, Scissors, Wine, Download, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import { BRANCHES, SERVICES, BARBERS, TIME_SLOTS, BAR_COMPLIMENTS } from '../data/barbershopData';
import { BookingState } from '../types/barbershop';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedBarberId?: string;
  preselectedBranchId?: 'erkindik' | 'tokombaeva';
  language: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBarberId,
  preselectedBranchId,
  language,
}) => {
  const [step, setStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingState>({
    branchId: preselectedBranchId || 'erkindik',
    serviceId: preselectedServiceId || SERVICES[0].id,
    barberId: preselectedBarberId || BARBERS[0].id,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '14:00',
    clientName: '',
    clientPhone: '+996 ',
    drinkPreference: 'whiskey',
    comment: '',
  });

  const [bookingConfirmation, setBookingConfirmation] = useState<{
    id: string;
    createdAt: string;
  } | null>(null);

  const t = TRANSLATIONS[language];

  // Sync props when opening with preselected values
  useEffect(() => {
    if (preselectedServiceId) {
      setBookingData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
    if (preselectedBarberId) {
      setBookingData((prev) => ({ ...prev, barberId: preselectedBarberId }));
    }
    if (preselectedBranchId) {
      setBookingData((prev) => ({ ...prev, branchId: preselectedBranchId }));
    }
  }, [preselectedServiceId, preselectedBarberId, preselectedBranchId]);

  if (!isOpen) return null;

  const currentBranch = BRANCHES.find((b) => b.id === bookingData.branchId) || BRANCHES[0];
  const currentService = SERVICES.find((s) => s.id === bookingData.serviceId) || SERVICES[0];
  const currentBarber = BARBERS.find((b) => b.id === bookingData.barberId) || BARBERS[0];
  const currentDrink = BAR_COMPLIMENTS.find((d) => d.id === bookingData.drinkPreference) || BAR_COMPLIMENTS[0];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+996')) {
      val = '+996 ';
    }
    setBookingData((prev) => ({ ...prev, clientPhone: val }));
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.clientName.trim() || bookingData.clientPhone.trim().length < 10) {
      return;
    }
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingConfirmation({
      id: orderNumber,
      createdAt: new Date().toLocaleDateString('ru-RU'),
    });
    setStep(6);
  };

  const handleDownloadIcs = () => {
    const title = `ORDEN Barbershop: ${currentService.title}`;
    const desc = `Booking with ${currentBarber.name}. Address: ${currentBranch.address}. Tel: ${currentBranch.phone}`;
    const [year, month, day] = bookingData.date.split('-');
    const [hours, mins] = bookingData.timeSlot.split(':');
    const startStr = `${year}${month}${day}T${hours}${mins}00`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ORDEN Barbershop Bishkek//EN\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${desc}\nLOCATION:${currentBranch.address}\nDTSTART:${startStr}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `orden-booking-${bookingConfirmation?.id || 'visit'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Booking #${bookingConfirmation?.id} - ORDEN Barbershop Bishkek\n` +
      `Branch: ${currentBranch.name}\n` +
      `Service: ${currentService.title}\n` +
      `Master: ${currentBarber.name}\n` +
      `Date & Time: ${bookingData.date} @ ${bookingData.timeSlot}\n` +
      `Guest: ${bookingData.clientName} (${bookingData.clientPhone})\n` +
      `Welcome Drink: ${currentDrink.name}`
    );
    window.open(`https://wa.me/996555148822?text=${text}`, '_blank');
  };

  const resetAll = () => {
    setStep(1);
    setBookingConfirmation(null);
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(today.getDate() + 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#14171d] border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0d0f12] shrink-0">
          <div>
            <div className="text-xs font-semibold text-[#d4ab53] uppercase tracking-wider">
              {t.bookingModal.tagline}
            </div>
            <div className="font-['Cinzel'] font-bold text-lg text-neutral-100">
              {step === 6 ? t.bookingModal.confirmedTitle : t.bookingModal.title}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step < 6 ? (
            <div className="space-y-6">
              {/* Stepper Dots */}
              <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-200">{t.bookingModal.stepIndicator} {step} / 5:</span>
                  <span className="text-[#d4ab53]">
                    {step === 1 && t.bookingModal.step1}
                    {step === 2 && t.bookingModal.step2}
                    {step === 3 && t.bookingModal.step3}
                    {step === 4 && t.bookingModal.step4}
                    {step === 5 && t.bookingModal.step5}
                  </span>
                </div>
                <span className="font-mono text-neutral-500">{step * 20}%</span>
              </div>

              {/* Step 1: Branch Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                    {t.bookingModal.branchHeader}
                  </h3>
                  <div className="space-y-3">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBookingData({ ...bookingData, branchId: b.id })}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          bookingData.branchId === b.id
                            ? 'bg-neutral-800/90 border-[#d4ab53] text-neutral-100 ring-1 ring-[#d4ab53]'
                            : 'bg-[#0d0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-neutral-100 font-['Cinzel'] text-base mb-1">
                            {b.name}
                          </div>
                          <div className="text-xs text-neutral-300 flex items-center gap-1.5 mb-1">
                            <MapPin className="w-3.5 h-3.5 text-[#d4ab53] shrink-0" />
                            <span>{b.address}</span>
                          </div>
                          <div className="text-xs text-neutral-400 font-light">
                            {b.landmark} · {b.parking}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                            bookingData.branchId === b.id
                              ? 'border-[#d4ab53] bg-[#d4ab53] text-[#0d0f12]'
                              : 'border-neutral-700 bg-neutral-900'
                          }`}
                        >
                          {bookingData.branchId === b.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                    {t.bookingModal.servicesHeader}
                  </h3>
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setBookingData({ ...bookingData, serviceId: s.id })}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          bookingData.serviceId === s.id
                            ? 'bg-neutral-800/90 border-[#d4ab53] text-neutral-100 ring-1 ring-[#d4ab53]'
                            : 'bg-[#0d0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs text-[#d4ab53] font-medium">{s.categoryLabel}</span>
                            <span className="text-xs text-neutral-500">·</span>
                            <span className="text-xs text-neutral-400">{s.durationMin} {t.services.duration}</span>
                          </div>
                          <div className="text-sm font-bold text-neutral-100">{s.title}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold text-neutral-100 tabular-nums">
                            {s.price.toLocaleString('ru-RU')} {t.services.currency}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Barber Selection */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                    {t.bookingModal.barbersHeader}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BARBERS.map((barber) => (
                      <button
                        key={barber.id}
                        type="button"
                        onClick={() => setBookingData({ ...bookingData, barberId: barber.id })}
                        className={`text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 ${
                          bookingData.barberId === barber.id
                            ? 'bg-neutral-800/90 border-[#d4ab53] text-neutral-100 ring-1 ring-[#d4ab53]'
                            : 'bg-[#0d0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <img
                          src={barber.avatar}
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover border border-neutral-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] text-[#d4ab53] font-semibold uppercase truncate">
                            {barber.rank}
                          </div>
                          <div className="font-bold text-sm text-neutral-100 truncate font-['Cinzel']">
                            {barber.name}
                          </div>
                          <div className="text-xs text-neutral-400 truncate">
                            ★ {barber.rating} · {barber.experienceYears} {t.masters.yearsExp}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Date & Time Slot Selection */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                      {t.bookingModal.dateHeader}
                    </h3>
                    <div className="grid grid-cols-3 gap-2.5 mb-3">
                      {[
                        { label: t.bookingModal.today, date: today.toISOString().split('T')[0] },
                        { label: t.bookingModal.tomorrow, date: tomorrow.toISOString().split('T')[0] },
                        { label: t.bookingModal.dayAfter, date: dayAfter.toISOString().split('T')[0] },
                      ].map((item) => (
                        <button
                          key={item.date}
                          type="button"
                          onClick={() => setBookingData({ ...bookingData, date: item.date })}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                            bookingData.date === item.date
                              ? 'bg-neutral-800 border-[#d4ab53] text-[#d4ab53]'
                              : 'bg-[#0d0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <input
                      type="date"
                      value={bookingData.date}
                      min={today.toISOString().split('T')[0]}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2 px-3 text-sm text-neutral-200 focus:outline-none focus:border-[#d4ab53]"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
                      {t.bookingModal.timeHeader}
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookingData({ ...bookingData, timeSlot: slot })}
                          className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                            bookingData.timeSlot === slot
                              ? 'bg-[#d4ab53] text-[#0d0f12] border-[#d4ab53] font-bold shadow-sm'
                              : 'bg-[#0d0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {step === 5 && (
                <form onSubmit={handleCompleteBooking} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      {t.bookingModal.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.bookingModal.namePlaceholder}
                      value={bookingData.clientName}
                      onChange={(e) => setBookingData({ ...bookingData, clientName: e.target.value })}
                      className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm text-neutral-100 focus:outline-none focus:border-[#d4ab53]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      {t.bookingModal.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingData.clientPhone}
                      onChange={handlePhoneChange}
                      placeholder="+996 555 12-34-56"
                      className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm text-neutral-100 font-mono focus:outline-none focus:border-[#d4ab53]"
                    />
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      {t.bookingModal.phoneHelp}
                    </span>
                  </div>

                  {/* Complimentary Drink */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Wine className="w-3.5 h-3.5 text-[#d4ab53]" />
                      <span>{t.bookingModal.drinkLabel}</span>
                    </label>
                    <select
                      value={bookingData.drinkPreference}
                      onChange={(e) => setBookingData({ ...bookingData, drinkPreference: e.target.value })}
                      className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm text-neutral-100 focus:outline-none focus:border-[#d4ab53]"
                    >
                      {BAR_COMPLIMENTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="bg-[#0d0f12] p-4 rounded-xl border border-neutral-800 text-xs space-y-1.5 text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t.bookingModal.summaryBranch}</span>
                      <span className="font-semibold text-neutral-100">{currentBranch.shortName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t.bookingModal.summaryService}</span>
                      <span className="font-semibold text-neutral-100">{currentService.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t.bookingModal.summaryMaster}</span>
                      <span className="font-semibold text-neutral-100">{currentBarber.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t.bookingModal.summaryTime}</span>
                      <span className="font-semibold text-neutral-100">{bookingData.date} @ {bookingData.timeSlot}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-neutral-800 text-sm">
                      <span className="font-bold text-neutral-100">{t.bookingModal.summaryTotal}</span>
                      <span className="font-bold text-[#d4ab53] tabular-nums">
                        {currentService.price.toLocaleString('ru-RU')} {t.services.currency}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#d4ab53] hover:bg-[#c69431] text-[#0d0f12] font-bold text-sm rounded-lg transition-colors shadow-md shadow-[#d4ab53]/20 active:scale-95"
                  >
                    {t.bookingModal.submitBooking}
                  </button>
                </form>
              )}

              {/* Navigation buttons */}
              {step < 5 && (
                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                    className={`text-xs font-semibold py-2 px-4 rounded-lg transition-colors ${
                      step === 1 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {t.bookingModal.back}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-1.5 py-2.5 px-6 text-xs font-semibold text-[#0d0f12] bg-[#d4ab53] hover:bg-[#c69431] rounded-lg transition-all active:scale-95 shadow-sm"
                  >
                    <span>{t.bookingModal.next}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center pb-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div className="text-xs font-semibold text-[#d4ab53] uppercase tracking-wider">
                  {t.bookingModal.confirmedTitle}
                </div>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-neutral-100 mt-1">
                  ORDEN Barbershop Bishkek
                </h3>
                <div className="text-xs font-mono text-neutral-400 mt-1">
                  {t.bookingModal.ticketNum} #{bookingConfirmation?.id}
                </div>
              </div>

              {/* Ticket Details */}
              <div className="bg-[#0d0f12] border border-neutral-800 rounded-xl p-5 space-y-3 text-xs">
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">{t.bookingModal.guest}</span>
                  <span className="font-bold text-neutral-100">{bookingData.clientName}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">{t.bookingModal.summaryBranch}</span>
                  <span className="font-bold text-neutral-100 text-right">{currentBranch.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">{t.bookingModal.address}</span>
                  <span className="font-bold text-neutral-100 text-right">{currentBranch.address}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">{t.bookingModal.summaryMaster}</span>
                  <span className="font-bold text-neutral-100">{currentBarber.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">{t.bookingModal.summaryService}</span>
                  <span className="font-bold text-neutral-100">{currentService.title}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400">{t.bookingModal.summaryTime}</span>
                  <span className="font-bold text-[#d4ab53] text-sm">
                    {bookingData.date} @ {bookingData.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm">
                  <span className="font-bold text-neutral-100">{t.bookingModal.summaryTotal}</span>
                  <span className="font-bold text-[#d4ab53] tabular-nums">
                    {currentService.price.toLocaleString('ru-RU')} {t.services.currency}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.bookingModal.whatsappSend}</span>
                </button>

                <button
                  onClick={handleDownloadIcs}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold text-xs rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-[#d4ab53]" />
                  <span>{t.bookingModal.calendarSave}</span>
                </button>

                <button
                  onClick={() => {
                    resetAll();
                    onClose();
                  }}
                  className="w-full py-2.5 text-center text-xs text-neutral-400 hover:text-neutral-200"
                >
                  {t.bookingModal.closeBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
