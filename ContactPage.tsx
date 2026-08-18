import React, { useState } from 'react';
import { studioApi } from '../services/api';
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

interface ContactPageProps {
  onBackToHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('لطفاً نام، شماره تماس و پیام خود را وارد نمایید.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      try {
        studioApi.sendMessage({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          subject: subject.trim() || 'پیام عمومی از سایت',
          message: message.trim(),
        });
        setIsSending(false);
        setIsSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
      } catch (err) {
        setIsSending(false);
        setErrorMessage('خطا در ارسال پیام. لطفاً با @Arakaadmin مستقیماً ارتباط برقرار کنید.');
      }
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-teal-900/60">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <button onClick={onBackToHome} className="hover:text-amber-300">
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">تماس با مجموعه گرافیک آرکا</span>
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="gold" size="lg">
            پاسخگویی سریع و مستقیم
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            راه‌های ارتباط با استودیو آرکا
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            برای مشاوره تخصصی، استعلام هزینه پروژه‌ها یا پیگیری سفارش، با آیدی ارتباطی <span className="text-amber-300 font-bold font-mono">@Arakaadmin</span> یا فرم زیر در ارتباط باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-right">
            {/* Main Direct Admin Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0c2f30] via-[#092224] to-[#071a1c] border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">مدیر هنری و ارتباط مستقیم</h3>
                  <span className="font-mono text-xs text-teal-300">ARKA DIRECT SUPPORT</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                سریع‌ترین راه دریافت پاسخ، ارسال پیام مستقیم به آیدی مدیریت استودیو در پیام‌رسان‌هاست:
              </p>

              <div className="bg-[#051415] p-4 rounded-2xl border border-teal-800 flex items-center justify-between">
                <span className="font-mono text-base sm:text-lg font-bold text-amber-300">@Arakaadmin</span>
                <a
                  href="https://ble.ir/Arakaadmin"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-xl bg-amber-400 text-teal-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>ارسال پیام</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <a
                  href="https://ble.ir/Arakaadmin"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-teal-950 hover:bg-teal-900 border border-teal-700 text-xs text-center text-teal-200 font-bold transition-colors"
                >
                  پیام‌رسان بله
                </a>
                <a
                  href="https://t.me/Arakaadmin"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-teal-950 hover:bg-teal-900 border border-teal-700 text-xs text-center text-sky-400 font-bold transition-colors"
                >
                  تلگرام
                </a>
                <a
                  href="https://eitaa.com/Arakaadmin"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-teal-950 hover:bg-teal-900 border border-teal-700 text-xs text-center text-orange-400 font-bold transition-colors"
                >
                  ایتا
                </a>
              </div>
            </div>

            {/* Studio Info Details */}
            <div className="rounded-3xl bg-[#092224] border border-teal-800/80 p-6 space-y-4">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">ساعات کاری استودیو:</span>
                  <span className="text-slate-300 text-xs">شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰ | پنج‌شنبه‌ها: ۹:۰۰ الی ۱۴:۰۰</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">پست الکترونیک رسمی:</span>
                  <span className="text-slate-300 font-mono text-xs">info@arkagraphic.ir</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">نشانی دفتر مرکزی:</span>
                  <span className="text-slate-300 text-xs">تهران، بلوار میرداماد، برج آرین، طبقه ۵، استودیو دیزاین آرکا</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right / Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#092224] border border-teal-800/80 p-6 sm:p-10 shadow-2xl text-right">
            <h3 className="text-xl font-bold text-white mb-2">ارسال پیام یا درخواست مشاوره</h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              پیام شما مستقیماً در کارتابل مدیریت هنری آرکا ثبت و در کوتاه‌ترین زمان پاسخ داده خواهد شد.
            </p>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/20 border border-rose-400 text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نام و نام خانوادگی <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام شما"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    شماره تماس / پیام‌رسان <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912..."
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    موضوع پیام
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="مثال: درخواست جلسه مشاوره برندبوک"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    ایمیل (اختیاری)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  متن پیام یا توضیحات پروژه <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="شرح پروژه یا سؤال خود را اینجا بنویسید..."
                  className="w-full bg-[#061718] border border-teal-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSending ? (
                  <span>در حال ارسال پیام...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال پیام به استودیو آرکا</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
