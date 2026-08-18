import React from 'react';
import {
  FileText,
  SearchCheck,
  Palette,
  Send,
  Sliders,
  CheckCheck,
  DownloadCloud,
  ArrowDown
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const TimelineSection: React.FC = () => {
  const steps = [
    {
      number: '۱',
      title: 'ثبت سفارش آنلاین',
      description: 'انتخاب نوع پروژه، تکمیل فرم هوشمند مشخصات و ارسال فایل‌ها یا لوگوهای نمونه.',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
    },
    {
      number: '۲',
      title: 'بررسی اطلاعات',
      description: 'تحلیل بریف پروژه توسط تیم طراحی آرکا و هماهنگی نهایی جزئیات و زمان‌بندی.',
      icon: <SearchCheck className="w-5 h-5 text-teal-300" />,
    },
    {
      number: '۳',
      title: 'شروع فرآیند طراحی',
      description: 'خلق اتودهای مفهومی، اتودزنی دستی و اجرای تخصصی وکتور با نرم‌افزارهای استاندارد.',
      icon: <Palette className="w-5 h-5 text-amber-300" />,
    },
    {
      number: '۴',
      title: 'ارسال پیش‌نمایش',
      description: 'ارائه اتودهای اولیه روی موکاپ‌های واقعی در سامانه پیگیری سفارش یا پیام‌رسان.',
      icon: <Send className="w-5 h-5 text-indigo-300" />,
    },
    {
      number: '۵',
      title: 'اعمال اصلاحات',
      description: 'دریافت نظرات شما، تغییر رنگ، فونت یا ترکیب‌بندی تا رسیدن به نتیجه ایده‌آل.',
      icon: <Sliders className="w-5 h-5 text-orange-400" />,
    },
    {
      number: '۶',
      title: 'تأیید نهایی',
      description: 'تأیید نهایی طرح تاییدشده توسط شما و آماده‌سازی فایل‌های تفکیک‌شده و باکیفیت.',
      icon: <CheckCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      number: '۷',
      title: 'تحویل فایل‌های لایه‌باز',
      description: 'دریافت پکیج کامل شامل سورس لایه‌باز (PSD/AI) و خروجی‌های چاپ و دیجیتال.',
      icon: <DownloadCloud className="w-5 h-5 text-green-300" />,
    },
  ];

  return (
    <section className="py-20 relative bg-[#061618]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="teal" size="md">
            شفافیت و نظم کاری
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            روند اجرای پروژه‌ها در <span className="gold-gradient-text">آرکا</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            از لحظه ثبت درخواست تا دریافت فایل نهایی، شما در ۷ مرحله منظم و شفاف در جریان پیشرفت پروژه خود خواهید بود.
          </p>
        </div>

        {/* Desktop / Large Screen Timeline Grid */}
        <div className="relative">
          {/* Connecting line behind items */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-teal-900 via-amber-500/40 to-teal-900 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#092224] border border-teal-800/60 hover:border-amber-400/60 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-950/60 text-right flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-teal-950 font-black text-xs flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-teal-950 border border-teal-700/80 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-300/85 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-teal-900/60 text-[10px] text-teal-400/70 font-mono">
                  مرحله {step.number} از ۷
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
