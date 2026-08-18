import {
  Service,
  PortfolioItem,
  PricingPlan,
  Review,
  FAQItem,
  Order,
  OrderStatusInfo,
  StudioSettings,
  ContactMessage,
  AdminUser
} from '../types';

export const ORDER_STATUS_MAP: Record<string, OrderStatusInfo> = {
  submitted: {
    key: 'submitted',
    label: 'ثبت شده',
    description: 'سفارش شما در سیستم ثبت شد و در صف بررسی تیم آرکا قرار دارد.',
    stepNumber: 1,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  under_review: {
    key: 'under_review',
    label: 'در حال بررسی',
    description: 'کارشناسان هنری آرکا در حال بررسی نیازمندی‌ها و اهداف پروژه شما هستند.',
    stepNumber: 2,
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  awaiting_info: {
    key: 'awaiting_info',
    label: 'در انتظار اطلاعات',
    description: 'برای ادامه طراحی نیاز به فایل‌ها یا اطلاعات تکمیلی از سمت شما داریم.',
    stepNumber: 3,
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  in_design: {
    key: 'in_design',
    label: 'در حال طراحی',
    description: 'طراح ارشد آرکا فرآیند خلق ایده‌ها و اجرای بصری پروژه را آغاز کرده است.',
    stepNumber: 4,
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  preview_sent: {
    key: 'preview_sent',
    label: 'پیش‌نمایش ارسال شد',
    description: 'اتود اولیه و پیش‌نمایش طرح برای بررسی و اعلام نظر برای شما ارسال شده است.',
    stepNumber: 5,
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  revision: {
    key: 'revision',
    label: 'در انتظار اصلاح',
    description: 'اصلاحات مد نظر شما دریافت شده و در حال اعمال تغییرات بر روی طرح هستیم.',
    stepNumber: 6,
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  awaiting_approval: {
    key: 'awaiting_approval',
    label: 'در انتظار تأیید',
    description: 'نسخه نهایی آماده شده و منتظر تأیید نهایی شما جهت آماده‌سازی خروجی‌ها هستیم.',
    stepNumber: 7,
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  completed: {
    key: 'completed',
    label: 'تکمیل شده',
    description: 'فایل‌های لایه‌باز و خروجی‌های باکیفیت به صورت کامل تحویل داده شدند.',
    stepNumber: 8,
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
  },
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    slug: 'logo-design',
    title: 'طراحی لوگو و نشانه',
    category: 'branding',
    shortDesc: 'خلق نماد و نشانه‌ای منحصربه‌فرد، ماندگار و متناسب با هویت برند شما',
    fullDesc: 'طراحی لوگو در استودیو آرکا صرفاً رسم یک شکل نیست؛ بلکه ترجمه بصری ارزش‌ها، ماموریت و شخصیت کسب‌وکار شما به زبانی مدرن و جاودان است. ما با اتودهای دستی و اجرای دقیق وکتور خروجی بی‌نقصی ارائه می‌دهیم.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    popular: true,
    priceRange: {
      min: 1000000,
      max: 15000000,
      formatted: '۱,۰۰۰,۰۰۰ تا ۱۵,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۳ تا ۷ روز کاری',
    deliverables: ['فایل وکتور لایه‌باز (AI, EPS)', 'خروجی باکیفیت (PNG, SVG, PDF)', 'موکاپ‌های سه‌بعدی لوکس', 'پالت رنگی سازمانی'],
    features: ['ارائه ۳ تا ۵ کانسپت متمایز', 'امکان اصلاحات تا رسیدن به نتیجه مطلوب', 'تحویل فایل‌های استاندارد چاپی و دیجیتال', 'ارائه دفترچه راهنمای رنگ و فونت'],
  },
  {
    id: 'srv-2',
    slug: 'banner-design',
    title: 'طراحی بنر تبلیغاتی و وبسایت',
    category: 'digital',
    shortDesc: 'طراحی بنرهای کلیکی، گیف و تبلیغاتی با نرخ تبدیل و جذابیت بصری بسیار بالا',
    fullDesc: 'بنرهای تبلیغاتی آرکا با ترکیب اصول روانشناسی رنگ، تایپوگرافی گیرا و چیدمان استاندارد طراحی می‌شوند تا بیشترین توجه مخاطب را به محصول یا پیشنهاد ویژه شما جلب کنند.',
    icon: 'Layout',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    popular: false,
    priceRange: {
      min: 700000,
      max: 2000000,
      formatted: '۷۰۰,۰۰۰ تا ۲,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۱ تا ۳ روز کاری',
    deliverables: ['فایل لایه‌باز PSD', 'سایزهای استاندارد وب (یکتانت، مدیااد، صباویژن)', 'خروجی بهینه کم‌حجم'],
    features: ['طراحی بر اساس اصول CTR بالا', 'ارائه در فرمت‌های JPG, PNG, GIF', 'سایزبندی‌های مختلف برای کمپین‌ها'],
  },
  {
    id: 'srv-3',
    slug: 'poster-design',
    title: 'طراحی پوستر رویداد و فرهنگی',
    category: 'print',
    shortDesc: 'پوسترهای هنری و تبلیغاتی تاثیرگذار برای رویدادها، همایش‌ها و تئاتر',
    fullDesc: 'پوستر زبان گویای هنر و انتقال پیام در یک نگاه است. در استودیو آرکا پوسترهایی طراحی می‌کنیم که در هیاهوی فضای شهری و دیجیتال نگاه‌ها را متوقف و پیام شما را ماندگار کنند.',
    icon: 'Image',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    popular: true,
    priceRange: {
      min: 700000,
      max: 2000000,
      formatted: '۷۰۰,۰۰۰ تا ۲,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۲ تا ۴ روز کاری',
    deliverables: ['فایل آماده چاپ با مود رنگی CMYK و رزولوشن 300DPI', 'نسخه دیجیتال RGB جهت انتشار در وب و شبکه‌های اجتماعی', 'فایل لایه‌باز'],
    features: ['ترکیب‌بندی مدرن و خلاقانه', 'تایپوگرافی اختصاصی و چشم‌نواز', 'رعایت خطوط برش و استانداردهای چاپخانه‌ای'],
  },
  {
    id: 'srv-4',
    slug: 'business-card',
    title: 'طراحی کارت ویزیت و ست اداری',
    category: 'print',
    shortDesc: 'کارت ویزیت‌های لاکچری، مینیمال و ماندگار با متریال‌های خاص چاپی',
    fullDesc: 'کارت ویزیت اولین نقطه تماس فیزیکی مشتری با برند شماست. کارت ویزیت‌های طراحی شده توسط آرکا حس اعتبار، اصالت و لوکس بودن را به دست مخاطب منتقل می‌نمایند.',
    icon: 'CreditCard',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    popular: false,
    priceRange: {
      min: 600000,
      max: 5000000,
      formatted: '۶۰۰,۰۰۰ تا ۵,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۲ تا ۳ روز کاری',
    deliverables: ['فایل چاپی دورو CMYK', 'شابلون طلاکوب و یووی موضعی (در صورت نیاز)', 'فایل لایه‌باز'],
    features: ['طراحی اختصاصی برای انواع چاپ (سلفون، لمینت، مخمل، PVC و طلاکوب)', 'مشاوره متریال چاپ', 'رعایت دقیق مارجین و لبه‌های امن برش'],
  },
  {
    id: 'srv-5',
    slug: 'instagram-post',
    title: 'طراحی پست اینستاگرام و سوشال مدیا',
    category: 'social',
    shortDesc: 'قالب‌های منظم، اسلایدی و تعاملی اینستاگرام برای افزایش فالوور و فروش',
    fullDesc: 'یک پیج اینستاگرام موفق به هویت بصری یکپارچه و اسلایدهای چشم‌گیر نیاز دارد. ما تمپلیت‌ها و پست‌های کاروسل جذابی خلق می‌کنیم که سیو و شر بالایی جذب کنند.',
    icon: 'Share2',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    popular: true,
    priceRange: {
      min: 200000,
      max: 800000,
      formatted: '۲۰۰,۰۰۰ تا ۸۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۱ تا ۲ روز کاری',
    deliverables: ['فایل PNG رزولوشن 1080x1350 یا 1080x1080', 'فایل قالب آماده فتوشاپ PSD', 'کاور پست'],
    features: ['طراحی اسلایدی به‌هم‌پیوسته', 'خوانایی عالی در ابعاد موبایل', 'رعایت هویت رنگی پیج'],
  },
  {
    id: 'srv-6',
    slug: 'instagram-story',
    title: 'طراحی استوری اینستاگرام',
    category: 'social',
    shortDesc: 'استوری‌های جذاب، انگیزشی و فروش‌محور با چیدمان تعاملی و مدرن',
    fullDesc: 'استوری سریع‌ترین کانال تبدیل مخاطب به خریدار است. استوری‌های آرکا با کادربندی اختصاصی و فراخوان به اقدام (CTA) واضح طراحی می‌شوند.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
    popular: false,
    priceRange: {
      min: 150000,
      max: 500000,
      formatted: '۱۵۰,۰۰۰ تا ۵۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۱ روز کاری',
    deliverables: ['خروجی 1080x1920 Full HD', 'نسخه با باکس تعاملی (Poll, Question)', 'فایل PSD'],
    features: ['تمرکز روی ترغیب به کلیک و پیام', 'ترکیب ویدیو و گرافیک', 'تحویل سریع'],
  },
  {
    id: 'srv-7',
    slug: 'thumbnail-cover',
    title: 'طراحی کاور و تامبنیل (Thumbnail)',
    category: 'digital',
    shortDesc: 'تامبنیل‌های کلیک‌خور و حرفه‌ای یوتیوب، آپارات، پادکست و دوره‌های آموزشی',
    fullDesc: 'تامبنیل اولین چیزی است که بیننده مشاهده می‌کند. کاورهای طراحی شده در آرکا با کنتراست رنگی دقیق، برش چهره حرفه‌ای و تایپوگرافی درشت باعث انفجار بازدید ویدیوهای شما می‌شوند.',
    icon: 'Film',
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=80',
    popular: true,
    priceRange: {
      min: 50000,
      max: 200000,
      formatted: '۵۰,۰۰۰ تا ۲۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۱۲ ساعت تا ۱ روز',
    deliverables: ['فایل 1920x1080 و 1280x720 کم حجم زیر 2MB', 'لایه‌باز فتوشاپ'],
    features: ['افزایش نرخ کلیک (CTR)', 'دوربری و اصلاح نور حرفه‌ای پرتره', 'استایل‌های ترند یوتیوب'],
  },
  {
    id: 'srv-8',
    slug: 'brand-identity',
    title: 'طراحی هویت بصری کامل (Brand Identity)',
    category: 'branding',
    shortDesc: 'پکیج جامع هویت سازمانی، دفترچه برند (Brandbook)، الگوها و پالت اختصاصی',
    fullDesc: 'جامع‌ترین خدمت آرکا برای کسب‌وکارهایی که می‌خواهند یک چهره منسجم، لوکس و معتبر در تمام نقاط تماس خود از بسته‌بندی گرفته تا وب‌سایت و اوراق اداری داشته باشند.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    popular: true,
    priceRange: {
      min: 5000000,
      max: 25000000,
      formatted: '۵,۰۰۰,۰۰۰ تا ۲۵,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۱۰ تا ۲۰ روز کاری',
    deliverables: ['کتابچه راهنمای هویت بصری (Brandbook)', 'طراحی لوگو، نشانه و مونوگرام', 'ست کامل اوراق اداری', 'پترن‌ها و تکسچرهای اختصاصی', 'طراحی آیکون‌های اختصاصی'],
    features: ['بررسی رقبا و جایگاه‌یابی برند', 'پالت رنگی استاندارد Pantone و CMYK/RGB', 'فونت‌شناسی و راهنمای نگارش'],
  },
  {
    id: 'srv-9',
    slug: 'advertising-design',
    title: 'طراحی تبلیغات محیطی و کمپین',
    category: 'print',
    shortDesc: 'طراحی بیلبورد، استرابورد، بروشور، کاتالوگ و بسته‌بندی محصولات',
    fullDesc: 'طراحی متریال‌های تبلیغاتی ۳۶۰ درجه برای کمپین‌های شهری و معرفی محصول در نمایشگاه‌ها با بالاترین استانداردهای بصری و چاپ صنعتی.',
    icon: 'Megaphone',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    popular: false,
    priceRange: {
      min: 1500000,
      max: 8000000,
      formatted: '۱,۵۰۰,۰۰۰ تا ۸,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۳ تا ۷ روز کاری',
    deliverables: ['فایل لایه‌باز با متدهای تفکیک رنگ', 'فایل آماده چاپ با خط تا و پرفراژ', 'فایل موکاپ جهت پیش‌نمایش'],
    features: ['طراحی کاتالوگ‌های لوکس چندصفحه‌ای', 'طراحی بیلبوردهای خلاقانه شهری', 'مشاوره متریال و خدمات تکمیلی چاپ'],
  },
  {
    id: 'srv-10',
    slug: 'video-editing',
    title: 'تدوین و ویرایش ویدئو (Video Editing)',
    category: 'video',
    shortDesc: 'تدوین تخصصی ریلز، تیزرهای تبلیغاتی، ولاگ و موشن‌گرافیک‌های حرفه‌ای',
    fullDesc: 'با استفاده از نرم‌افزارهای پریمیر و افترافکت، با تصحیح رنگ سینمایی، افکت‌های صوتی فضاساز و زیرنویس‌های متحرک، ویدئوهای شما را به یک تجربه بصری هیجان‌انگیز تبدیل می‌کنیم.',
    icon: 'Video',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    popular: true,
    priceRange: {
      min: 1000000,
      max: 8000000,
      formatted: '۱,۰۰۰,۰۰۰ تا ۸,۰۰۰,۰۰۰ تومان',
    },
    estimatedDays: '۲ تا ۵ روز کاری',
    deliverables: ['خروجی باکیفیت 4K و 1080p', 'صداگذاری و کالرگریدینگ حرفه‌ای', 'پروژه لایه‌باز'],
    features: ['موشن تایتل‌های اختصاصی', 'افکت‌های صوتی هماهنگ (Sound Design)', 'اصلاح رنگ و نور اختصاصی'],
  },
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'طراحی هویت بصری هلدینگ بین‌المللی ارس',
    category: 'branding',
    categoryTitle: 'هویت بصری',
    client: 'هلدینگ ارس گروپ',
    year: '۱۴۰۳',
    description: 'خلق هویت بصری لوکس شامل مونوگرام اختصاصی، ست کامل اداری، دفترچه راهنمای برند و پترن‌های گرافیکی طلاکوب.',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['لوگو', 'برندبوک', 'طلاکوب', 'ست اداری'],
    features: ['مونوگرام الهام‌گرفته از هنر اصیل', 'پالت رنگی سبز سلطنتی و طلایی مات', 'ست اداری لوکس'],
    deliverables: ['برندبوک ۳۲ صفحه‌ای', 'فایل‌های وکتور استاندارد', 'تمپلیت پرزنتیشن'],
    clientTestimonial: 'طراحی هویت بصری ارس توسط استودیو آرکا اعتبار ویژه‌ای به جلسات تجاری ما در سطح منطقه بخشید.',
    colorPalette: ['#0f3d3e', '#d4af37', '#ffffff', '#1a2e2e'],
  },
  {
    id: 'port-2',
    title: 'لوگوتایپ و نشان تجاری کافه رستوران روناک',
    category: 'logo',
    categoryTitle: 'لوگو',
    client: 'مجموعه غذایی روناک',
    year: '۱۴۰۳',
    description: 'ترکیب ظریف تایپوگرافی مدرن فارسی با فرم فنجان و دانه قهوه در کالبدی مینیمال و چشم‌نواز.',
    coverImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['لوگو رستوران', 'تایپوگرافی', 'مینیمال'],
    features: ['خوانایی فوق‌العاده در مقیاس‌های بسیار ریز', 'طراحی نسخه یک‌رنگ برای تابلو نئون'],
    deliverables: ['فایل‌های برداری AI و SVG', 'نسخه مهر و تابلوسازی'],
    clientTestimonial: 'دقت آرکا در خلق نشانه‌ای که هم اصالت ایرانی داشته باشد و هم مدرن باشد ستودنی است.',
    colorPalette: ['#2c1810', '#c89666', '#f5ede0'],
  },
  {
    id: 'port-3',
    title: 'مجموعه پوسترهای جشنواره ملی معماری معاصر',
    category: 'poster',
    categoryTitle: 'پوستر',
    client: 'انجمن معماران جوان',
    year: '۱۴۰۲',
    description: 'خلق پوستر با فرم‌های ژئومتریک ساختارشکن و خطوط پرسپکتیو، به کارگیری تایپوگرافی برجسته فارسی.',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    tags: ['پوستر فرهنگی', 'معماری', 'ژئومتریک'],
    features: ['ترکیب هنر معماری و گرافیک دیزاین', 'هارمونی رنگی خاص چاپ صنعتی'],
    deliverables: ['فایل چاپ 70x100 سانتی‌متر', 'استوری و بنر دیجیتال رویداد'],
    colorPalette: ['#111827', '#e11d48', '#38bdf8', '#f3f4f6'],
  },
  {
    id: 'port-4',
    title: 'کمپین شبکه‌های اجتماعی استارتاپ فناوری نکسوس',
    category: 'social',
    categoryTitle: 'شبکه‌های اجتماعی',
    client: 'فناوری اطلاعات نکسوس',
    year: '۱۴۰۳',
    description: 'طراحی ۱۲ قالب پست اسلایدی و کاورهای هایلایت با سبک نئومورفیسم تاریک و هایلایت‌های نئونی.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tags: ['اینستاگرام', 'سوشال مدیا', 'تکنولوژی', 'اسلایدی'],
    features: ['افزایش ۵ برابری تعامل ارگانیک پیج', 'سیستم طراحی ماژولار قابل ویرایش'],
    deliverables: ['۱۲ تمپلیت لایه‌باز فتوشاپ', '۳۰ آیکون استوری اختصاصی'],
    colorPalette: ['#090d16', '#6366f1', '#06b6d4', '#f8fafc'],
  },
  {
    id: 'port-5',
    title: 'بنرهای کمپین بلک فرایدی فروشگاه آنلاین لیمو',
    category: 'banner',
    categoryTitle: 'بنر تبلیغاتی',
    client: 'فروشگاه اینترنتی لیمو استور',
    year: '۱۴۰۳',
    description: 'طراحی ست بنرهای وب‌سایت، کلیکی یکتانت و بیلبوردهای دیجیتال با تمرکز بر پروموشن‌های تخفیف انفجاری.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    tags: ['بنر کلیکی', 'بلک فرایدی', 'کمپین تبلیغاتی'],
    features: ['نرخ کلیک ۱.۸٪ (بسیار بالاتر از میانگین صنعت)', 'رعایت تمام سایزهای استاندارد وب'],
    deliverables: ['۱۵ سایز بنر گیف و ثابت', 'اسلایدر هدر وبسایت'],
    colorPalette: ['#0f0f0f', '#facc15', '#ef4444'],
  },
  {
    id: 'port-6',
    title: 'تیزر و تدوین ویدیو معرفی اپلیکیشن مالی تراز',
    category: 'video',
    categoryTitle: 'تدوین ویدئو',
    client: 'فین‌تک تراز',
    year: '۱۴۰۳',
    description: 'تدوین و جلوه‌های ویژه تیزر معرفی اپلیکیشن همراه با موشن‌گرافیک رابط کاربری و کالرگریدینگ حرفه‌ای.',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    tags: ['تدوین تیزر', 'کالرگریدینگ', 'موشن‌گرافیک'],
    features: ['صداگذاری سه‌بعدی و فراگیر', 'انیمیشن روان آیکون‌ها'],
    deliverables: ['تیزر ۶۰ ثانیه‌ای 4K', 'نسخه عمودی ریلز اینستاگرام'],
    colorPalette: ['#042f2e', '#14b8a6', '#f0fdfa'],
  },
];

export const INITIAL_PRICING: PricingPlan[] = [
  {
    id: 'prc-1',
    serviceId: 'srv-1',
    title: 'طراحی لوگو و نشان تجاری',
    category: 'branding',
    minPrice: 1000000,
    maxPrice: 15000000,
    unit: 'پروژه',
    formattedRange: '۱,۰۰۰,۰۰۰ تا ۱۵,۰۰۰,۰۰۰ تومان',
    turnaroundTime: '۳ الی ۷ روز کاری',
    features: [
      'ارائه ۳ الی ۵ اتود مفهومی متفاوت',
      'فایل‌های برداری لایه‌باز (AI, EPS, SVG)',
      'موکاپ‌های سه‌بعدی پرمیوم',
      'دفترچه قوانین استفاده از لوگو',
      'تضمین بدون مشابهت و کپی'
    ],
    popular: true,
    note: 'قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.'
  },
  {
    id: 'prc-2',
    serviceId: 'srv-2',
    title: 'طراحی بنر تبلیغاتی و وبسایت',
    category: 'digital',
    minPrice: 700000,
    maxPrice: 2000000,
    unit: 'طرح / ست',
    formattedRange: '۷۰۰,۰۰۰ تا ۲,۰۰۰,۰۰۰ تومان',
    turnaroundTime: '۱ الی ۳ روز کاری',
    features: [
      'طراحی طبق استانداردهای CTR و تبدیل بالا',
      'ارائه فایل لایه‌باز PSD',
      'خروجی بهینه در فرمت‌های JPG, PNG, GIF',
      'امکان سفارش در پکیج چند سایزه'
    ],
    popular: false,
    note: 'قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.'
  },
  {
    id: 'prc-3',
    serviceId: 'srv-3',
    title: 'طراحی پوستر اختصاصی',
    category: 'print',
    minPrice: 700000,
    maxPrice: 2000000,
    unit: 'طرح',
    formattedRange: '۷۰۰,۰۰۰ تا ۲,۰۰۰,۰۰۰ تومان',
    turnaroundTime: '۲ الی ۴ روز کاری',
    features: [
      'طراحی هنری و تبلیغاتی منحصر‌به‌فرد',
      'آماده‌سازی فایل چاپ با مود CMYK',
      'نسخه مناسب انتشار در شبکه‌های اجتماعی',
      'اعمال ویرایش تا رضایت کامل'
    ],
    popular: false,
    note: 'قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.'
  },
  {
    id: 'prc-4',
    serviceId: 'srv-4',
    title: 'طراحی کارت ویزیت و ست اداری',
    category: 'print',
    minPrice: 600000,
    maxPrice: 5000000,
    unit: 'طرح / پکیج',
    formattedRange: '۶۰۰,۰۰۰ تا ۵,۰۰۰,۰۰۰ تومان',
    turnaroundTime: '۲ الی ۳ روز کاری',
    features: [
      'طراحی دورو با متدهای مدرن',
      'طراحی قالب طلاکوب، نقره‌کوب و یووی',
      'فایل آماده ارسال مستقیم به چاپخانه',
      'ست کامل در صورت سفارش پکیج اداری'
    ],
    popular: false,
    note: 'قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.'
  },
  {
    id: 'prc-5',
    serviceId: 'srv-7',
    title: 'طراحی کاور و Thumbnail',
    category: 'digital',
    minPrice: 50000,
    maxPrice: 200000,
    unit: 'هر عدد',
    formattedRange: '۵۰,۰۰۰ تا ۲۰۰,۰۰۰ تومان',
    turnaroundTime: '۱۲ الی ۲۴ ساعت',
    features: [
      'استایل اختصاصی و پرکلیک یوتیوب و آپارات',
      'دوربری تمیز چهره و نورپردازی نئونی',
      'فایل لایه‌باز جهت تغییر عناوین بعدی',
      'تخفیف ویژه در سفارش پکیج‌های ماهانه'
    ],
    popular: true,
    note: 'قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.'
  },
  {
    id: 'prc-6',
    serviceId: 'srv-8',
    title: 'پکیج جامع هویت بصری سازمانی',
    category: 'branding',
    minPrice: 5000000,
    maxPrice: 25000000,
    unit: 'پروژه کامل',
    formattedRange: '۵,۰۰۰,۰۰۰ تا ۲۵,۰۰۰,۰۰۰ تومان',
    turnaroundTime: '۱۰ الی ۲۰ روز کاری',
    features: [
      'لوگو، مونوگرام و تایپوگرافی رسمی',
      'طراحی ست اداری کامل (سربرگ، پاکت، فاکتور)',
      'کتابچه هویت برند (Brand Identity Guidebook)',
      'پترن‌ها، المان‌ها و آیکون‌های گرافیکی اختصاصی',
      'مشاوره استراتژی بصری برند'
    ],
    popular: true,
    note: 'قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    clientName: 'مهندس حسینی',
    companyName: 'مدیرعامل شرکت دانش‌بنیان رادمان',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'طراحی لوگو و هویت بصری که استودیو آرکا برای ما اجرا کرد دقیقاً مطابق با پرستیژ سازمانی ما بود. سرعت پاسخگویی و احترام به نظرات کارفرما بی‌نظیر است.',
    serviceTitle: 'طراحی هویت بصری',
    date: 'اردیبهشت ۱۴۰۳'
  },
  {
    id: 'rev-2',
    clientName: 'سارا تهرانی',
    companyName: 'بنیان‌گذار برند مد و پوشاک دیبا',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    comment: 'کارت ویزیت‌های طلاکوب و کاورهای اینستاگرام پیج ما با طراحی آرکا جان تازه‌ای گرفت. نرخ تبدیل مشتریان حضوری ما به شکل چشم‌گیری بالا رفت.',
    serviceTitle: 'کارت ویزیت و سوشال',
    date: 'خرداد ۱۴۰۳'
  },
  {
    id: 'rev-3',
    clientName: 'امیررضا کمالی',
    companyName: 'تولیدکننده محتوا و مدرس یوتیوب',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'بیش از ۶ ماه است که تامبنیل تمام ویدیوهای کانالم رو به آرکا می‌سپارم. تحویل به موقع و درک عالی از گرافیک مدرن باعث شده خیالم کاملاً راحت باشه.',
    serviceTitle: 'طراحی Thumbnail',
    date: 'تیر ۱۴۰۳'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'delivery',
    question: 'زمان تحویل پروژه چقدر است؟',
    answer: 'زمان تحویل بسته به نوع خدمت متفاوت است؛ برای مثال کاور و تامبنیل ظرف ۱۲ تا ۲۴ ساعت، بنر و پوستر بین ۲ تا ۴ روز کاری و پروژه‌های جامع لوگو و هویت بصری بین ۳ الی ۱۰ روز کاری زمان می‌برند. در زمان ثبت سفارش، زمان تخمینی مشخص می‌شود.'
  },
  {
    id: 'faq-2',
    category: 'technical',
    question: 'چند مرحله امکان اصلاح و ویرایش روی طرح وجود دارد؟',
    answer: 'در مجموعه گرافیک آرکا، تمامی سفارش‌ها شامل ۲ تا ۳ راند ویرایش کامل هستند تا طرح دقیقاً مطابق با سلیقه و استاندارد مورد انتظار شما به نتیجه نهایی برسد.'
  },
  {
    id: 'faq-3',
    category: 'technical',
    question: 'آیا فایل لایه‌باز طرح‌ها تحویل داده می‌شود؟',
    answer: 'بله؛ پس از تایید نهایی طرح، پکیج کامل شامل فایل‌های لایه‌باز استاندارد (مانند AI, PSD, EPS) به همراه فرمت‌های باکیفیت چاپی (PDF, CMYK) و وب (PNG, SVG, JPG) در اختیارتان قرار می‌گیرد.'
  },
  {
    id: 'faq-4',
    category: 'order',
    question: 'چگونه سفارش خود را در آرکا ثبت کنم؟',
    answer: 'به سادگی از طریق دکمه «ثبت سفارش» در سایت، فرم هوشمند چندمرحله‌ای را تکمیل کنید، جزئیات و فایل‌های نمونه را ارسال کنید. پس از ثبت، یک کد رهگیری اختصاصی (مثلا ARKA-2026-00001) دریافت می‌کنید و می‌توانید در هر لحظه وضعیت پروژه را پیگیری کنید.'
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'قیمت طراحی چگونه محاسبه می‌شود؟',
    answer: 'قیمت‌گذاری بر اساس پیچیدگی، تعداد اتودها، ابعاد پروژه و فوریت زمانی تعیین می‌شود. بازه قیمت در سایت شفاف است و پس از ارسال فرم، پیش‌فاکتور دقیق به شما اعلام خواهد شد.'
  },
  {
    id: 'faq-6',
    category: 'delivery',
    question: 'چگونه فایل نهایی پروژه را تحویل می‌گیرم؟',
    answer: 'فایل‌های نهایی با بالاترین کیفیت در پنل پیگیری سفارش سایت قرار می‌گیرند و هم‌زمان از طریق پیام‌رسان‌های بله یا تلگرام به آیدی شما ارسال خواهند شد.'
  }
];

export const INITIAL_SETTINGS: StudioSettings = {
  brandName: 'مجموعه گرافیک آرکا',
  tagline: 'ایده‌های شما، طراحی حرفه‌ای ما',
  adminHandle: '@Arakaadmin',
  telegramLink: 'https://t.me/Arakaadmin',
  baleLink: 'https://ble.ir/Arakaadmin',
  eitaaLink: 'https://eitaa.com/Arakaadmin',
  phone: '۰۹۱۹۰۰۰۰۰۰۰',
  email: 'info@arkagraphic.ir',
  address: 'تهران، بلوار میرداماد، برج آرین، طبقه ۵، استودیو دیزاین آرکا',
  workingHours: 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰ | پنج‌شنبه‌ها: ۹:۰۰ الی ۱۴:۰۰',
  currency: 'تومان'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ARKA-2026-00001',
    customerName: 'محمدرضا سلطانی',
    phone: '09121112233',
    messengerHandle: '@soltani_biz',
    messengerType: 'bale',
    email: 'soltani@example.com',
    projectType: 'طراحی لوگو',
    projectGoal: 'معرفی برند و افتتاحیه فروشگاه',
    platform: 'Print, Website, Instagram',
    dimensions: 'وکتور مقیاس‌پذیر',
    description: 'یک لوگوی مینیمال برای برند پوشاک مردانه با پرستیژ بالا، ترکیب حرف S با المان‌های معماری کلاسیک.',
    brandColors: 'سبز کله‌غازی و طلایی مات',
    designStyle: 'مینیمال، لوکس و مدرن',
    deliveryDeadline: '۱۴۰۳/۰۶/۱۰',
    hasLogo: false,
    hasReferenceFiles: true,
    uploadedFiles: [
      { name: 'moodboard_references.pdf', size: 2450000, type: 'application/pdf' },
      { name: 'color_sample.jpg', size: 850000, type: 'image/jpeg' }
    ],
    deliverableFiles: [
      {
        id: 'del-1',
        title: 'پیش‌نمایش کانسپت‌های لوگو',
        format: 'PDF',
        fileSize: '4.2 MB',
        downloadUrl: '#',
        uploadedAt: '۱۴۰۳/۰۶/۰۵',
        version: 'v1.0'
      }
    ],
    status: 'preview_sent',
    stageProgress: 65,
    estimatedPrice: '۴,۵۰۰,۰۰۰ تومان',
    finalPrice: '۴,۵۰۰,۰۰۰ تومان',
    adminNotes: ['اتودهای اولیه در فایل پیوست قرار گرفت.', 'منتظر تایید اتود شماره ۲ توسط مشتری.'],
    clientFeedback: 'کانسپت دوم بسیار چشم‌نواز است، کمی ضخامت فونت زیرنویس را بررسی کنید.',
    createdAt: '2026-08-10 14:30',
    updatedAt: '2026-08-12 11:20'
  },
  {
    id: 'ARKA-2026-00002',
    customerName: 'فاطمه احمدی',
    phone: '09355556677',
    messengerHandle: '@fatemeh_acad',
    messengerType: 'telegram',
    email: 'f.ahmadi@gmail.com',
    projectType: 'طراحی پست اینستاگرام',
    projectGoal: 'جذب مشتری و فروش دوره آموزشی',
    platform: 'Instagram',
    dimensions: '1080x1350 پیکسل',
    description: 'طراحی یک پست اسلایدی ۸ عددی برای آموزش اصول فن بیان و معرفی دوره جامع.',
    brandColors: 'سرمه‌ای، زرد لیمویی و سفید',
    designStyle: 'آموزشی، پرانرژی و تمیز',
    deliveryDeadline: '۱۴۰۳/۰۶/۰۸',
    hasLogo: true,
    hasReferenceFiles: true,
    uploadedFiles: [
      { name: 'logo_transparent.png', size: 450000, type: 'image/png' },
      { name: 'post_texts.docx', size: 120000, type: 'application/docx' }
    ],
    status: 'in_design',
    stageProgress: 45,
    estimatedPrice: '۶۵۰,۰۰۰ تومان',
    adminNotes: ['محتوای متنی اسلایدها دریافت شد.', 'طراحی اسلایدهای ۱ تا ۴ در حال اجرا.'],
    createdAt: '2026-08-14 09:15',
    updatedAt: '2026-08-15 08:00'
  },
  {
    id: 'ARKA-2026-00003',
    customerName: 'دکتر بهرامی',
    phone: '09139998877',
    messengerHandle: '@dr_bahrami',
    messengerType: 'eitaa',
    projectType: 'طراحی کارت ویزیت',
    projectGoal: 'معرفی کلینیک دندانپزشکی',
    platform: 'Print',
    dimensions: '8.5x4.8 سانتی‌متر',
    description: 'کارت ویزیت با روکش مخمل و طلاکوب نام پزشک با تم سفید و سبز ملایم.',
    brandColors: 'سفید صدفی و سبز نعنایی و طلاکوب',
    designStyle: 'پزشکی لوکس و مینیمال',
    hasLogo: true,
    hasReferenceFiles: false,
    uploadedFiles: [
      { name: 'clinic_logo.ai', size: 1100000, type: 'application/illustrator' }
    ],
    deliverableFiles: [
      {
        id: 'del-2',
        title: 'پکیج کامل چاپ کارت ویزیت',
        format: 'ZIP',
        fileSize: '18.5 MB',
        downloadUrl: '#',
        uploadedAt: '۱۴۰۳/۰۶/۰۱',
        version: 'vFinal'
      }
    ],
    status: 'completed',
    stageProgress: 100,
    estimatedPrice: '۱,۲۰۰,۰۰۰ تومان',
    finalPrice: '۱,۲۰۰,۰۰۰ تومان',
    adminNotes: ['فایل آماده چاپ با خطوط راهنما تحویل شد.', 'پروژه با موفقیت بسته شد.'],
    createdAt: '2026-08-01 10:00',
    updatedAt: '2026-08-03 16:45'
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'علی محمدی',
    phone: '09123334455',
    email: 'ali@mohammadi.com',
    subject: 'درخواست مشاوره برای برندبوک شرکت پخش',
    message: 'سلام وقت بخیر، ما برای یک شرکت پخش دارویی نیاز به طراحی کامل هویت بصری و ست اداری داریم. آیا امکان جلسه حضوری یا آنلاین برای بررسی نمونه‌ها وجود دارد؟',
    status: 'unread',
    createdAt: '2026-08-14 18:20'
  },
  {
    id: 'msg-2',
    name: 'نگین راد',
    phone: '09197778899',
    email: 'negin@rad.ir',
    subject: 'سفارش ماهانه تامبنیل یوتیوب',
    message: 'درود، برای کانال یوتیوب هفته‌ای ۲ ویدیو داریم. آیا پلن اشتراک ماهانه با تخفیف برای سفارش‌های منظم دارید؟',
    status: 'read',
    createdAt: '2026-08-13 12:10'
  }
];

export const INITIAL_ADMINS: AdminUser[] = [
  {
    id: 'admin-1',
    username: 'admin',
    password: 'arka@admin1403',
    fullName: 'مدیر ارشد آرکا (ابوالفضل)',
    role: 'super_admin',
    roleTitle: 'مدیر کل و سرپرست هنری',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    email: 'admin@arkadesign.ir',
    phone: '09120000000',
    isActive: true,
    createdAt: '2026-01-01 10:00',
    lastLogin: '2026-08-15 12:30',
    permissions: ['all']
  },
  {
    id: 'admin-2',
    username: 'designer_ali',
    password: 'ali@design123',
    fullName: 'علی رضایی',
    role: 'designer',
    roleTitle: 'طراح ارشد و مدیر پروژه',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    email: 'ali@arkadesign.ir',
    phone: '09351234567',
    isActive: true,
    createdAt: '2026-02-10 14:15',
    lastLogin: '2026-08-14 09:15',
    permissions: ['orders', 'portfolio', 'services']
  }
];
