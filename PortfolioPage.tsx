import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import {
  Sparkles,
  Search,
  Eye,
  Tag,
  ArrowRight,
  Palette,
  CheckCircle2,
  Layers,
  User,
  Calendar
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

interface PortfolioPageProps {
  portfolio: PortfolioItem[];
  onOrderProject: () => void;
  onBackToHome: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  portfolio,
  onOrderProject,
  onBackToHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'همه آثار' },
    { id: 'logo', label: 'طراحی لوگو' },
    { id: 'banner', label: 'بنر تبلیغاتی' },
    { id: 'poster', label: 'پوستر' },
    { id: 'social', label: 'شبکه‌های اجتماعی' },
    { id: 'branding', label: 'هویت بصری' },
    { id: 'video', label: 'تدوین ویدئو' },
  ];

  const filteredPortfolio = portfolio.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-teal-900/60">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <button onClick={onBackToHome} className="hover:text-amber-300">
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">نمونه‌کارهای استودیو آرکا</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-teal-300 hover:text-amber-300 flex items-center gap-1"
          >
            <span>بازگشت به خانه</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="teal" size="lg">
            نمایشگاه آثار و پروژه‌ها
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            گالری نمونه‌کارهای اجرا شده
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            مجموعه‌ای از بهترین آثار گرافیکی اجرا شده توسط تیم طراحی آرکا برای برندها، استارتاپ‌ها، شرکت‌ها و تولیدکنندگان محتوا.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-[#092224] p-4 rounded-2xl border border-teal-800/80 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-teal-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-teal-950 text-slate-300 hover:text-white hover:bg-teal-900 border border-teal-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام، تگ، کارفرما..."
              className="w-full bg-[#061718] border border-teal-800 rounded-xl pr-9 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-[#092224] border border-teal-800/80 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092224] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#07191a]/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {item.categoryTitle}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-teal-950/40 backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-xl bg-amber-400 text-teal-950 font-bold text-xs shadow-xl flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    مشاهده جزئیات کامل
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

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, idx) => (
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

        {/* Empty state */}
        {filteredPortfolio.length === 0 && (
          <div className="text-center py-16 bg-[#092224] rounded-3xl border border-teal-800 p-8 space-y-3">
            <p className="text-base text-slate-300">اثری مطابق با جستجوی شما پیدا نشد.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-amber-300 font-bold hover:underline"
            >
              پاک کردن فیلترها و نمایش همه آثار
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
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
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-teal-800 bg-black/40 max-h-[380px]">
                <img
                  src={selectedItem.coverImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

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

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-300">درباره این پروژه:</h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

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
                <span>سفارش طراحی پروژه اختصاصی</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
