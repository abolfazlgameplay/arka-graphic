import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  RefreshCw,
  MessageCircle,
  Award,
  Crown,
  Check
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const WhyUsSection: React.FC = () => {
  const reasons = [
    {
      icon: <Crown className="w-6 h-6 text-amber-400" />,
      title: 'طراحی ۱۰۰٪ اختصاصی',
      description: 'هیچ پروژه‌ای کپی یا تمپلیت آماده نیست؛ هر طرح از خط اول با تحلیل دقیق برند و پرسونای مخاطب شما خلق می‌شود.',
    },
    {
      icon: <Award className="w-6 h-6 text-teal-300" />,
      title: 'کیفیت حرفه‌ای و استاندارد جهانی',
      description: 'رعایت دقیق مدهای رنگی CMYK و RGB، تفکیک لایه‌ها، خطوط برش و استانداردهای صنعتی چاپ و وب.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
      title: 'خلاقیت و نوآوری بصری',
      description: 'به‌کارگیری ترندهای روز طراحی گرافیک دنیا با حفظ اصالت هویت برند ایرانی شما برای درخشش در بازار.',
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-400" />,
      title: 'تحویل منظم و سروقت',
      description: 'تعهد کامل به ددلاین‌های تعیین‌شده در سامانه و احترام بی‌قیدوشرط به زمان و برنامه‌ریزی تبلیغاتی شما.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-sky-400" />,
      title: 'امکان اصلاح و ویرایش پروژه',
      description: 'ارائه چند راند ادیت و دریافت بازخورد مرحله‌به‌مرحله تا اطمینان از خشنودی و رضایت ۱۰۰ درصدی شما.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-300" />,
      title: 'ارتباط مستقیم و پشتیبانی آسان',
      description: 'ارتباط مستقیم با مدیر هنری از طریق بله و تلگرام (@Arakaadmin) بدون واسطه‌های سردرگم‌کننده.',
    },
  ];

  return (
    <section className="py-20 relative bg-[#07191a] border-y border-teal-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold" size="md">
            ارزش‌ها و تعهدات استودیو
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            چرا <span className="gold-gradient-text">مجموعه گرافیک آرکا</span> انتخاب برندهاست؟
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ما هنر دیزاین را با دانش بازاریابی پیوند داده‌ایم تا خروجی نهایی نه تنها زیبا، بلکه در خدمت فروش و رشد کسب‌وکار شما باشد.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-[#092224]/80 border border-teal-800/60 hover:border-amber-400/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/60"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="space-y-2 text-right">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0c2f30] via-[#0f3d3e] to-[#0c2f30] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              تضمین اصالت و بدون نسخه کپی
            </h4>
            <p className="text-xs sm:text-sm text-teal-200/90">
              تمامی پروژه‌های آرکا با انتقال کامل مالکیت معنوی و تحویل فایل‌های لایه‌باز وکتور در اختیارتان قرار می‌گیرد.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-amber-300 font-mono bg-teal-950 px-3 py-1.5 rounded-lg border border-teal-800">
              ۱۰۰٪ رضایت مشتری
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
