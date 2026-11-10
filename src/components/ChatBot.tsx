import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Calendar, RefreshCw } from 'lucide-react';
import { Language } from '../i18n/types';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  canBook?: boolean;
}

interface ChatBotProps {
  language: Language;
  onOpenBooking: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ language, onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const initialGreeting =
    language === 'kg'
      ? 'Саламатсызбы! Мен ORDEN Barbershop клубунун ИИ-Консьержимин. Сизге чачтын же сакалдын стилин тандоого, баалар боюнча маалымат берүүгө жана Бишкектеги филиалдарыбызга жазылууга жардам бере алам. Кандай сурооңуз бар?'
      : language === 'en'
      ? 'Greetings! I am the AI Concierge of ORDEN Barbershop Bishkek. I can assist you with selecting the ideal haircut for your face shape, pricing details, or scheduling a visit with our master barbers. How may I assist you today?'
      : language === 'zh'
      ? '您好！我是比什凯克 ORDEN 高端男士理发俱乐部的 AI 专属顾问。我可以为您推荐契合脸型的发型、介绍大师团队及服务价目，并协助您预约到店。请问有什么可以帮您？'
      : 'Приветствую, джентльмен! Я персональный ИИ-Консьерж клуба ORDEN Barbershop в Бишкеке. Помогу подобрать форму стрижки по типу лица, сориентирую по ценам, парковке на Эркиндик и Токомбаева или помогу забронировать визит. Какой у вас вопрос?';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: initialGreeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts =
    language === 'kg'
      ? [
          'Чач жасалгасын кантип тандоо керек?',
          'Падышалык кырынуу баасы канча?',
          'Эркиндикте парковка барбы?',
          'Шеф-барберге жазылуу',
        ]
      : language === 'en'
      ? [
          'Best haircut for my face shape?',
          'How much is the Gentleman Combo?',
          'Parking near Erkindik branch?',
          'Book with Chief Barber',
        ]
      : language === 'zh'
      ? [
          '方脸适合什么男士发型？',
          '招牌发型与胡须套餐多少钱？',
          '市中心店有停车位吗？',
          '预约首席理发师',
        ]
      : [
          'Какую стрижку выбрать под форму лица?',
          'Сколько стоит комплекс «Стрижка + Борода»?',
          'Где удобнее припарковаться в центре?',
          'Записаться к шеф-барберу Азамату',
        ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error('Chat API returned error');
      }

      const data = await res.json();
      const botReply = data.reply || 'Буду рад помочь вам с выбором услуги или записи в ORDEN.';

      const isBookingRelated =
        text.toLowerCase().includes('запис') ||
        text.toLowerCase().includes('book') ||
        text.toLowerCase().includes('жазыл') ||
        text.toLowerCase().includes('预约');

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: 'assistant',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          canBook: isBookingRelated || true,
        },
      ]);
    } catch (err) {
      console.warn('Chat request failed, providing domain response:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: 'assistant',
          text:
            language === 'kg'
              ? 'Биздин администратор сиздин сурооңузга жооп берүүгө даяр. Телефон: +996 (555) 14-88-22 же сайтка онлайн жазылыңыз.'
              : language === 'en'
              ? 'Our concierge is ready to assist you. Call +996 (555) 14-88-22 or book your appointment online directly on our website.'
              : language === 'zh'
              ? '我们的前台随时为您服务。致电 +996 (555) 14-88-22 或直接在网站上在线预约。'
              : 'Буду рад проконсультировать вас лично! Наши филиалы работают ежедневно с 10:00 до 22:00. Вы можете записаться онлайн в 1 клик или позвонить администратору: +996 (555) 14-88-22.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          canBook: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#d4ab53] to-[#c69431] hover:from-[#dfc480] hover:to-[#d4ab53] text-[#0d0f12] font-bold text-xs sm:text-sm rounded-full shadow-2xl shadow-black/60 transition-all hover:scale-105 active:scale-95 group"
          aria-label="Открыть чат с ИИ-Консьержем"
        >
          <div className="relative">
            <Bot className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#d4ab53]" />
          </div>
          <span className="font-semibold tracking-wide">
            {language === 'kg'
              ? 'ИИ-Консьерж'
              : language === 'en'
              ? 'AI Concierge'
              : language === 'zh'
              ? 'AI 专属顾问'
              : 'AI Консьерж'}
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[550px] max-h-[85vh] bg-[#14171d] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-[#0d0f12] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d4ab53]/15 border border-[#d4ab53]/40 text-[#d4ab53] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-100 font-['Cinzel'] leading-tight">
                  ORDEN AI Concierge
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {language === 'kg'
                      ? 'Онлайн кеңешчи · Бишкек'
                      : language === 'en'
                      ? 'Online Assistant · Bishkek'
                      : language === 'zh'
                      ? '在线咨询 · 比什凯克'
                      : 'Онлайн-помощник · Бишкек'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                title="Очистить чат"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                title="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0e1116]/60">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#1b2028] border border-[#d4ab53]/30 text-[#d4ab53] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[82%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                        isUser
                          ? 'bg-[#d4ab53] text-[#0d0f12] font-medium rounded-tr-sm shadow-md'
                          : 'bg-[#181d24] text-neutral-200 border border-neutral-800 rounded-tl-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.text}</div>
                      <div
                        className={`text-[9px] mt-1 text-right ${
                          isUser ? 'text-[#0d0f12]/70 font-mono' : 'text-neutral-500 font-mono'
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>

                    {!isUser && m.canBook && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenBooking();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-[#d4ab53] text-neutral-300 hover:text-[#0d0f12] border border-neutral-700 hover:border-[#d4ab53] text-[11px] font-semibold rounded-lg transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {language === 'kg'
                            ? 'Онлайн жазылуу'
                            : language === 'en'
                            ? 'Book Appointment'
                            : language === 'zh'
                            ? '立即在线预约'
                            : 'Записаться онлайн'}
                        </span>
                      </button>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-neutral-400">
                <div className="w-7 h-7 rounded-full bg-[#1b2028] border border-[#d4ab53]/30 text-[#d4ab53] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#181d24] border border-neutral-800 px-3 py-2 rounded-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#d4ab53] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#d4ab53] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#d4ab53] rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 pt-2 pb-1 bg-[#0d0f12] border-t border-neutral-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-300 hover:text-[#d4ab53] border border-neutral-800 rounded-full whitespace-nowrap shrink-0 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0d0f12] border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'kg'
                  ? 'Сурооңузду жазыңыз...'
                  : language === 'en'
                  ? 'Ask anything about ORDEN...'
                  : language === 'zh'
                  ? '请输入您想了解的问题...'
                  : 'Задайте вопрос консьержу...'
              }
              className="flex-1 bg-[#14171d] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#d4ab53]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`p-2.5 rounded-xl transition-all ${
                input.trim() && !loading
                  ? 'bg-[#d4ab53] text-[#0d0f12] hover:bg-[#c69431] shadow-md'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
