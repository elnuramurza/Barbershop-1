import { Language } from './types';

export const TRANSLATIONS: Record<Language, {
  nav: {
    services: string;
    masters: string;
    lounge: string;
    boutique: string;
    locations: string;
    bookOnline: string;
    cart: string;
  };
  hero: {
    kicker: string;
    city: string;
    title: string;
    subtitle: string;
    bookCta: string;
    styleQuizCta: string;
    branchCenter: string;
    branchSouth: string;
    kpiExperience: string;
    kpiExperienceSub: string;
    kpiSterile: string;
    kpiSterileSub: string;
    kpiLounge: string;
    kpiLoungeSub: string;
    kpiRating: string;
    kpiRatingSub: string;
  };
  services: {
    sectionNum: string;
    title: string;
    subtitle: string;
    all: string;
    hair: string;
    beard: string;
    combos: string;
    spa: string;
    duration: string;
    popularBadge: string;
    includesHeader: string;
    priceHeader: string;
    selectBtn: string;
    currency: string;
  };
  masters: {
    sectionNum: string;
    title: string;
    subtitle: string;
    featureKicker: string;
    featureTitle: string;
    featureDesc: string;
    featureKpi1: string;
    featureKpi1Sub: string;
    featureKpi2: string;
    featureKpi2Sub: string;
    specialtyLabel: string;
    yearsExp: string;
    bookWithMaster: string;
  };
  lounge: {
    sectionNum: string;
    title: string;
    subtitle: string;
    imageCaption: string;
    barKicker: string;
    barTitle: string;
    barDesc: string;
    freeBadge: string;
  };
  boutique: {
    sectionNum: string;
    title: string;
    subtitle: string;
    addToCart: string;
    priceLabel: string;
  };
  reviews: {
    sectionNum: string;
    title: string;
    scoreLabel: string;
    verifiedVisit: string;
  };
  locations: {
    sectionNum: string;
    title: string;
    subtitle: string;
    centerTab: string;
    southTab: string;
    workingHours: string;
    workingHoursDesc: string;
    parking: string;
    directionsTip: string;
    bookThisBranch: string;
    open2Gis: string;
    openGoogleMaps: string;
    whatsAppBtn: string;
    mapInteractiveLabel: string;
    mapControlsNote: string;
  };
  faq: {
    kicker: string;
    title: string;
  };
  bookingModal: {
    tagline: string;
    title: string;
    confirmedTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    stepIndicator: string;
    branchHeader: string;
    servicesHeader: string;
    barbersHeader: string;
    dateHeader: string;
    timeHeader: string;
    today: string;
    tomorrow: string;
    dayAfter: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phoneHelp: string;
    drinkLabel: string;
    summaryBranch: string;
    summaryService: string;
    summaryMaster: string;
    summaryTime: string;
    summaryTotal: string;
    submitBooking: string;
    next: string;
    back: string;
    ticketNum: string;
    guest: string;
    address: string;
    whatsappSend: string;
    calendarSave: string;
    closeBtn: string;
  };
  quizModal: {
    tagline: string;
    title: string;
    resultTagline: string;
    resultTitle: string;
    progress: string;
    next: string;
    back: string;
    seeResult: string;
    recService: string;
    recBarber: string;
    promoTitle: string;
    promoDesc: string;
    applyCta: string;
    restart: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    deliveryType: string;
    pickup: string;
    pickupDesc: string;
    delivery: string;
    deliveryDesc: string;
    name: string;
    phone: string;
    address: string;
    freeDelivery: string;
    subtotal: string;
    deliveryFee: string;
    total: string;
    submitOrder: string;
    successTitle: string;
    successPickup: string;
    successDelivery: string;
    backToSite: string;
  };
  footer: {
    about: string;
    payments: string;
    navTitle: string;
    rights: string;
    privacy: string;
    rules: string;
    backToTop: string;
  };
}> = {
  ru: {
    nav: {
      services: 'Услуги и Прайс',
      masters: 'Мастера',
      lounge: 'Клуб & Бар',
      boutique: 'Бутик',
      locations: 'Филиалы в Бишкеке',
      bookOnline: 'Записаться онлайн',
      cart: 'Корзина',
    },
    hero: {
      kicker: 'Премиальное мужское пространство',
      city: 'г. Бишкек',
      title: 'Искусство традиционной стрижки и закрытого клуба',
      subtitle: 'Безупречная геометрия мужской формы, королевское бритье опасной бритвой с горячими компрессами, сингл молт виски и спокойная клубная атмосфера в сердце столицы.',
      bookCta: 'Записаться на визит',
      styleQuizCta: 'Подобрать стиль онлайн',
      branchCenter: 'Филиал «Центр»: бул. Эркиндик, 35',
      branchSouth: 'Филиал «Юг»: ул. Аалы Токомбаева, 21/1',
      kpiExperience: '11+ Лет',
      kpiExperienceSub: 'Стаж шеф-мастеров клуба',
      kpiSterile: '3 Ступени',
      kpiSterileSub: 'Стерилизации инструментов',
      kpiLounge: 'Bar & Lounge',
      kpiLoungeSub: 'Single malt 12yo & арабика',
      kpiRating: '5.0',
      kpiRatingSub: 'Рейтинг в 2GIS и Google Maps',
    },
    services: {
      sectionNum: '01. Услуги и Прайс-лист',
      title: 'Мастерство стрижки и традиционного бритья',
      subtitle: 'В каждый визит включены: мытье головы премиальным шампунем, горячий компресс с эфирными маслами, укладка и напиток из нашего бара.',
      all: 'Все услуги',
      hair: 'Стрижки',
      beard: 'Борода и бритье',
      combos: 'Фирменные комплексы',
      spa: 'СПА & Уход',
      duration: 'мин',
      popularBadge: 'Выбор гостей',
      includesHeader: 'В стоимость входит:',
      priceHeader: 'Стоимость',
      selectBtn: 'Выбрать',
      currency: 'сом',
    },
    masters: {
      sectionNum: '02. Команда Мастеров',
      title: 'Шеф-барберы и виртуозы опасного лезвия',
      subtitle: 'Каждый мастер клуба обладает авторским почерком, непревзойденной моторикой и многолетним опытом работы с классическими формами.',
      featureKicker: 'Школа прецизионного среза',
      featureTitle: 'Анатомический анализ формы и текстуры',
      featureDesc: 'Мы не стрижем по шаблонным схемам. Перед первым взмахом ножниц шеф-барбер изучает направление роста волос, форму черепа, скул и особенности челюсти, создавая силуэт, держащий форму неделями.',
      featureKpi1: '100%',
      featureKpi1Sub: 'Стерильность инструмента',
      featureKpi2: '30–45',
      featureKpi2Sub: 'Дней стойкость силуэта',
      specialtyLabel: 'Специализация:',
      yearsExp: 'лет стажа',
      bookWithMaster: 'Записаться к мастеру',
    },
    lounge: {
      sectionNum: '03. Атмосфера Клуба & Бар',
      title: 'Пространство отдыха, а не просто стрижка',
      subtitle: 'Приходите за 20 минут до записи или останьтесь после. В нашей клубной зоне время замедляет ход под звуки джаза и винила.',
      imageCaption: 'Библиотека редких изданий об искусстве, шахматный стол из карельской березы и винтажный аудиокомплекс.',
      barKicker: 'Комплиментарный Клубный Бар',
      barTitle: 'Напитки включены в каждый визит',
      barDesc: 'Мы искренне верим в гостеприимство и европейскую культуру отдыха. Наш бариста и администратор предложат вам напиток бесплатно:',
      freeBadge: 'Бесплатно',
    },
    boutique: {
      sectionNum: '04. Бутик Мужской Косметики',
      title: 'Профессиональный уход дома',
      subtitle: 'Премиальные формулы на натуральных маслах арганы, кедра и жожоба. Средства, которые используют наши шеф-барберы во время стрижки.',
      addToCart: 'В корзину',
      priceLabel: 'Цена',
    },
    reviews: {
      sectionNum: '05. Репутация и Отзывы',
      title: 'Доверие джентльменов Бишкека',
      scoreLabel: 'На основе 650+ оценок 2GIS и Google Maps',
      verifiedVisit: 'Подтвержденный визит',
    },
    locations: {
      sectionNum: '06. Локации в Бишкеке',
      title: 'Два премиальных филиала столицы',
      subtitle: 'Интерактивная карта Google Maps, удобный подъезд и собственная охраняемая парковка для гостей со шлагбаумом.',
      centerTab: 'Центр (бул. Эркиндик)',
      southTab: 'Юг (Асанбай / Токомбаева)',
      workingHours: 'Режим работы',
      workingHoursDesc: 'Ежедневно с 10:00 до 22:00 без выходных',
      parking: 'Гостевой паркинг',
      directionsTip: 'Как быстрее добраться:',
      bookThisBranch: 'Записаться в этот филиал',
      open2Gis: 'Открыть в 2GIS',
      openGoogleMaps: 'Открыть в Google Maps',
      whatsAppBtn: 'Написать в WhatsApp',
      mapInteractiveLabel: 'Интерактивная карта Google Maps',
      mapControlsNote: 'Нажмите на маркер филиала, чтобы посмотреть детали и проложить маршрут.',
    },
    faq: {
      kicker: 'Вопросы и Ответы',
      title: 'Часто задаваемые вопросы',
    },
    bookingModal: {
      tagline: 'Онлайн-Запись · Бишкек',
      title: 'Бронирование Времени',
      confirmedTitle: 'Визит Подтвержден',
      step1: 'Выбор филиала',
      step2: 'Выбор услуги',
      step3: 'Выбор барбера',
      step4: 'Дата и время',
      step5: 'Контакты и бар',
      stepIndicator: 'Шаг',
      branchHeader: 'Выберите удобный филиал в Бишкеке:',
      servicesHeader: 'Выберите услугу из меню:',
      barbersHeader: 'Выберите барбера:',
      dateHeader: '1. Дата визита:',
      timeHeader: '2. Свободное время:',
      today: 'Сегодня',
      tomorrow: 'Завтра',
      dayAfter: 'Послезавтра',
      nameLabel: 'Ваше Имя и Фамилия:',
      namePlaceholder: 'Например, Эркин Садыков',
      phoneLabel: 'Номер телефона в Кыргызстане:',
      phoneHelp: 'На этот номер придет подтверждение и напоминание в WhatsApp',
      drinkLabel: 'Комплимент от барбера (бесплатно):',
      summaryBranch: 'Филиал:',
      summaryService: 'Услуга:',
      summaryMaster: 'Мастер:',
      summaryTime: 'Время:',
      summaryTotal: 'Итого к оплате:',
      submitBooking: 'Подтвердить бронирование визита',
      next: 'Далее',
      back: 'Назад',
      ticketNum: 'Электронный билет:',
      guest: 'Гость:',
      address: 'Адрес:',
      whatsappSend: 'Отправить детали бронирования в WhatsApp',
      calendarSave: 'Сохранить в Apple / Google Календарь (.ics)',
      closeBtn: 'Закрыть окно',
    },
    quizModal: {
      tagline: 'Онлайн-Консультация Барбера',
      title: 'Подбор Стиля',
      resultTagline: 'Индивидуальная Рекомендация',
      resultTitle: 'Архитектура стрижки под ваш типаж',
      progress: 'Вопрос',
      next: 'Далее',
      back: 'Назад',
      seeResult: 'Узнать результат',
      recService: 'Рекомендуемая услуга',
      recBarber: 'Идеальный мастер',
      promoTitle: 'Клубная привилегия: Промокод «ORDEN-FIRST»',
      promoDesc: 'Скидка 10% на ваш первый визит и комплимент от бара при записи онлайн!',
      applyCta: 'Записаться с этой рекомендацией',
      restart: 'Пройти заново',
    },
    cart: {
      title: 'Корзина Бутика',
      emptyTitle: 'Ваша корзина пуста',
      emptyDesc: 'Добавьте премиальное масло для бороды, матовую пасту или подарочный бокс в разделе «Бутик».',
      deliveryType: 'Способ получения:',
      pickup: 'Самовывоз',
      pickupDesc: 'При стрижке в филиале',
      delivery: 'Курьер по Бишкеку',
      deliveryDesc: 'Бесплатно от 3000 сом',
      name: 'Ваше имя:',
      phone: 'Телефон:',
      address: 'Адрес в Бишкеке:',
      freeDelivery: 'Бесплатно',
      subtotal: 'Товары:',
      deliveryFee: 'Доставка:',
      total: 'Итого к оплате:',
      submitOrder: 'Оформить заказ',
      successTitle: 'Заказ успешно оформлен!',
      successPickup: 'Косметика будет отложена и подготовлена к вашему визиту в филиале.',
      successDelivery: 'Курьер свяжется с вами для быстрой доставки по Бишкеку.',
      backToSite: 'Вернуться к сайту',
    },
    footer: {
      about: 'Премиальное мужское пространство и закрытый клуб в Бишкеке. Традиционная английская и итальянская классика стрижки, королевское бритье опасной бритвой и клубный бар.',
      payments: 'Способы оплаты: Visa · Mastercard · Элкарт · MBank · Наличные сом (KGS)',
      navTitle: 'Навигация',
      rights: 'ORDEN Barbershop Bishkek. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      rules: 'Клубный регламент',
      backToTop: 'Наверх',
    },
  },

  kg: {
    nav: {
      services: 'Кызматтар жана Баалар',
      masters: 'Устаттар',
      lounge: 'Клуб & Бар',
      boutique: 'Бутик',
      locations: 'Бишкектеги Филиалдар',
      bookOnline: 'Онлайн жазылуу',
      cart: 'Себет',
    },
    hero: {
      kicker: 'Эркектердин премиум мейкиндиги',
      city: 'Бишкек ш.',
      title: 'Салттуу чач кыркуу жана жабык клуб өнөрү',
      subtitle: 'Эркектердин сырткы келбетинин кемчиликсиз геометриясы, ысык компресс менен падышалык кырынуу, 12 жылдык виски жана борбордун чок ортосундагы бейпил клубдук маанай.',
      bookCta: 'Жазылуу',
      styleQuizCta: 'Стиль тандоо онлайн',
      branchCenter: '«Борбор» филиалы: Эркиндик бул., 35',
      branchSouth: '«Түштүк» филиалы: Аалы Токомбаев көч., 21/1',
      kpiExperience: '11+ Жыл',
      kpiExperienceSub: 'Башкы устаттардын тажрыйбасы',
      kpiSterile: '3 Баскыч',
      kpiSterileSub: 'Аспаптарды тазалоо жана дезинфекция',
      kpiLounge: 'Bar & Lounge',
      kpiLoungeSub: 'Single malt 12yo & арабика кофе',
      kpiRating: '5.0',
      kpiRatingSub: '2GIS жана Google Maps баалоосу',
    },
    services: {
      sectionNum: '01. Кызматтар жана Баалар',
      title: 'Чач кыркуу жана салттуу кырынуу чеберчилиги',
      subtitle: 'Ар бир кызматка: премиум шампунь менен баш жуу, эфир майлары менен ысык сүлгү компресси, жасалгалоо жана бардан суусундук кирет.',
      all: 'Бардык кызматтар',
      hair: 'Чач кыркуу',
      beard: 'Сакал жана кырынуу',
      combos: 'Фирмалык топтомдор',
      spa: 'СПА & Күтүм',
      duration: 'мүнөт',
      popularBadge: 'Коноктордун тандоосу',
      includesHeader: 'Баага эмне кирет:',
      priceHeader: 'Баасы',
      selectBtn: 'Тандоо',
      currency: 'сом',
    },
    masters: {
      sectionNum: '02. Устаттар Командасы',
      title: 'Шеф-барберлер жана курч устара чеберлери',
      subtitle: 'Клубдун ар бир устаты өзгөчө кол тамгага, кылдат тактыкка жана классикалык формаларды түзүү боюнча көп жылдык тажрыйбага ээ.',
      featureKicker: 'Так срез мектеби',
      featureTitle: 'Баш түзүлүшүн жана чачтын өсүшүн анатомиялык талдоо',
      featureDesc: 'Биз бир калыпта кыркпайбыз. Устат чачтын өсүү багытын, баш сөөгүнүн жана жаактын өзгөчөлүктөрүн изилдеп, формасын жумалап кармаган келбет жаратат.',
      featureKpi1: '100%',
      featureKpi1Sub: 'Аспаптардын тазалыгы',
      featureKpi2: '30–45',
      featureKpi2Sub: 'Күн бою форма сакталат',
      specialtyLabel: 'Адистиги:',
      yearsExp: 'жыл тажрыйба',
      bookWithMaster: 'Устатка жазылуу',
    },
    lounge: {
      sectionNum: '03. Клубдук Маанай & Бар',
      title: 'Жөн гана чач кыркуу эмес, эс алуу жайы',
      subtitle: 'Жазылган убактыңыздан 20 мүнөт эрте келиңиз же бүткөндөн кийин шашпай эс алыңыз. Джаз жана винилдин коштоосунда убакыт токтоп калат.',
      imageCaption: 'Искусство боюнча сейрек китептер, шахмат столу жана винтаждык аудиосистема.',
      barKicker: 'Клубдун Акысыз Бары',
      barTitle: 'Суусундуктар ар бир визитке кошулган',
      barDesc: 'Биз кыргыздын меймандостугуна жана европалык эс алуу маданиятына ишенебиз. Бариста сизге акысыз сунуштайт:',
      freeBadge: 'Акысыз',
    },
    boutique: {
      sectionNum: '04. Эркектердин Косметика Бутиги',
      title: 'Үйдөгү кесипкөй күтүм',
      subtitle: 'Аргана, кедр жана жожоба табигый майлары кошулган премиум формулалар. Биздин шеф-барберлер колдонгон каражаттар.',
      addToCart: 'Себетке салуу',
      priceLabel: 'Баасы',
    },
    reviews: {
      sectionNum: '05. Репутация жана Пикирлер',
      title: 'Бишкектин мырзаларынын ишеними',
      scoreLabel: '2GIS жана Google Maps боюнча 650+ баалоо',
      verifiedVisit: 'Тастыкталган визит',
    },
    locations: {
      sectionNum: '06. Бишкектеги Даректер',
      title: 'Борбор калаадагы эки премиум филиал',
      subtitle: 'Google Maps интерактивдүү картасы, ыңгайлуу кирүү жолу жана шлагбаумдуу жеке конок парковкасы.',
      centerTab: 'Борбор (Эркиндик бул.)',
      southTab: 'Түштүк (Асанбай / Токомбаев)',
      workingHours: 'Иштөө тартиби',
      workingHoursDesc: 'Күн сайын 10:00дөн 22:00гө чейин дем алышсыз',
      parking: 'Конок парковкасы',
      directionsTip: 'Кантип баруу ыңгайлуу:',
      bookThisBranch: 'Бул филиалга жазылуу',
      open2Gis: '2GIS менен ачуу',
      openGoogleMaps: 'Google Maps менен ачуу',
      whatsAppBtn: 'WhatsApp аркылуу жазуу',
      mapInteractiveLabel: 'Интерактивдүү Google Картасы',
      mapControlsNote: 'Маркерди басып, филиалдын чоо-жайын көрүңүз жана жол багытын түзүңүз.',
    },
    faq: {
      kicker: 'Суроолор жана Жооптор',
      title: 'Көп берилүүчү суроолор',
    },
    bookingModal: {
      tagline: 'Онлайн Жазылуу · Бишкек',
      title: 'Убакытты Ээлөө',
      confirmedTitle: 'Жазылуу Ырасталды',
      step1: 'Филиалды тандоо',
      step2: 'Кызматты тандоо',
      step3: 'Барберди тандоо',
      step4: 'Күн жана убакыт',
      step5: 'Байланыш жана бар',
      stepIndicator: 'Кадам',
      branchHeader: 'Бишкектеги ыңгайлуу филиалды тандаңыз:',
      servicesHeader: 'Кызматты тандаңыз:',
      barbersHeader: 'Устатты тандаңыз:',
      dateHeader: '1. Визит күнү:',
      timeHeader: '2. Ыңгайлуу убакыт:',
      today: 'Бүгүн',
      tomorrow: 'Эртең',
      dayAfter: 'Бүрсүгүнү',
      nameLabel: 'Сиздин Аты-жөнүңүз:',
      namePlaceholder: 'Мисалы, Эркин Садыков',
      phoneLabel: 'Кыргызстандагы телефон номериңиз:',
      phoneHelp: 'Бул номерге WhatsApp аркылуу тастыктоо келет',
      drinkLabel: 'Барберден акысыз суусундук:',
      summaryBranch: 'Филиал:',
      summaryService: 'Кызмат:',
      summaryMaster: 'Устат:',
      summaryTime: 'Убактысы:',
      summaryTotal: 'Жалпы сумма:',
      submitBooking: 'Жазылууну ырастоо',
      next: 'Кийинки',
      back: 'Артка',
      ticketNum: 'Электрондук билет:',
      guest: 'Конок:',
      address: 'Дареги:',
      whatsappSend: 'WhatsApp аркылуу жөнөтүү',
      calendarSave: 'Apple / Google Календарга сактоо (.ics)',
      closeBtn: 'Жабуу',
    },
    quizModal: {
      tagline: 'Барбердин Онлайн Кеңеши',
      title: 'Стиль Тандоо',
      resultTagline: 'Жеке Сунуш',
      resultTitle: 'Сиздин келбетиңизге туура келген чач жасалгасы',
      progress: 'Суроо',
      next: 'Кийинки',
      back: 'Артка',
      seeResult: 'Жыйынтыкты көрүү',
      recService: 'Сунушталган кызмат',
      recBarber: 'Ылайыктуу устат',
      promoTitle: 'Клубдук сыймык: Промокод «ORDEN-FIRST»',
      promoDesc: 'Биринчи визитиңизге 10% арзандатуу жана бардан комплимент!',
      applyCta: 'Ушул сунуш менен жазылуу',
      restart: 'Кайрадан баштоо',
    },
    cart: {
      title: 'Бутик Себети',
      emptyTitle: 'Себетиңиз бош',
      emptyDesc: 'Сакал майларын же белек кутучасын «Бутик» бөлүмүнөн кошуңуз.',
      deliveryType: 'Алуу жолу:',
      pickup: 'Өзү алып кетүү',
      pickupDesc: 'Филиалда чач кырктыруу учурунда',
      delivery: 'Бишкек боюнча чабарман',
      deliveryDesc: '3000 сомдон жогору акысыз',
      name: 'Атыңыз:',
      phone: 'Телефон:',
      address: 'Бишкектеги дарек:',
      freeDelivery: 'Акысыз',
      subtotal: 'Товарлар:',
      deliveryFee: 'Жеткирүү:',
      total: 'Жалпы төлөм:',
      submitOrder: 'Буйрутманы тариздөө',
      successTitle: 'Буйрутма кабыл алынды!',
      successPickup: 'Косметика сиздин келишиңизге чейин филиалда даярдалып турат.',
      successDelivery: 'Чабарман сиз менен байланышып, тез жеткирип берет.',
      backToSite: 'Сайтка кайтуу',
    },
    footer: {
      about: 'Бишкектеги премиум эркектер мейкиндиги жана жабык клуб. Англия жана Италия салтындагы чач кыркуу, падышалык кырынуу жана клубдук бар.',
      payments: 'Төлөм түрлөрү: Visa · Mastercard · Элкарт · MBank · Накталай сом (KGS)',
      navTitle: 'Навигация',
      rights: 'ORDEN Barbershop Bishkek. Бардык укуктар корголгон.',
      privacy: 'Купуялуулук саясаты',
      rules: 'Клуб эрежелери',
      backToTop: 'Жогоруга',
    },
  },

  en: {
    nav: {
      services: 'Services & Pricing',
      masters: 'Masters',
      lounge: 'Lounge & Bar',
      boutique: 'Boutique',
      locations: 'Bishkek Branches',
      bookOnline: 'Book Online',
      cart: 'Cart',
    },
    hero: {
      kicker: 'Premium Gentlemen’s Sanctuary',
      city: 'Bishkek City',
      title: 'The Art of Classic Grooming & Private Club',
      subtitle: 'Impeccable geometric silhouettes, hot-towel royal straight-razor shaving, 12yo single malt whiskey, and an unhurried gentleman’s club atmosphere in the capital.',
      bookCta: 'Book an Appointment',
      styleQuizCta: 'Style Quiz Online',
      branchCenter: 'Center Branch: 35 Erkindik Blvd',
      branchSouth: 'South Branch: 21/1 Aaly Tokombaev St',
      kpiExperience: '11+ Years',
      kpiExperienceSub: 'Average master barber tenure',
      kpiSterile: '3-Stage',
      kpiSterileSub: 'Medical-grade sterilization',
      kpiLounge: 'Bar & Lounge',
      kpiLoungeSub: 'Single malt 12yo & specialty arabica',
      kpiRating: '5.0',
      kpiRatingSub: 'Top rating on 2GIS and Google Maps',
    },
    services: {
      sectionNum: '01. Services & Price Menu',
      title: 'Mastery of Scissor Cuts & Traditional Shaving',
      subtitle: 'Every appointment includes: premium wash, hot towel aroma compress, neck & shoulder massage, custom styling, and a drink from our club bar.',
      all: 'All Services',
      hair: 'Haircuts',
      beard: 'Beard & Shave',
      combos: 'Signature Packages',
      spa: 'Spa & Facial',
      duration: 'min',
      popularBadge: 'Guest Favorite',
      includesHeader: 'Included in price:',
      priceHeader: 'Price',
      selectBtn: 'Select',
      currency: 'KGS',
    },
    masters: {
      sectionNum: '02. Master Barbers',
      title: 'Chief Craftsmen & Straight-Razor Virtuosos',
      subtitle: 'Each master possesses a distinctive signature touch, superior ergonomics, and years of experience with sophisticated classic and modern forms.',
      featureKicker: 'Precision Shears Craft',
      featureTitle: 'Anatomical Analysis of Form and Texture',
      featureDesc: 'We reject generic templates. Before the first shear cut, our master evaluates bone structure, jawline, and natural growth patterns to build a silhouette that stays sharp for weeks.',
      featureKpi1: '100%',
      featureKpi1Sub: 'Instrument sterility',
      featureKpi2: '30–45',
      featureKpi2Sub: 'Days silhouette retention',
      specialtyLabel: 'Specialty:',
      yearsExp: 'years experience',
      bookWithMaster: 'Book with Master',
    },
    lounge: {
      sectionNum: '03. Club Atmosphere & Bar',
      title: 'A True Sanctuary, Not Just a Haircut',
      subtitle: 'Arrive 20 minutes early or linger after your cut. In our private lounge, time slows down with smooth jazz and warm ambient lighting.',
      imageCaption: 'Rare art book library, Karelian birch chess table, and audiophile vinyl setup.',
      barKicker: 'Complimentary Bar',
      barTitle: 'Drinks Included with Every Appointment',
      barDesc: 'We take hospitality and refined relaxation seriously. Our bar attendant is pleased to serve you at no additional cost:',
      freeBadge: 'Complimentary',
    },
    boutique: {
      sectionNum: '04. Men’s Grooming Boutique',
      title: 'Professional Home Care',
      subtitle: 'Formulations crafted with natural argan, cedarwood, and jojoba oils. The very products used by our chief barbers in the chair.',
      addToCart: 'Add to Cart',
      priceLabel: 'Price',
    },
    reviews: {
      sectionNum: '05. Reputation & Proof',
      title: 'Trusted by Bishkek Gentlemen',
      scoreLabel: 'Based on 650+ verified reviews on 2GIS and Google Maps',
      verifiedVisit: 'Verified Visit',
    },
    locations: {
      sectionNum: '06. Bishkek Locations',
      title: 'Two Flagship Hubs in the Capital',
      subtitle: 'Interactive Google Maps navigation, easy access, and private guarded guest parking with barrier gate.',
      centerTab: 'Center (Erkindik Blvd)',
      southTab: 'South (Asanbay / Tokombaev)',
      workingHours: 'Opening Hours',
      workingHoursDesc: 'Daily from 10:00 to 22:00, no days off',
      parking: 'Guest Parking',
      directionsTip: 'Fastest route:',
      bookThisBranch: 'Book at this Branch',
      open2Gis: 'Open in 2GIS',
      openGoogleMaps: 'Open in Google Maps',
      whatsAppBtn: 'Chat on WhatsApp',
      mapInteractiveLabel: 'Interactive Google Maps',
      mapControlsNote: 'Click a branch pin to inspect location details and get live turn-by-turn directions.',
    },
    faq: {
      kicker: 'Q&A',
      title: 'Frequently Asked Questions',
    },
    bookingModal: {
      tagline: 'Online Booking · Bishkek',
      title: 'Reserve Your Slot',
      confirmedTitle: 'Visit Confirmed',
      step1: 'Select Branch',
      step2: 'Select Service',
      step3: 'Select Barber',
      step4: 'Date & Time',
      step5: 'Guest Info & Drink',
      stepIndicator: 'Step',
      branchHeader: 'Select your preferred Bishkek branch:',
      servicesHeader: 'Select service from menu:',
      barbersHeader: 'Select your barber:',
      dateHeader: '1. Appointment Date:',
      timeHeader: '2. Available Time Slots:',
      today: 'Today',
      tomorrow: 'Tomorrow',
      dayAfter: 'Day After',
      nameLabel: 'Your Full Name:',
      namePlaceholder: 'e.g. John Doe',
      phoneLabel: 'Phone Number (+996):',
      phoneHelp: 'We will send appointment reminder via WhatsApp',
      drinkLabel: 'Complimentary drink from the bar:',
      summaryBranch: 'Branch:',
      summaryService: 'Service:',
      summaryMaster: 'Master:',
      summaryTime: 'Time:',
      summaryTotal: 'Total Due:',
      submitBooking: 'Confirm Appointment',
      next: 'Next',
      back: 'Back',
      ticketNum: 'Digital Pass:',
      guest: 'Guest:',
      address: 'Address:',
      whatsappSend: 'Send Confirmation to WhatsApp',
      calendarSave: 'Save to Apple / Google Calendar (.ics)',
      closeBtn: 'Close Window',
    },
    quizModal: {
      tagline: 'Online Barber Consultation',
      title: 'Style Diagnosis',
      resultTagline: 'Bespoke Recommendation',
      resultTitle: 'Haircut Architecture for Your Profile',
      progress: 'Question',
      next: 'Next',
      back: 'Back',
      seeResult: 'View Diagnosis',
      recService: 'Recommended Service',
      recBarber: 'Ideal Barber',
      promoTitle: 'Club Privilege: Code «ORDEN-FIRST»',
      promoDesc: '10% privilege on your first visit plus welcome drink upon arrival!',
      applyCta: 'Book with this Recommendation',
      restart: 'Retake Quiz',
    },
    cart: {
      title: 'Boutique Bag',
      emptyTitle: 'Your bag is empty',
      emptyDesc: 'Explore our beard oils, styling clays, and walnut gift sets in the Boutique.',
      deliveryType: 'Fulfillment:',
      pickup: 'Branch Pickup',
      pickupDesc: 'During your appointment',
      delivery: 'Bishkek Courier',
      deliveryDesc: 'Complimentary over 3,000 KGS',
      name: 'Your Name:',
      phone: 'Phone Number:',
      address: 'Bishkek Delivery Address:',
      freeDelivery: 'Free',
      subtotal: 'Products:',
      deliveryFee: 'Delivery:',
      total: 'Total:',
      submitOrder: 'Place Order',
      successTitle: 'Order Placed Successfully!',
      successPickup: 'Your items will be packaged and awaiting your appointment.',
      successDelivery: 'Our courier will contact you for prompt delivery in Bishkek.',
      backToSite: 'Return to Site',
    },
    footer: {
      about: 'Premium gentlemen’s sanctuary and private club in Bishkek. British and Italian scissor traditions, royal straight-razor shave, and an exclusive lounge bar.',
      payments: 'Payment methods: Visa · Mastercard · Elkart · MBank · Cash KGS',
      navTitle: 'Navigation',
      rights: 'ORDEN Barbershop Bishkek. All rights reserved.',
      privacy: 'Privacy Policy',
      rules: 'Club Regulations',
      backToTop: 'Back to Top',
    },
  },

  zh: {
    nav: {
      services: '服务与价目',
      masters: '理发大师',
      lounge: '贵宾酒廊',
      boutique: '男士精品',
      locations: '比什凯克分店',
      bookOnline: '在线预约',
      cart: '购物袋',
    },
    hero: {
      kicker: '比什凯克高端男士俱乐部',
      city: '比什凯克市',
      title: '传统理发艺术与私密绅士空间',
      subtitle: '严谨考究的几何剪发线条、传统热敷剃刀皇家剃须、12年单一麦芽威士忌，以及首都中心优雅安静的俱乐部氛围。',
      bookCta: '立即在线预约',
      styleQuizCta: '在线发型测试',
      branchCenter: '市中心总店：埃尔金迪克大道 35 号',
      branchSouth: '南部阿桑拜店：托科姆巴耶夫街 21/1 号',
      kpiExperience: '11+ 年',
      kpiExperienceSub: '首席发型大师平均经验',
      kpiSterile: '三道工序',
      kpiSterileSub: '医疗级器械紫外线消毒',
      kpiLounge: 'Bar & Lounge',
      kpiLoungeSub: '12年苏格兰威士忌与现磨咖啡',
      kpiRating: '5.0',
      kpiRatingSub: '2GIS 及 Google Maps 满分评价',
    },
    services: {
      sectionNum: '01. 服务项目与价目表',
      title: '传统剪刀技艺与经典剃须',
      subtitle: '每次服务均包含：高级洗发精头皮清洁、精油热敷毛巾、肩颈舒压按摩、造型设计以及免费品尝吧台饮品。',
      all: '全部项目',
      hair: '男士理发',
      beard: '胡须造型与剃须',
      combos: '尊享套餐',
      spa: '面部SPA与护理',
      duration: '分钟',
      popularBadge: '宾客挚选',
      includesHeader: '服务包含：',
      priceHeader: '价格',
      selectBtn: '选择并预约',
      currency: '索姆',
    },
    masters: {
      sectionNum: '02. 首席理发师团队',
      title: '剪刀名匠与传统剃刀技师',
      subtitle: '每位师傅均拥有多年欧美与中亚大赛经验，精通头骨轮廓解构与经典男士短发造型。',
      featureKicker: '精密剪切学院派',
      featureTitle: '头骨骨骼与发质走向深度分析',
      featureDesc: '我们绝不采用流水线套模板。下刀前，首席发型师会详细分析您的头型、颧骨、下巴与发流，修剪出能保持数周不走样的经典轮廓。',
      featureKpi1: '100%',
      featureKpi1Sub: '器械严密无菌保障',
      featureKpi2: '30–45',
      featureKpi2Sub: '天发型轮廓自然持久',
      specialtyLabel: '擅长技法：',
      yearsExp: '年丰富经验',
      bookWithMaster: '预约此位发型师',
    },
    lounge: {
      sectionNum: '03. 俱乐部与吧台氛围',
      title: '不仅是理发，更是沉浸式休憩空间',
      subtitle: '欢迎提前20分钟到达或在理发后小憩。在黑胶唱片与爵士乐的悠扬旋律中，尽情享受属于绅士的慢调时光。',
      imageCaption: '珍稀艺术图书馆、桦木国际象棋桌与复古黑胶音响。',
      barKicker: '免费贵宾吧台',
      barTitle: '饮品包含于每次理发服务中',
      barDesc: '我们秉承中亚热情待客之道与欧洲沙龙传统，前台与咖啡师将为您免费提供：',
      freeBadge: '免费尊享',
    },
    boutique: {
      sectionNum: '04. 男士理容精品店',
      title: '居家专业男士养护',
      subtitle: '添加摩洛哥阿甘油、雪松精油与荷荷巴油的纯净配方，正是我们首席理发师工作台上的同款产品。',
      addToCart: '加入购物袋',
      priceLabel: '售价',
    },
    reviews: {
      sectionNum: '05. 口碑与评价',
      title: '比什凯克各界精英的信赖之选',
      scoreLabel: '源自 2GIS 和 Google Maps 超过 650 条真实评价',
      verifiedVisit: '实名到店验证',
    },
    locations: {
      sectionNum: '06. 比什凯克门店位置',
      title: '坐落于首都核心的两家旗舰店',
      subtitle: 'Google Maps 实时交互式地图导航，临街便捷车道，并配有抬杆式专属独立访客停车场。',
      centerTab: '市中心总店（埃尔金迪克大道）',
      southTab: '南部旗舰店（阿桑拜 / 托科姆巴耶夫街）',
      workingHours: '营业时间',
      workingHoursDesc: '每日 10:00 至 22:00 全年无休',
      parking: '专属车位',
      directionsTip: '最佳前往路线：',
      bookThisBranch: '预约此分店',
      open2Gis: '在 2GIS 中查看',
      openGoogleMaps: '在 Google Maps 中查看',
      whatsAppBtn: 'WhatsApp 在线咨询',
      mapInteractiveLabel: 'Google Maps 交互式高清地图',
      mapControlsNote: '点击地图上的金标图钉可查看分店详情并开启实时路线导航。',
    },
    faq: {
      kicker: '常见疑问',
      title: '客户问答',
    },
    bookingModal: {
      tagline: '在线预约 · 比什凯克',
      title: '预约到店时间',
      confirmedTitle: '预约已成功确认',
      step1: '选择分店',
      step2: '选择服务项目',
      step3: '选择理发师',
      step4: '日期与时间',
      step5: '联系方式与吧台饮品',
      stepIndicator: '第',
      branchHeader: '请选择方便前往的比什凯克分店：',
      servicesHeader: '请选择所需服务项目：',
      barbersHeader: '请选择理发师：',
      dateHeader: '1. 到店日期：',
      timeHeader: '2. 可选空余时段：',
      today: '今天',
      tomorrow: '明天',
      dayAfter: '后天',
      nameLabel: '您的姓名：',
      namePlaceholder: '例如：张先生 / Erkin Sadykov',
      phoneLabel: '吉尔吉斯斯坦电话号码：',
      phoneHelp: '我们将通过 WhatsApp 发送预约确认和到店提醒',
      drinkLabel: '理发师赠送特饮（免费）：',
      summaryBranch: '所选分店：',
      summaryService: '所选服务：',
      summaryMaster: '主理发师：',
      summaryTime: '到店时间：',
      summaryTotal: '应付金额：',
      submitBooking: '确认并提交预约',
      next: '下一步',
      back: '返回上一步',
      ticketNum: '电子预约单：',
      guest: '贵宾：',
      address: '地址：',
      whatsappSend: '将预约信息同步发送至 WhatsApp',
      calendarSave: '保存至 Apple / Google 日历 (.ics)',
      closeBtn: '关闭窗口',
    },
    quizModal: {
      tagline: '理发师在线发型诊断',
      title: '个人风格适配',
      resultTagline: '专属发型建议',
      resultTitle: '为您度身定制的发型结构方案',
      progress: '问题',
      next: '下一题',
      back: '上一题',
      seeResult: '生成诊断结果',
      recService: '推荐理发服务',
      recBarber: '最佳契合理发师',
      promoTitle: '新宾客专属礼遇：优惠码「ORDEN-FIRST」',
      promoDesc: '首次在线预约享 9 折礼遇，到店即送特调迎宾饮品！',
      applyCta: '以此方案一键预约',
      restart: '重新测试',
    },
    cart: {
      title: '精品购物袋',
      emptyTitle: '购物袋暂无商品',
      emptyDesc: '欢迎前往「男士精品」专区选购胡须精油、哑光发泥或胡桃木礼盒。',
      deliveryType: '取件方式：',
      pickup: '到店自提',
      pickupDesc: '在理发时顺便取件',
      delivery: '比什凯克同城专送',
      deliveryDesc: '满 3000 索姆免运费',
      name: '收件人姓名：',
      phone: '联系电话：',
      address: '比什凯克送货地址：',
      freeDelivery: '免费',
      subtotal: '商品合计：',
      deliveryFee: '运费：',
      total: '合计总额：',
      submitOrder: '提交订单',
      successTitle: '订单提交成功！',
      successPickup: '商品已为您打包预留，期待您的到店理发。',
      successDelivery: '专送人员将致电您确认派送时间。',
      backToSite: '返回主页',
    },
    footer: {
      about: '比什凯克高端男士俱乐部。秉持英伦与意大利纯正剪裁技艺、热敷传统剃刀皇家剃须与私密吧台沙龙。',
      payments: '支持支付方式：Visa · Mastercard · 埃尔卡特(Elkart) · MBank · 索姆现金(KGS)',
      navTitle: '页面导航',
      rights: 'ORDEN Barbershop Bishkek. 版权所有。',
      privacy: '隐私协议',
      rules: '俱乐部章程',
      backToTop: '回到顶部',
    },
  },
};
