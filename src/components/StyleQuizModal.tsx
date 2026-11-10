import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Scissors, Gift } from 'lucide-react';
import { QUIZ_QUESTIONS, BARBERS, SERVICES } from '../data/barbershopData';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (serviceId: string, barberId: string) => void;
  language: Language;
}

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendation,
  language,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCalculated(false);
  };

  const recommendedServiceId =
    answers[4] === 'clean'
      ? 'royal-shave'
      : answers[4] === 'full-beard'
      ? 'combo-signature'
      : answers[2] === 'thick-straight'
      ? 'haircut-fade'
      : 'haircut-premium';

  const recommendedBarberId =
    answers[4] === 'clean'
      ? 'bekzhan-kadyrov'
      : answers[3] === 'streetwear'
      ? 'timur-sultanov'
      : 'azamat-ibraimov';

  const recommendedService = SERVICES.find((s) => s.id === recommendedServiceId) || SERVICES[0];
  const recommendedBarber = BARBERS.find((b) => b.id === recommendedBarberId) || BARBERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#14171d] border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4ab53]" />
            <span className="font-['Cinzel'] font-bold text-lg text-neutral-100">
              {isCalculated ? t.quizModal.resultTitle : t.quizModal.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!isCalculated ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span>{t.quizModal.progress} {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d4ab53] to-[#c69431] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="font-['Cinzel'] text-xl font-bold text-neutral-100 mb-4">
                {currentQ.title}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-neutral-800/90 border-[#d4ab53] text-neutral-100 ring-1 ring-[#d4ab53]'
                          : 'bg-[#0d0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold mb-0.5">{opt.label}</div>
                        <div className="text-xs text-neutral-400 font-light">{opt.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-[#d4ab53] bg-[#d4ab53] text-[#0d0f12]'
                            : 'border-neutral-700 bg-neutral-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Stepper Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-lg transition-colors ${
                    currentStep === 0
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.quizModal.back}</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentQ.id]}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold py-2.5 px-6 rounded-lg transition-all ${
                    answers[currentQ.id]
                      ? 'bg-[#d4ab53] text-[#0d0f12] hover:bg-[#c69431] shadow-md shadow-[#d4ab53]/20'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? t.quizModal.seeResult : t.quizModal.next}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Result View */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center pb-4 border-b border-neutral-800">
                <div className="w-12 h-12 rounded-full bg-[#d4ab53]/15 text-[#d4ab53] flex items-center justify-center mx-auto mb-2 border border-[#d4ab53]/30">
                  <Scissors className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#d4ab53] uppercase tracking-wider">
                  {t.quizModal.resultTagline}
                </div>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-neutral-100 mt-1">
                  {t.quizModal.resultTitle}
                </h3>
              </div>

              {/* Recommended Service & Master */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0d0f12] p-4 rounded-xl border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-1">
                    {t.quizModal.recService}
                  </div>
                  <div className="font-bold text-neutral-100 text-sm mb-1">
                    {recommendedService.title}
                  </div>
                  <div className="text-xs text-[#d4ab53] font-semibold tabular-nums">
                    {recommendedService.price.toLocaleString('ru-RU')} {t.services.currency} · {recommendedService.durationMin} {t.services.duration}
                  </div>
                </div>

                <div className="bg-[#0d0f12] p-4 rounded-xl border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-1">
                    {t.quizModal.recBarber}
                  </div>
                  <div className="font-bold text-neutral-100 text-sm mb-1">
                    {recommendedBarber.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {recommendedBarber.rank} · {recommendedBarber.experienceYears} {t.masters.yearsExp}
                  </div>
                </div>
              </div>

              {/* Bonus Privilege Voucher */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#d4ab53]/15 to-transparent border border-[#d4ab53]/40 flex items-center gap-3.5">
                <Gift className="w-6 h-6 text-[#d4ab53] shrink-0" />
                <div className="text-xs text-neutral-200">
                  <span className="font-bold text-[#d4ab53] block text-sm">
                    {t.quizModal.promoTitle}
                  </span>
                  {t.quizModal.promoDesc}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onApplyRecommendation(recommendedService.id, recommendedBarber.id);
                    onClose();
                  }}
                  className="flex-1 py-3 px-5 text-sm font-semibold text-[#0d0f12] bg-[#d4ab53] hover:bg-[#c69431] rounded-lg transition-colors text-center active:scale-95"
                >
                  {t.quizModal.applyCta}
                </button>
                <button
                  onClick={resetQuiz}
                  className="py-3 px-4 text-xs font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors text-center"
                >
                  {t.quizModal.restart}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
