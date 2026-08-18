import React from 'react';
import { Sparkles, ArrowLeft, Send, ShieldCheck, HeartHandshake } from 'lucide-react';

interface CtaBannerProps {
  onOrderClick: () => void;
  onContactClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderClick, onContactClick }) => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d3b3d] via-[#134e4a] to-[#0d3b3d] border-2 border-amber-400/50 p-8 sm:p-12 shadow-2xl overflow-hidden text-center sm:text-right">
          {/* Ambient Glow circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>آماده‌اید برند خود را متمایز و باشکوه کنید؟</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
                سفارش طراحی اختصاصی خود را همین حالا ثبت کنید
              </h2>

              <p className="text-sm sm:text-base text-teal-100/90 max-w-2xl leading-relaxed">
                تیم طراحان ارشد استودیو آرکا با تحلیل هویت برند و اهداف تبلیغاتی، چشم‌نوازترین طرح‌ها را در سریع‌ترین زمان برای شما خلق می‌کنند.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOrderClick}
                className="w-full py-4 px-6 rounded-xl font-black text-base text-teal-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-black/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-teal-950" />
                <span>شروع و ثبت آنلاین سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-teal-100 bg-teal-950/80 hover:bg-teal-950 border border-teal-600 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>مشاوره رایگان با مدیر هنری (@Arakaadmin)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
