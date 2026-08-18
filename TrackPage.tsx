import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { studioApi } from '../services/api';
import { ORDER_STATUS_MAP } from '../data/initialData';
import {
  Search,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  FileText,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Send,
  Eye,
  File,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

interface TrackPageProps {
  initialOrderId?: string;
  onNewOrder: () => void;
  onBackToHome: () => void;
}

export const TrackPage: React.FC<TrackPageProps> = ({
  initialOrderId = '',
  onNewOrder,
  onBackToHome,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const statusOrder: OrderStatus[] = [
    'submitted',
    'under_review',
    'awaiting_info',
    'in_design',
    'preview_sent',
    'revision',
    'awaiting_approval',
    'completed',
  ];

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    } else {
      // Default to first order for instant preview demo
      const firstOrder = studioApi.getOrders()[0];
      if (firstOrder) {
        setOrder(firstOrder);
        setSearchQuery(firstOrder.id);
        setHasSearched(true);
      }
    }
  }, [initialOrderId]);

  const handleSearch = (queryToSearch?: string) => {
    const q = (queryToSearch || searchQuery).trim();
    if (!q) {
      setErrorMessage('لطفاً کد رهگیری سفارش یا شماره تماس خود را وارد کنید.');
      return;
    }

    setErrorMessage('');
    const foundOrder = studioApi.getOrderById(q);
    setHasSearched(true);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setOrder(null);
    }
  };

  const currentStatusInfo = order ? ORDER_STATUS_MAP[order.status] || ORDER_STATUS_MAP.submitted : null;
  const currentStepIndex = order ? statusOrder.indexOf(order.status) : 0;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-teal-900/60">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <button onClick={onBackToHome} className="hover:text-amber-300">
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">سامانه پیگیری آنلاین سفارشات</span>
          </div>

          <button
            onClick={onNewOrder}
            className="text-xs text-amber-300 hover:underline flex items-center gap-1 font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ثبت سفارش جدید</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <Badge variant="teal" size="md">
            پیگیری لحظه‌ای و شفاف
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            پیگیری وضعیت سفارش در استودیو آرکا
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            کد رهگیری اختصاصی (مثال: ARKA-2026-00001) یا شماره تماس خود را وارد نمایید.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-[#092224] p-4 sm:p-6 rounded-3xl border border-amber-500/30 shadow-2xl mb-10 max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-teal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="کد پیگیری (مثال: ARKA-2026-00001) یا شماره موبایل"
                className="w-full bg-[#061718] border border-teal-800 rounded-2xl pr-10 pl-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono text-center sm:text-right"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl font-bold text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-lg text-sm transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>استعلام وضعیت</span>
            </button>
          </form>

          {errorMessage && (
            <p className="text-xs text-rose-400 mt-3 text-right flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errorMessage}
            </p>
          )}

          {/* Quick Demo links */}
          <div className="pt-4 mt-4 border-t border-teal-900/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>کدهای نمونه جهت تست:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('ARKA-2026-00001');
                  handleSearch('ARKA-2026-00001');
                }}
                className="font-mono text-teal-300 hover:text-amber-300 underline"
              >
                ARKA-2026-00001
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('ARKA-2026-00002');
                  handleSearch('ARKA-2026-00002');
                }}
                className="font-mono text-teal-300 hover:text-amber-300 underline"
              >
                ARKA-2026-00002
              </button>
            </div>
          </div>
        </div>

        {/* Order Details Result */}
        {order && currentStatusInfo && (
          <div className="space-y-8 animate-fadeIn text-right">
            {/* Status Summary Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-[#0d373a] via-[#092224] to-[#0d373a] border-2 border-teal-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                      {order.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentStatusInfo.badgeColor}`}>
                      {currentStatusInfo.label}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    پروژه: {order.projectType}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {currentStatusInfo.description}
                  </p>
                </div>

                {/* Progress Circle / Badge */}
                <div className="flex items-center gap-4 bg-[#051516] p-4 rounded-2xl border border-teal-800 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">میزان پیشرفت کلی:</div>
                    <div className="text-xl font-black text-amber-300 font-mono">
                      {order.stageProgress}%
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-teal-800 border-t-amber-400 flex items-center justify-center text-xs font-bold text-teal-200">
                    {currentStatusInfo.stepNumber}/8
                  </div>
                </div>
              </div>

              {/* Progress bar line */}
              <div className="mt-6 w-full bg-[#051516] h-2 rounded-full overflow-hidden border border-teal-900">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${order.stageProgress}%` }}
                />
              </div>
            </div>

            {/* 8-Stage Visual Timeline */}
            <div className="bg-[#092224] p-6 sm:p-8 rounded-3xl border border-teal-800/80 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-r-2 border-amber-400 pr-2">
                مراحل اجرای پروژه (۸ مرحله استاندارد)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {statusOrder.map((statusKey, idx) => {
                  const sInfo = ORDER_STATUS_MAP[statusKey];
                  const isPassed = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={statusKey}
                      className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between min-h-[90px] ${
                        isCurrent
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md ring-2 ring-amber-400/30'
                          : isPassed
                          ? 'bg-teal-950/80 border-teal-700 text-teal-300'
                          : 'bg-[#061718] border-teal-900/60 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold">۰{idx + 1}</span>
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </div>
                      <span className="text-xs font-bold leading-tight line-clamp-2">
                        {sInfo.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Two-Column Grid: Specifications & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Order Brief Specs (7 cols) */}
              <div className="md:col-span-7 bg-[#092224] p-6 rounded-3xl border border-teal-800/80 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-amber-400 pr-2">
                  مشخصات و بریف ثبت‌شده
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#061718] p-3 rounded-xl border border-teal-900">
                    <span className="text-slate-400 block mb-1">سفارش‌دهنده:</span>
                    <span className="font-bold text-white">{order.customerName}</span>
                  </div>
                  <div className="bg-[#061718] p-3 rounded-xl border border-teal-900">
                    <span className="text-slate-400 block mb-1">شماره تماس:</span>
                    <span className="font-mono text-teal-300">{order.phone}</span>
                  </div>
                  <div className="bg-[#061718] p-3 rounded-xl border border-teal-900">
                    <span className="text-slate-400 block mb-1">پیام‌رسان:</span>
                    <span className="font-mono text-amber-300">{order.messengerHandle}</span>
                  </div>
                  <div className="bg-[#061718] p-3 rounded-xl border border-teal-900">
                    <span className="text-slate-400 block mb-1">هدف پروژه:</span>
                    <span className="font-bold text-white">{order.projectGoal}</span>
                  </div>
                </div>

                <div className="bg-[#061718] p-3.5 rounded-xl border border-teal-900 text-xs space-y-1.5">
                  <span className="text-slate-400 block">شرح نیازمندی و توضیحات:</span>
                  <p className="text-slate-200 leading-relaxed">{order.description}</p>
                </div>

                {/* Status log notes from admin */}
                {order.adminNotes && order.adminNotes.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-teal-900/60">
                    <span className="text-xs font-bold text-amber-300 block">
                      یادداشت‌ها و گزارش پیشرفت استودیو:
                    </span>
                    <div className="space-y-1.5">
                      {order.adminNotes.map((note, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-800 text-xs text-slate-200"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Deliverable Files & Direct Contact (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                {/* Deliverable Files Box */}
                <div className="bg-[#092224] p-6 rounded-3xl border border-teal-800/80 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-emerald-400 pr-2">
                    فایل‌های نهایی و پیش‌نمایش
                  </h3>

                  {order.deliverableFiles && order.deliverableFiles.length > 0 ? (
                    <div className="space-y-2.5">
                      {order.deliverableFiles.map((file) => (
                        <div
                          key={file.id}
                          className="p-3.5 rounded-2xl bg-[#061718] border border-teal-800 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                            <div className="truncate">
                              <span className="font-bold text-white block truncate">{file.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                فرمت {file.format} • {file.fileSize}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => alert(`دانلود فایل: ${file.title}`)}
                            className="px-3 py-1.5 rounded-lg bg-teal-900 text-teal-200 hover:bg-amber-400 hover:text-teal-950 font-bold transition-all flex items-center gap-1 shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>دانلود</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-[#061718] rounded-2xl border border-teal-900 text-xs text-slate-400 space-y-2">
                      <Clock className="w-6 h-6 text-teal-500 mx-auto" />
                      <p>طرح در حال انجام است؛ فایل‌های پیش‌نمایش به زودی در این قسمت قرار می‌گیرند.</p>
                    </div>
                  )}
                </div>

                {/* Direct Support Messenger Card */}
                <div className="bg-gradient-to-br from-[#0c2f30] to-[#07191a] p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-3 text-right">
                  <span className="text-xs font-bold text-amber-300 block">نیاز به ارتباط یا ارسال اصلاحات دارید؟</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    می‌توانید مستقیماً با مدیریت هنری آرکا در ارتباط باشید.
                  </p>

                  <a
                    href={`https://ble.ir/Arakaadmin`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-teal-950 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ارتباط مستقیم در بله / تلگرام (@Arakaadmin)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {hasSearched && !order && (
          <div className="text-center py-16 bg-[#092224] rounded-3xl border border-teal-800 p-8 space-y-4 max-w-xl mx-auto">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">سفارشی با این شناسه یافت نشد</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              لطفاً از صحت کد وارد شده اطمینان حاصل کنید، یا شماره تماس ثبت شده در هنگام سفارش را وارد نمایید.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNewOrder}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-teal-950 hover:bg-amber-300"
              >
                ثبت سفارش جدید
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
