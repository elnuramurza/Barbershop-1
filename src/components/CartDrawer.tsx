import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, Truck, Store } from 'lucide-react';
import { Product } from '../types/barbershop';
import { Language } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  language: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
}) => {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+996 ');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' && subtotal < 3000 ? 200 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || customerPhone.length < 10) return;
    setOrderSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#14171d] border-l border-neutral-800 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-[#0d0f12]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#d4ab53]" />
            <h3 className="font-['Cinzel'] font-bold text-lg text-neutral-100">
              {t.cart.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-['Cinzel'] text-xl font-bold text-neutral-100">
                {t.cart.successTitle}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {deliveryType === 'pickup'
                  ? t.cart.successPickup
                  : `${t.cart.successDelivery} (${customerPhone})`}
              </p>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 bg-[#d4ab53] text-[#0d0f12] text-xs font-bold rounded-lg mt-4 active:scale-95"
              >
                {t.cart.backToSite}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
              <div className="text-neutral-300 font-semibold text-sm">{t.cart.emptyTitle}</div>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                {t.cart.emptyDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Item list */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 p-3 bg-[#0d0f12] border border-neutral-800 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-neutral-100 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-[#d4ab53] tabular-nums mt-0.5">
                        {item.product.price.toLocaleString('ru-RU')} {t.services.currency}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-neutral-100 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="ml-1 text-neutral-500 hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery mode */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  {t.cart.deliveryType}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-neutral-800 border-[#d4ab53] text-[#d4ab53]'
                        : 'bg-[#0d0f12] border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Store className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold">{t.cart.pickup}</div>
                      <div className="text-[10px] text-neutral-400">{t.cart.pickupDesc}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-neutral-800 border-[#d4ab53] text-[#d4ab53]'
                        : 'bg-[#0d0f12] border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Truck className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold">{t.cart.delivery}</div>
                      <div className="text-[10px] text-neutral-400">{t.cart.deliveryDesc}</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Client form */}
              <form onSubmit={handleSubmitOrder} className="space-y-3.5">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t.cart.name}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Erkin Sadykov"
                    className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-[#d4ab53]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t.cart.phone}</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+996 555 00-00-00"
                    className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-[#d4ab53]"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{t.cart.address}</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Street, Building, Apt"
                      className="w-full bg-[#0d0f12] border border-neutral-800 rounded-lg py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-[#d4ab53]"
                    />
                  </div>
                )}

                {/* Subtotals */}
                <div className="pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>{t.cart.subtotal}</span>
                    <span className="text-neutral-200 tabular-nums">
                      {subtotal.toLocaleString('ru-RU')} {t.services.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.cart.deliveryFee}</span>
                    <span className="text-neutral-200 tabular-nums">
                      {deliveryFee === 0 ? t.cart.freeDelivery : `${deliveryFee} ${t.services.currency}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm font-bold text-neutral-100">
                    <span>{t.cart.total}</span>
                    <span className="text-[#d4ab53] tabular-nums">
                      {total.toLocaleString('ru-RU')} {t.services.currency}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#d4ab53] hover:bg-[#c69431] text-[#0d0f12] font-bold text-xs rounded-lg transition-colors shadow-md active:scale-95"
                >
                  {t.cart.submitOrder}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
