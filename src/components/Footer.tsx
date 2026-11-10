import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Language, LANGUAGES } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onLanguageChange }) => {
  const t = TRANSLATIONS[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090b0d] border-t border-neutral-800/80 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-['Cinzel'] text-2xl font-bold tracking-widest text-neutral-100 block">
              ORDEN
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              {t.footer.about}
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              {t.footer.payments}
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-3 flex items-center gap-2">
              <span className="text-[11px] text-neutral-500">Язык:</span>
              <div className="flex items-center gap-1.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      language === lang.code
                        ? 'bg-neutral-800 text-[#d4ab53] font-bold border border-neutral-700'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang.shortLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              {t.footer.navTitle}
            </div>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-[#d4ab53] transition-colors">{t.nav.services}</a></li>
              <li><a href="#masters" className="hover:text-[#d4ab53] transition-colors">{t.nav.masters}</a></li>
              <li><a href="#lounge" className="hover:text-[#d4ab53] transition-colors">{t.nav.lounge}</a></li>
              <li><a href="#boutique" className="hover:text-[#d4ab53] transition-colors">{t.nav.boutique}</a></li>
              <li><a href="#locations" className="hover:text-[#d4ab53] transition-colors">{t.nav.locations}</a></li>
            </ul>
          </div>

          {/* Branch 1 */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#d4ab53]">
              {t.locations.centerTab}
            </div>
            <div className="text-neutral-300 font-medium">г. Бишкек, бул. Эркиндик, 35</div>
            <div className="text-neutral-500">Пересечение с ул. Токтогула (Дубовый парк)</div>
            <div className="text-neutral-400">10:00 – 22:00</div>
            <div className="pt-1">
              <a href="tel:+996555148822" className="text-neutral-200 hover:text-[#d4ab53] transition-colors">
                +996 (555) 14-88-22
              </a>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#d4ab53]">
              {t.locations.southTab}
            </div>
            <div className="text-neutral-300 font-medium">г. Бишкек, ул. Аалы Токомбаева, 21/1</div>
            <div className="text-neutral-500">ЖК «Империал» (напротив парка Асанбай)</div>
            <div className="text-neutral-400">10:00 – 22:00</div>
            <div className="pt-1">
              <a href="tel:+996700447799" className="text-neutral-200 hover:text-[#d4ab53] transition-colors">
                +996 (700) 44-77-99
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <span>{t.footer.privacy}</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.rules}</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-[#d4ab53] transition-colors"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
