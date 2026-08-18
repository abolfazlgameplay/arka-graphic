import React from 'react';
import {
  Sparkles,
  ArrowLeft,
  PenTool,
  Layers,
  Palette,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Zap,
  Star,
  Award
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-1/10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Text Content (7 Cols) */}
          <div className="lg:col-span-7 text-right space-y-6">
            {/* Top Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-teal-950/80 to-teal-900/40 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-teal-950/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-amber-300">
                استودیو تخصصی طراحی گرافیک و هویت بصری
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] tracking-tight">
              «مجموعه گرافیک <span className="gold-gradient-text">آرکا</span>»
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-200 mt-2 block">
                ایده‌های شما، طراحی حرفه‌ای ما
              </span>
            </h1>

            {/* Short Intro Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              طراحی گرافیک حرفه‌ای برای برندها، کسب‌وکارها و پروژه‌هایی که می‌خواهند متفاوت دیده شوند. از خلق لوگو و هویت بصری جامع تا پست‌های چشم‌گیر شبکه‌های اجتماعی و متریال‌های تبلیغاتی با بالاترین استانداردهای بصری.
            </p>

            {/* Studio USPs check bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>طراحی ۱۰۰٪ اختصاصی</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>تحویل فایل‌های لایه‌باز</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>پیگیری لحظه‌ای سفارش</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('order')}
                className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-teal-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2.5 text-base"
              >
                <Sparkles className="w-5 h-5 text-teal-950 group-hover:rotate-12 transition-transform" />
                <span>ثبت سفارش پروژه</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="px-7 py-4 rounded-xl font-bold text-slate-200 bg-[#0c2f30]/80 hover:bg-[#124143] border border-teal-700/60 hover:border-amber-400/60 transition-all duration-300 flex items-center justify-center gap-2 text-base backdrop-blur-sm"
              >
                <Eye className="w-5 h-5 text-amber-300" />
                <span>مشاهده نمونه‌کارها</span>
              </button>
            </div>

            {/* Handle & Direct Contact Badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 border-t border-teal-950/80">
              <span className="font-mono text-teal-300">آیدی ارتباطی در بله و تلگرام:</span>
              <a
                href="https://ble.ir/Arakaadmin"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-amber-300 hover:underline inline-flex items-center gap-1 font-mono"
              >
                @Arakaadmin
              </a>
            </div>
          </div>

          {/* Right / Visual Graphic Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Luxury Graphic Studio Card Showcase */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0e3538] to-[#081f20] border-2 border-amber-500/30 p-6 shadow-2xl shadow-black/80 backdrop-blur-xl">
                {/* Header bar of graphic visualizer */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-teal-900/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-300/80 px-2 py-0.5 rounded bg-teal-950/80 border border-teal-800/60">
                    ARKA CREATIVE CANVAS v2.6
                  </span>
                </div>

                {/* Simulated Graphic Design Canvas */}
                <div className="relative rounded-2xl overflow-hidden bg-[#061718] border border-teal-800/40 p-4 min-h-[260px] flex flex-col justify-between">
                  {/* Floating Layer Tools */}
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 bg-[#092224] px-2.5 py-1 rounded-lg border border-teal-700/50">
                      <PenTool className="w-3.5 h-3.5 text-amber-400" />
                      <span>Vector Pen</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#092224] px-2.5 py-1 rounded-lg border border-teal-700/50">
                      <Palette className="w-3.5 h-3.5 text-teal-400" />
                      <span>CMYK / RGB 300DPI</span>
                    </div>
                  </div>

                  {/* Centered Luxury Graphic Showcase Emblem */}
                  <div className="my-6 text-center relative">
                    <div className="inline-block relative">
                      <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-tr from-[#0a2f31] to-[#124d50] border border-amber-400/60 flex items-center justify-center shadow-xl shadow-teal-950/60 group">
                        <span className="text-3xl font-black gold-gradient-text tracking-wider">
                          ARKA
                        </span>
                      </div>
                      {/* Geometric vector crosshairs */}
                      <span className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
                      <span className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-teal-400" />
                    </div>
                    <p className="text-xs text-teal-200/90 mt-3 font-medium">
                      هویت بصری • تایپوگرافی اختصاصی • پترن سازمانی
                    </p>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center justify-between pt-2 border-t border-teal-950">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#0f3d3e] border border-white/20" title="Deep Teal" />
                      <div className="w-4 h-4 rounded-full bg-[#d4af37] border border-white/20" title="Matte Gold" />
                      <div className="w-4 h-4 rounded-full bg-[#f8fafc] border border-white/20" title="Pure White" />
                      <div className="w-4 h-4 rounded-full bg-[#07191a] border border-white/20" title="Obsidian" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Pantone 560C & Gold 871C
                    </span>
                  </div>
                </div>

                {/* Floating Tag 1: Quality Guarantee */}
                <div className="absolute -bottom-5 -right-5 bg-[#09282a] border border-amber-400/40 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-bounce-slow">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">رضایت ۹۹.۴٪ کارفرمایان</div>
                    <div className="text-[10px] text-teal-300">کیفیت تضمین‌شده در تمام پروژه‌ها</div>
                  </div>
                </div>

                {/* Floating Tag 2: Layered Delivery */}
                <div className="absolute -top-5 -left-5 bg-[#09282a] border border-teal-500/40 rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 backdrop-blur-xl">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">سورس لایه‌باز استاندارد</div>
                    <div className="text-[10px] text-slate-400">AI, PSD, EPS, PDF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
