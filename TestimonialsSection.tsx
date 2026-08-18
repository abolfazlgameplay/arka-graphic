import React from 'react';
import { Review } from '../../types';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-20 relative bg-[#061516] border-t border-teal-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="gold" size="md">
            اعتماد و رضایت کارفرمایان
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            نظرات کارفرمایان درباره <span className="gold-gradient-text">استودیو آرکا</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            افتخار ما، همکاری با ده‌ها برند پیشرو، استارتاپ موفق و کارآفرینان در پروژه‌های ماندگار است.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative rounded-2xl bg-[#092224] border border-teal-800/60 p-6 shadow-xl flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-800/40" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  «{rev.comment}»
                </p>
              </div>

              {/* Client Info Header */}
              <div className="pt-4 border-t border-teal-900/60 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                />
                <div className="text-right">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{rev.clientName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-teal-300/80">{rev.companyName}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    سفارش: {rev.serviceTitle} • {rev.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
