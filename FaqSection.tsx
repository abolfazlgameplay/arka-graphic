import React, { useState } from 'react';
import { FAQItem } from '../../types';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Badge } from '../common/Badge';

interface FaqSectionProps {
  faqs: FAQItem[];
  onContactClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, onContactClick }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 relative bg-[#07191a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="teal" size="md">
            پاسخ به ابهامات متداول
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            سؤالات متداول <span className="gold-gradient-text">کارفرمایان</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            پاسخ سریع به متداول‌ترین سؤالات درباره نحوه ثبت سفارش، زمان تحویل، ویرایش و تحویل فایل‌ها.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                  isOpen
                    ? 'bg-[#0a2729] border-amber-400/60 shadow-xl'
                    : 'bg-[#092224]/70 border-teal-800/60 hover:border-teal-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-teal-900/60 animate-fadeIn">
                    <p className="p-3 bg-teal-950/40 rounded-xl border border-teal-900/40 text-slate-200">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Prompt */}
        <div className="mt-10 text-center bg-[#092224] p-5 rounded-2xl border border-teal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-sm font-bold text-white block">سؤال دیگری در ذهن دارید؟</span>
            <span className="text-xs text-slate-400">تیم پشتیبانی و مشاوره آرکا آماده پاسخگویی به شماست.</span>
          </div>
          <button
            onClick={onContactClick}
            className="px-5 py-2.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>ارتباط در بله / تلگرام (@Arakaadmin)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
