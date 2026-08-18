import React from 'react';
import { Logo } from '../components/common/Logo';
import {
  Sparkles,
  Award,
  Crown,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  ArrowLeft,
  PenTool,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

interface AboutPageProps {
  onOrderClick: () => void;
  onBackToHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOrderClick, onBackToHome }) => {
  const tools = [
    { name: 'Adobe Illustrator', role: 'طراحی برداری، لوگو و وکتور' },
    { name: 'Adobe Photoshop', role: 'ادیت، پوستر، بنر و کامپوزیت' },
    { name: 'Adobe After Effects', role: 'موشن‌گرافیک و جلوه‌های ویژه' },
    { name: 'Adobe Premiere Pro', role: 'تدوین ویدیو و تصحیح رنگ' },
    { name: 'Adobe InDesign', role: 'صفحه‌آرایی کاتالوگ و کتابچه برند' },
    { name: 'Figma', role: 'طراحی رابط کاربری و دیزاین سیستم' },
  ];

  const stats = [
    { number: '+۵۰۰', label: 'پروژه گرافیکی موفق' },
    { number: '۹۹.۴٪', label: 'رضایت کارفرمایان' },
    { number: '۱۰+', label: 'حوزه تخصصی دیزاین' },
    { number: '۷+', label: 'سال تجربه حرفه‌ای' },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-teal-900/60">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <button onClick={onBackToHome} className="hover:text-amber-300">
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">درباره مجموعه گرافیک آرکا</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-teal-300 hover:text-amber-300 flex items-center gap-1"
          >
            <span>بازگشت به خانه</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

        {/* Hero Section of About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-right">
            <Badge variant="gold" size="lg">
              روایت هویت و هنر
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              خلق زیبایی بصری، فراتر از یک تصویر ساده
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              «مجموعه گرافیک آرکا» با هدف ارتقای استانداردهای بصری برندهای ایرانی و بین‌المللی پایه‌گذاری شده است. باور ما این است که هر کسب‌وکار، داستان منحصربه‌فردی دارد و وظیفه ما به عنوان طراح، ترجمه این داستان به زبانی بصری، لوکس و اثربخش است.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              تیم آرکا متشکل از طراحان ارشد، تصویرسازان و متخصصان تایپوگرافی است که با تسلط بر ابزارهای استاندارد جهانی، آثاری بدون مشابهت، ماندگار و منطبق با اصول روانشناسی فروش و هنر معاصر خلق می‌کنند.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOrderClick}
                className="px-7 py-3.5 rounded-xl font-bold text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/20 text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>شروع همکاری با آرکا</span>
              </button>
            </div>
          </div>

          {/* Luxury Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0c2f30] to-[#07191a] border-2 border-amber-500/40 p-8 shadow-2xl space-y-6 text-center">
              <Logo size="xl" showText={false} className="mx-auto justify-center" />
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">استودیو دیزاین آرکا</h3>
                <span className="text-xs text-amber-300 font-mono tracking-widest block">
                  ARKA GRAPHIC STUDIO
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                «ایده‌های شما، طراحی حرفه‌ای ما»
                <br />
                تعهد به اصالت، ظرافت و پویایی در تمام خطوط
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((st, i) => (
            <div
              key={i}
              className="bg-[#092224] border border-teal-800/80 rounded-2xl p-6 text-center space-y-1 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl font-black gold-gradient-text font-mono">
                {st.number}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Core Design Principles */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="teal" size="md">
              منشور اخلاقی و استانداردهای آرکا
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              اصولی که هرگز در طراحی زیر پا نمی‌گذاریم
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#092224] p-6 rounded-2xl border border-teal-800 space-y-3 text-right">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">اصالت و نفی هرگونه کپی‌برداری</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                تمامی فرم‌ها، تایپوگرافی‌ها و پترن‌ها از پایه با بررسی نیازمندی‌های برند شما طراحی می‌شوند.
              </p>
            </div>

            <div className="bg-[#092224] p-6 rounded-2xl border border-teal-800 space-y-3 text-right">
              <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-400 flex items-center justify-center text-teal-300">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">دقت رنگ و هارمونی چاپ</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                رعایت دقیق پالت‌های رنگی استاندارد پنتون و تفکیک رنگی بدون افت کیفیت در دستگاه‌های چاپ لترپرس و افست.
              </p>
            </div>

            <div className="bg-[#092224] p-6 rounded-2xl border border-teal-800 space-y-3 text-right">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">انتقال سورس لایه‌باز</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                فایل‌های لایه‌باز سازمان‌یافته با نام‌گذاری لایه‌ها به صورت کامل به کارفرما تحویل داده می‌شود.
              </p>
            </div>
          </div>
        </div>

        {/* Software Stack */}
        <div className="bg-[#092224] p-8 rounded-3xl border border-teal-800/80 text-right space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">نرم‌افزارها و ابزارهای مورد استفاده در استودیو</h3>
            <p className="text-xs text-slate-400 mt-1">تضمین بالاترین سازگاری فایل‌ها با چاپخانه‌ها و پلتفرم‌های دیجیتال</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tools.map((tool, idx) => (
              <div key={idx} className="bg-[#061718] p-4 rounded-xl border border-teal-900 space-y-1">
                <span className="font-bold text-amber-300 text-xs sm:text-sm font-mono block">{tool.name}</span>
                <span className="text-[11px] text-slate-400">{tool.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
