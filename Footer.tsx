import React from 'react';
import { Logo } from '../common/Logo';
import {
  Send,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#051415] border-t border-amber-500/20 text-slate-300 pt-16 pb-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-teal-900/60">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              «مجموعه گرافیک آرکا» استودیوی تخصصی خلق هویت‌های بصری ممتاز، لوگو، گرافیک تبلیغاتی و شبکه‌های اجتماعی است. ما با ترکیب هنر مدرن و استراتژی دیزاین، به برند شما جلوه‌ای شایسته و فراموش‌نشدنی می‌بخشیم.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-amber-300">ارتباط مستقیم:</span>
              <a
                href="https://ble.ir/Arakaadmin"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-teal-900/80 text-teal-200 hover:bg-amber-400 hover:text-teal-950 border border-teal-700/60 transition-all"
              >
                <span>@Arakaadmin</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2 border-r-2 border-amber-400 pr-2.5">
              دسترسی سریع
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  خدمات طراحی گرافیک
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  نمونه‌کارهای اجرا شده
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  تعرفه‌ها و برآورد قیمت
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  سامانه پیگیری سفارش
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order')}
                  className="text-amber-300 font-semibold hover:underline flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  فرم ثبت سفارش آنلاین
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-amber-300 text-teal-400 font-bold transition-colors flex items-center gap-1.5 pt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  ورود مدیران و طراحان
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Summary */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2 border-r-2 border-amber-400 pr-2.5">
              خدمات تخصصی
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                طراحی لوگو و نشانه تجاری
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                طراحی پوستر و بنرهای تبلیغاتی
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                طراحی قالب و پست‌های اینستاگرام
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                طراحی کارت ویزیت و ست اداری لوکس
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                طراحی کاور و Thumbnail یوتیوب
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                تدوین ویدیو و تیزرهای دیجیتال
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2 border-r-2 border-amber-400 pr-2.5">
              راه‌های ارتباط و پشتیبانی
            </h4>

            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <span className="block font-medium">پشتیبانی بله و تلگرام:</span>
                <span className="text-teal-300 font-mono text-xs">@Arakaadmin</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <span className="block font-medium">ساعات پاسخگویی:</span>
                <span className="text-slate-400 text-xs">شنبه تا چهارشنبه ۹ الی ۱۸ | پنج‌شنبه ۹ الی ۱۴</span>
              </div>
            </div>

            {/* Social channels buttons */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <a
                href="https://ble.ir/Arakaadmin"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-2 rounded-lg bg-[#0b292b] border border-teal-800/80 text-xs text-center font-medium text-teal-300 hover:text-white hover:border-amber-400 transition-colors"
              >
                پیام‌رسان بله
              </a>
              <a
                href="https://t.me/Arakaadmin"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-2 rounded-lg bg-[#0b292b] border border-teal-800/80 text-xs text-center font-medium text-sky-400 hover:text-white hover:border-amber-400 transition-colors"
              >
                تلگرام
              </a>
              <a
                href="https://eitaa.com/Arakaadmin"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-2 rounded-lg bg-[#0b292b] border border-teal-800/80 text-xs text-center font-medium text-orange-400 hover:text-white hover:border-amber-400 transition-colors"
              >
                ایتا
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} مجموعه گرافیک آرکا (Arka Graphic Studio). تمامی حقوق مادی و معنوی محفوظ است.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              تضمین اصالت طراحی
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              تحویل سورس لایه‌باز
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
