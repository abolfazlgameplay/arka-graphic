import React, { useState } from 'react';
import { Service } from '../types';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

interface ServicesPageProps {
  services: Service[];
  onOrderService: (serviceName: string) => void;
  onBackToHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onOrderService,
  onBackToHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = [
    { id: 'all', label: 'همه خدمات' },
    { id: 'branding', label: 'برندسازی و لوگو' },
    { id: 'print', label: 'چاپ و بسته بندی' },
    { id: 'social', label: 'سوشال مدیا' },
    { id: 'digital', label: 'دیجیتال و وب' },
    { id: 'video', label: 'ویدیو و تدوین' },
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fullDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-teal-900/60">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <button onClick={onBackToHome} className="hover:text-amber-300">
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">خدمات تخصصی طراحی گرافیک</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-teal-300 hover:text-amber-300 flex items-center gap-1"
          >
            <span>بازگشت به خانه</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="gold" size="lg">
            کاتالوگ جامع خدمات آرکا
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            خدمات حرفه‌ای طراحی گرافیک
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            تمامی خدمات با بالاترین استانداردهای بصری، تفکیک دقیق لایه‌ها، فرمت‌های استاندارد چاپ و وب، و پشتیبانی کامل تا تأیید نهایی ارائه می‌شوند.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#092224] p-4 rounded-2xl border border-teal-800/80 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter */}
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی خدمت..."
              className="w-full bg-[#061718] border border-teal-800 rounded-xl pr-9 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#092224]/90 border border-teal-800/80 hover:border-amber-400/60 transition-all duration-300 p-6 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image Banner */}
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092224] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-950/90 text-amber-300 border border-amber-400/30">
                      {service.priceRange.formatted}
                    </span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-xs text-teal-400 bg-teal-950 px-2.5 py-1 rounded-lg border border-teal-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {service.estimatedDays}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Features & Deliverables preview */}
                <div className="space-y-2 pt-2 border-t border-teal-900/60">
                  <span className="text-xs font-bold text-teal-300">خروجی‌ها و ویژگی‌های این خدمت:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    {service.deliverables.slice(0, 4).map((del, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-teal-900/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedService(service)}
                  className="py-2.5 px-4 rounded-xl text-xs font-medium text-slate-300 bg-teal-950 hover:bg-teal-900 border border-teal-800 hover:text-amber-300 transition-colors"
                >
                  راهنمای کامل و جزییات
                </button>

                <button
                  onClick={() => onOrderService(service.title)}
                  className="py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ثبت سفارش این خدمت</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if nothing matches search */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-[#092224] rounded-3xl border border-teal-800 p-8 space-y-3">
            <p className="text-base text-slate-300">خدمتی مطابق با جستجوی شما یافت نشد.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-amber-300 font-bold hover:underline"
            >
              پاک کردن فیلترها و نمایش همه
            </button>
          </div>
        )}
      </div>

      {/* Modal for service details */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-right">
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-48 rounded-xl object-cover border border-teal-800"
            />
            <p className="text-sm text-slate-200 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div>
              <h4 className="text-xs font-bold text-amber-300 mb-2">امکانات پکیج:</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedService.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-teal-900 flex justify-between items-center">
              <span className="text-xs font-bold text-amber-300">{selectedService.priceRange.formatted}</span>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOrderService(title);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-teal-950 bg-amber-400 hover:bg-amber-300"
              >
                ثبت سفارش آنلاین
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
