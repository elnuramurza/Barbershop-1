import express from 'react';
import expressApp from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = expressApp();
const PORT = process.env.PORT || 3000;

app.use(expressApp.json());

// API route to get public config such as Maps key if provisioned
app.get('/api/config', (_req, res) => {
  const mapsApiKey =
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  res.json({ mapsApiKey });
});

// AI Chatbot endpoint for ORDEN Barbershop Concierge
app.post('/api/chat', async (req, res) => {
  const { message, history = [], language = 'ru' } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const systemInstruction = `Вы — премиальный ИИ-Консьерж барбершопа «ORDEN Barbershop Bishkek» (Орден Барбершоп в Бишкеке).
Ваш тон: благородный, вежливый, экспертный, джентльменский, лаконичный.
Вы свободно общаетесь на языке пользователя: русском, кыргызском (кыргызча), английском (English) или китайском (中文).

Информация о клубе ORDEN:
- Концепция: закрытый мужской клуб, классическая стрижка ножницами и машинкой, королевское бритье опасной бритвой, комплиментарный бар.
- Филиалы в Бишкеке:
  1. «Центр»: бул. Эркиндик, 35 (пер. ул. Токтогула, возле Дубового парка). Охраняемая парковка со шлагбаумом.
  2. «Юг»: ул. Аалы Токомбаева, 21/1 (ЖК «Империал», напротив парка Асанбай, Южные ворота). Просторный паркинг.
- Время работы: ежедневно с 10:00 до 22:00.
- Мастера:
  * Азамат Ибраимов (Шеф-барбер, 11 лет стажа, академическая классика, ножницы, борода)
  * Тимур Султанов (Топ-барбер, 8 лет стажа, мастер Fade, геометрия)
  * Бекжан Кадыров (Бренд-барбер, 7 лет стажа, эксперт королевского бритья опасной бритвой и спа-ухода)
  * Руслан Дамиров (Сеньор-барбер, 6 лет стажа, текстурированные стрижки, классика)
- Цены (в сомах, KGS):
  * Стрижка «ORDEN Signature»: 1 800 сом (мытье, компресс, массаж, стайлинг, напиток)
  * Стрижка ножницами: 2 000 сом
  * Моделирование Fade: 1 600 сом
  * Комплекс «Отец + Сын»: 3 200 сом
  * Моделирование бороды: 1 200 сом
  * Королевское бритье: 1 600 сом
  * Комплекс «ORDEN Gentleman» (Стрижка + Борода): 2 700 сом
  * Комплекс «Президентский уход» (Стрижка + Бритье + Черная маска + Патчи): 3 900 сом
- Бар (бесплатно для каждого гостя): шотландский виски 12 лет, свежеобжаренная specialty арабика, горный чай с травами Иссык-Куля, крафтовый лимонад.
- Отвечайте доброжелательно и помогайте выбрать услугу, мастера или определиться со стилем стрижки по форме лица. Всегда предлагайте записаться онлайн.`;

  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const contents = [
        ...history.map((h: { role: string; text: string }) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Буду рад проконсультировать вас по услугам барбершопа ORDEN.';
      res.json({ reply: replyText });
      return;
    } catch (err: unknown) {
      console.warn('Gemini API call failed, using intelligent fallback:', err);
    }
  }

  // Domain-specific smart fallback if GEMINI_API_KEY is not set or network fails
  const lower = message.toLowerCase();
  let fallbackReply = '';

  if (language === 'kg') {
    if (lower.includes('баа') || lower.includes('канча') || lower.includes('кызмат')) {
      fallbackReply = 'ORDEN Barbershop кызматтарынын баалары:\n• Фирмалык чач кыркуу: 1 800 сом\n• Сакалды жасалгалоо: 1 200 сом\n• Падышалык кырынуу: 1 600 сом\n• «ORDEN Gentleman» топтому (Чач + Сакал): 2 700 сом\n• «Ата + Уул»: 3 200 сом.\nБардык кызматтарга бардан акысыз суусундук (виски же кофе) кирет!';
    } else if (lower.includes('дарек') || lower.includes('филиал') || lower.includes('кайда')) {
      fallbackReply = 'Биздин Бишкекте эки филиалыбыз бар:\n1. «Борбор»: Эркиндик бульвары, 35 (Токтогул көчөсү менен кесилишет). Шлагбаумдуу жеке конок парковкасы бар.\n2. «Түштүк»: Аалы Токомбаев көчөсү, 21/1 (ЖК «Империал», Асанбай паркынын маңдайында).\nИштөө убактысы: Күн сайын 10:00дөн 22:00гө чейин.';
    } else if (lower.includes('устат') || lower.includes('мастер') || lower.includes('ким')) {
      fallbackReply = 'Биздин башкы устаттар: Азамат Ибраимов (Шеф-барбер, 11 жыл стаж), Тимур Султанов (Фейд чебери), Бекжан Кадыров (Падышалык кырынуу боюнча эксперт). Кайсы убакытка жазылууну каалайсыз?';
    } else {
      fallbackReply = 'Саламатсызбы! Мен ORDEN Barbershop клубунун онлайн-жардамчысымын. Сизге чач же сакал стилин тандоого, баалар боюнча маалымат берүүгө жана Бишкектеги филиалдарыбызга жазылууга жардам бере алам.';
    }
  } else if (language === 'en') {
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
      fallbackReply = 'Here are our popular services:\n• Signature Haircut: 1,800 KGS\n• Beard Sculpting: 1,200 KGS\n• Royal Straight Razor Shave: 1,600 KGS\n• ORDEN Gentleman Package (Hair + Beard): 2,700 KGS\n• Father + Son: 3,200 KGS.\nEvery visit includes a complimentary drink from our bar (12yo whiskey, specialty espresso, or mountain tea).';
    } else if (lower.includes('location') || lower.includes('address') || lower.includes('where')) {
      fallbackReply = 'We have two prime locations in Bishkek:\n1. Downtown: 35 Erkindik Blvd (cross of Toktogul St). Private gated parking available.\n2. South: 21/1 Aaly Tokombaev St (Imperial Residence, opposite Asanbay Park).\nOpen daily 10:00 AM – 10:00 PM.';
    } else if (lower.includes('barber') || lower.includes('master')) {
      fallbackReply = 'Our craftsmen include: Azamat Ibraimov (Chief Barber, 11 yrs exp), Timur Sultanov (Fade & Geometry), Bekzhan Kadyrov (Royal Shave & Spa Specialist), Ruslan Damirov (Classic Scissor Cuts). Would you like to book an appointment?';
    } else {
      fallbackReply = 'Welcome to ORDEN Barbershop Bishkek! I am your AI Concierge. I can help you select a haircut tailored to your facial structure, recommend a master barber, or assist with booking.';
    }
  } else if (language === 'zh') {
    if (lower.includes('价格') || lower.includes('多少钱') || lower.includes('费用')) {
      fallbackReply = 'ORDEN 经典项目价目表：\n• 招牌男士发型设计：1,800 索姆\n• 精致胡须造型设计：1,200 索姆\n• 皇家热敷传统剃须：1,600 索姆\n• ORDEN 绅士套餐（发型+修须）：2,700 索姆\n• 父子同行双人套餐：3,200 索姆。\n所有项目均免费尊享吧台特调单品咖啡或12年苏格兰威士忌。';
    } else if (lower.includes('地址') || lower.includes('在哪里') || lower.includes('位置') || lower.includes('分店')) {
      fallbackReply = '我们在比什凯克设有两家尊享旗舰店：\n1. 市中心店：埃尔金迪克大道 35 号（托克托古拉街路口，靠近橡树公园），配有抬杆专属车位。\n2. 南部旗舰店：阿桑拜区托科姆巴耶夫街 21/1 号（帝国公馆，阿桑拜公园对面）。\n营业时间：每日 10:00 - 22:00 全年无休。';
    } else {
      fallbackReply = '您好！我是比什凯克 ORDEN 高端男士理发俱乐部的智能顾问。很高兴为您推荐适合您脸型的发型，介绍首席大师团队或协助您在线预约到店。';
    }
  } else {
    // Russian
    if (lower.includes('цен') || lower.includes('стоим') || lower.includes('прайс') || lower.includes('сколько')) {
      fallbackReply = 'Основные услуги ORDEN Barbershop:\n• Мужская стрижка «ORDEN Signature»: 1 800 сом\n• Моделирование бороды с горячим полотенцем: 1 200 сом\n• Королевское бритье опасной бритвой: 1 600 сом\n• Комплекс «ORDEN Gentleman» (Стрижка + Борода): 2 700 сом\n• Комплекс «Президентский уход» (с черной маской): 3 900 сом\n• Отец + Сын: 3 200 сом.\nВ каждый визит входит напиток из бара (12-летний виски или specialty-кофе) и массаж!';
    } else if (lower.includes('адрес') || lower.includes('где') || lower.includes('филиал') || lower.includes('парковк')) {
      fallbackReply = 'У нас два филиала в Бишкеке:\n1. «Центр»: бул. Эркиндик, 35 (пер. ул. Токтогула). Есть собственная закрытая гостевая парковка со шлагбаумом.\n2. «Юг»: ул. Аалы Токомбаева, 21/1 (ЖК «Империал», напротив парка Асанбай). Просторная парковка перед входом.\nОба филиала работают ежедневно с 10:00 до 22:00.';
    } else if (lower.includes('мастер') || lower.includes('барбер') || lower.includes('азамат') || lower.includes('тимур')) {
      fallbackReply = 'Наши топ-мастера:\n• Азамат Ибраимов — Шеф-барбер (11 лет опыта, академическая классика ножницами, скульптурирование бороды)\n• Тимур Султанов — Топ-барбер (8 лет опыта, виртуозные фейды и контуры)\n• Бекжан Кадыров — Бренд-барбер (7 лет опыта, мастер королевского бритья)\n• Руслан Дамиров — Сеньор-барбер (6 лет опыта, современные текстурные укладки).\nК кому вы хотите записаться?';
    } else if (lower.includes('запис') || lower.includes('бронь') || lower.includes('время')) {
      fallbackReply = 'Вы можете удобно записаться онлайн прямо на сайте! Нажмите кнопку «Записаться онлайн» в правом верхнем углу, выберите филиал (Эркиндик или Токомбаева), удобную дату и время. Администратор мгновенно зарезервирует кресло.';
    } else {
      fallbackReply = 'Приветствую! Я персональный ИИ-Консьерж клуба ORDEN Barbershop в Бишкеке. Чем могу помочь? Могу подобрать идеальную стрижку под форму вашего лица, рассказать об услугах и ценах, сориентировать по парковке или помочь забронировать визит к шеф-барберу.';
    }
  }

  res.json({ reply: fallbackReply });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(expressApp.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ORDEN Barbershop server running on http://localhost:${PORT}`);
  });
}

startServer();
