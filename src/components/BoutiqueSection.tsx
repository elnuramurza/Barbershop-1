import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../data/barbershopData';
import { Product } from '../types/barbershop';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

interface BoutiqueSectionProps {
  onAddToCart: (product: Product) => void;
  language: Language;
}

export const BoutiqueSection: React.FC<BoutiqueSectionProps> = ({ onAddToCart, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="boutique" className="py-20 sm:py-28 bg-[#14171d] border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#d4ab53] mb-2">
              {t.boutique.sectionNum}
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-neutral-100 text-balance">
              {t.boutique.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            {t.boutique.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product: Product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between bg-[#0d0f12] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#d4ab53]/50 transition-all duration-200 group"
            >
              <div>
                {/* Product Image Slot */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-neutral-900/80 backdrop-blur-md rounded text-[11px] font-mono text-neutral-300 border border-neutral-700/60">
                    {product.volume}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-neutral-100 font-['Cinzel'] group-hover:text-[#d4ab53] transition-colors mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4 font-light">
                    {product.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#d4ab53] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="p-5 pt-0 border-t border-neutral-800/80 mt-2 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.boutique.priceLabel}</div>
                  <div className="text-lg font-bold text-neutral-100 tabular-nums">
                    {product.price.toLocaleString('ru-RU')} <span className="text-xs font-normal text-[#d4ab53]">сом</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0d0f12] bg-[#d4ab53] hover:bg-[#c69431] rounded-lg transition-colors active:scale-95 whitespace-nowrap"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.boutique.addToCart}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
