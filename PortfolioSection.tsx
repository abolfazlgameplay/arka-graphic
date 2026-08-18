import React, { useState } from 'react';
import { PortfolioItem } from '../../types';
import {
  Sparkles,
  Eye,
  ArrowLeft,
  ExternalLink,
  Tag,
  Palette,
  CheckCircle2,
  Calendar,
  User,
  Layers
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  onOrderProject: () => void;
  onViewAllPortfolio: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  onOrderProject,
  onViewAllPortfolio,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'همه نمونه‌کارها' },
    { id: 'logo', label: 'طراحی لوگو' },
    { id: 'banner', label: 'بنر تبلیغاتی' },
    { id: 'poster', label: 'پوستر' },
    { id: 'social', label: 'شبکه‌های اجتماعی' },
    { id: 'branding', label: 'هویت بصری' },
    { id: 'video', label: 'تدوین ویدئو' },
  ];

  const filteredItems = portfolio.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-20 relative bg-[#061516]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="teal" size="md">
            آثار و تجربیات خلق‌شده
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            گالری نمونه‌کارهای <span className="gold-gradient-text">استودیو آرکا</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            گزیده‌ای از پروژه‌های طراحی هویت برند، نشان‌های تجاری، کمپین‌های تبلیغاتی و سوشال مدیا که با دقت و ظرافت بصری اجرا شده‌اند.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-teal-950 font-bold shadow-lg shadow-amber-400/20'
                    : 'bg-[#0a2325] text-slate-300 hover:text-white hover:bg-teal-900/60 border border-teal-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#092224] border border-teal-800/60 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092224] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#07191a]/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {item.categoryTitle}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-teal-950/40 backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-xl bg-amber-400 text-teal-950 font-bold text-xs shadow-xl flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    مشاهده جزئیات پروژه
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-teal-300/80">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    {item.client}
                  </span>
                  <span className="font-mono">{item.year}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-800/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onViewAllPortfolio}
            className="px-6 py-3 rounded-xl bg-teal-950/80 border border-teal-700 text-sm font-semibold text-slate-200 hover:text-amber-300 hover:border-amber-400 transition-all flex items-center gap-2 shadow-lg"
          >
            <span>مشاهده همه نمونه‌کارها در صفحه اختصاصی</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onOrderProject}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>سفارش طراحی اختصاصی شما</span>
          </button>
        </div>
      </div>

      {/* Portfolio Item Detail Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{selectedItem.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                {selectedItem.categoryTitle}
              </span>
            </div>
          }
          maxWidth="4xl"
        >
          <div className="space-y-6 text-right max-h-[75vh] overflow-y-auto pr-1">
            {/* Cover and preview carousel/grid */}
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-teal-800 bg-black/40 max-h-[380px]">
                <img
                  src={selectedItem.coverImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Additional gallery images */}
              {selectedItem.additionalImages && selectedItem.additionalImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {selectedItem.additionalImages.map((imgUrl, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-teal-900/80 aspect-video">
                      <img src={imgUrl} alt={`gallery-${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Client & Specs info row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-950/60 p-4 rounded-xl border border-teal-800/60 text-xs">
              <div>
                <span className="block text-slate-400 mb-1">کارفرما / سفارش‌دهنده:</span>
                <span className="font-bold text-white">{selectedItem.client}</span>
              </div>
              <div>
                <span className="block text-slate-400 mb-1">سال اجرا:</span>
                <span className="font-bold text-teal-300 font-mono">{selectedItem.year}</span>
              </div>
              <div>
                <span className="block text-slate-400 mb-1">دسته‌بندی:</span>
                <span className="font-bold text-amber-300">{selectedItem.categoryTitle}</span>
              </div>
              <div>
                <span className="block text-slate-400 mb-1">استودیو طراح:</span>
                <span className="font-bold text-white">گرافیک آرکا</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-300">درباره این پروژه و چالش‌های طراحی:</h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Features & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {selectedItem.features && (
                <div className="bg-[#0b292b] p-4 rounded-xl border border-teal-800/60">
                  <h5 className="font-bold text-teal-200 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    شاخصه‌های طراحی:
                  </h5>
                  <ul className="space-y-1.5 text-slate-300">
                    {selectedItem.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.deliverables && (
                <div className="bg-[#0b292b] p-4 rounded-xl border border-teal-800/60">
                  <h5 className="font-bold text-teal-200 mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    خروجی‌های تحویل داده‌شده:
                  </h5>
                  <ul className="space-y-1.5 text-slate-300">
                    {selectedItem.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Color Palette preview if available */}
            {selectedItem.colorPalette && (
              <div className="flex items-center gap-3 bg-teal-950/40 p-3 rounded-xl border border-teal-900">
                <Palette className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">پالت رنگی پروژه:</span>
                <div className="flex items-center gap-2">
                  {selectedItem.colorPalette.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Client Testimonial quote if exists */}
            {selectedItem.clientTestimonial && (
              <div className="bg-amber-400/10 border border-amber-400/30 p-4 rounded-xl text-xs text-amber-200 italic">
                «{selectedItem.clientTestimonial}»
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-teal-900/80 flex items-center justify-between">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                بستن پنجره
              </button>

              <button
                onClick={() => {
                  setSelectedItem(null);
                  onOrderProject();
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-teal-950 bg-amber-400 hover:bg-amber-300 transition-colors text-xs flex items-center gap-1.5 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>سفارش پروژه‌ای مشابه این کار</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
