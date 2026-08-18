import React from 'react';
import { PricingPlan } from '../../types';
import {
  Sparkles,
  Check,
  AlertCircle,
  Clock,
  ArrowLeft,
  Calculator,
  ChevronLeft
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  onSelectPlan: (planTitle: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
  onSelectPlan,
}) => {
  return (
    <section id="pricing" className="py-20 relative bg-[#071a1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="gold" size="md">
            تعرفه‌های شفاف و منصفانه
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            جدول تعرفه خدمات <span className="gold-gradient-text">مجموعه گرافیک آرکا</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            بسته‌های طراحی متناسب با مقیاس و نیاز کسب‌وکار شما. با بالاترین سطح دقت و استانداردهای حرفه‌ای.
          </p>

          {/* Prompt Mandatory Note Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mt-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>«قیمت نهایی پس از بررسی جزئیات پروژه تعیین می‌شود.»</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#0f3d3e] to-[#092224] border-2 border-amber-400 shadow-2xl shadow-amber-500/15'
                  : 'bg-[#092224]/90 border border-teal-800/60 hover:border-teal-600 shadow-xl'
              }`}
            >
              {/* Popular Ribbon */}
              {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-teal-950 shadow-md">
                    پیشنهاد ویژه
                  </span>
                </div>
              )}

              <div>
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {plan.title}
                </h3>

                {/* Turnaround Time */}
                <div className="flex items-center gap-1.5 text-xs text-teal-300/80 mb-6 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>زمان تحویل تقریبی: {plan.turnaroundTime}</span>
                </div>

                {/* Price Display */}
                <div className="bg-teal-950/60 rounded-2xl p-4 border border-teal-900/80 mb-6">
                  <div className="text-xs text-slate-400 mb-1">بازه تعرفه پایه:</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300">
                    {plan.formattedRange}
                  </div>
                  <div className="text-[11px] text-teal-400/80 mt-1 font-mono">
                    محاسبه بر اساس: {plan.unit}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-slate-300 block">
                    امکانات و خروجی‌های این بسته:
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-teal-900/60">
                <button
                  onClick={() => onSelectPlan(plan.title)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-teal-950 shadow-amber-500/20'
                      : 'bg-teal-900/80 hover:bg-teal-800 text-slate-100 hover:text-amber-300 border border-teal-700/80'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ثبت سفارش {plan.title}</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Project Calculator Note */}
        <div className="mt-12 text-center bg-[#092224] border border-teal-800/80 rounded-2xl p-6 max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
            <Calculator className="w-4 h-4" />
            <span>نیاز به استعلام هزینه پروژه‌های خاص یا تیراژ بالا دارید؟</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            در صورتی که پروژه شما شامل چندین متریال، کمپین ماهانه یا بسته‌بندی‌های اختصاصی است، بریف پروژه خود را ارسال کنید تا استعلام اختصاصی با تخفیف گروهی تقدیم گردد.
          </p>
          <button
            onClick={() => onSelectPlan('استعلام قیمت اختصاصی')}
            className="text-xs font-bold text-amber-300 hover:underline pt-1 inline-flex items-center gap-1"
          >
            ارسال فرم استعلام اختصاصی →
          </button>
        </div>
      </div>
    </section>
  );
};
