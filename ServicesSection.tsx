import React, { useState } from 'react';
import { Service } from '../../types';
import {
  Sparkles,
  Layout,
  Image as ImageIcon,
  CreditCard,
  Share2,
  Smartphone,
  Film,
  Layers,
  Megaphone,
  Video,
  ArrowLeft,
  Clock,
  Check,
  ChevronLeft
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ServicesSectionProps {
  services: Service[];
  onOrderService: (serviceName: string) => void;
  onViewAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOrderService,
  onViewAllServices,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
    Layout: <Layout className="w-6 h-6 text-teal-300" />,
    Image: <ImageIcon className="w-6 h-6 text-amber-300" />,
    CreditCard: <CreditCard className="w-6 h-6 text-emerald-300" />,
    Share2: <Share2 className="w-6 h-6 text-sky-400" />,
    Smartphone: <Smartphone className="w-6 h-6 text-purple-300" />,
    Film: <Film className="w-6 h-6 text-rose-400" />,
    Layers: <Layers className="w-6 h-6 text-amber-400" />,
    Megaphone: <Megaphone className="w-6 h-6 text-yellow-400" />,
    Video: <Video className="w-6 h-6 text-teal-400" />,
  };

  const categories = [
    { id: 'all', label: 'همه خدمات (۱۰ خدمت)' },
    { id: 'branding', label: 'هویت بصری و لوگو' },
    { id: 'print', label: 'چاپ، پوستر و اوراق' },
    { id: 'social', label: 'شبکه‌های اجتماعی' },
    { id: 'digital', label: 'دیجیتال و وب' },
    { id: 'video', label: 'تدوین ویدیو' },
  ];

  const filteredServices = services.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <section id="services" className="py-20 relative bg-[#071a1c]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="gold" size="md">
            تنوع و کیفیت تخصصی
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            خدمات حرفه‌ای <span className="gold-gradient-text">مجموعه گرافیک آرکا</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            از ایده‌پردازی اولیه تا تحویل فایل‌های لایه‌باز و آماده چاپ؛ ما در تمامی حوزه‌های طراحی گرافیک با استانداردهای بین‌المللی در کنار شما هستیم.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  filterCategory === cat.id
                    ? 'bg-amber-400 text-teal-950 font-bold shadow-lg shadow-amber-400/20'
                    : 'bg-[#0b292b] text-slate-300 hover:text-white hover:bg-teal-900/60 border border-teal-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-2xl bg-[#0a2325]/90 border border-teal-800/60 hover:border-amber-400/60 p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-teal-950/60 flex flex-col justify-between"
            >
              {/* Card Header & Icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-700/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.icon] || <Sparkles className="w-6 h-6 text-amber-400" />}
                  </div>

                  <div className="flex items-center gap-2">
                    {service.popular && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-teal-950">
                        محبوب
                      </span>
                    )}
                    <span className="text-xs font-mono text-teal-400/70">
                      ۰{index + 1}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed line-clamp-3 mb-4">
                  {service.shortDesc}
                </p>

                {/* Estimated Turnaround Time */}
                <div className="flex items-center gap-1.5 text-xs text-teal-300/90 mb-4 bg-teal-950/40 p-2 rounded-lg border border-teal-900/60">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>زمان تخمینی: {service.estimatedDays}</span>
                </div>
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="pt-4 border-t border-teal-900/60 space-y-3">
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>بازه قیمت:</span>
                  <span className="font-bold text-amber-300">{service.priceRange.formatted}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-200 bg-[#0c2f30] hover:bg-teal-900 border border-teal-700/60 hover:text-amber-300 transition-colors text-center"
                  >
                    مشاهده جزئیات
                  </button>

                  <button
                    onClick={() => onOrderService(service.title)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold text-teal-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center flex items-center justify-center gap-1 shadow-md shadow-amber-400/20"
                  >
                    <span>ثبت سفارش</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Link */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-950/80 border border-teal-700 text-sm font-semibold text-slate-200 hover:text-amber-300 hover:border-amber-400 transition-all shadow-lg"
          >
            <span>مشاهده صفحه کامل و راهنمای جامع خدمات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-950 border border-teal-700">
                {iconMap[selectedService.icon]}
              </div>
              <div>
                <span className="text-white font-bold">{selectedService.title}</span>
                <span className="block text-xs text-amber-300 font-normal">استودیو گرافیک آرکا</span>
              </div>
            </div>
          }
          maxWidth="2xl"
        >
          <div className="space-y-5 text-right">
            {/* Image Preview Banner */}
            <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden border border-teal-800">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092224] via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 bg-teal-950/90 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
                {selectedService.priceRange.formatted}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-200 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            {/* Features List */}
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                ویژگی‌ها و مزایای طراحی در آرکا:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-teal-950/50 p-2 rounded-lg border border-teal-900/60">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                فایل‌های نهایی تحویلی:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.deliverables.map((del, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#0b2b2d] border border-teal-700/80 text-teal-200"
                  >
                    {del}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA in modal */}
            <div className="pt-4 border-t border-teal-900/80 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span>مدت تحویل: </span>
                <span className="text-white font-bold">{selectedService.estimatedDays}</span>
              </div>

              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOrderService(title);
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-teal-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg flex items-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>ثبت سفارش {selectedService.title}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
