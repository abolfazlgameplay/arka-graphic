import React, { useState } from 'react';
import { Order, UploadedFileMeta } from '../types';
import { studioApi } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  UploadCloud,
  File,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  User,
  Phone,
  MessageSquare,
  Mail,
  Palette,
  Layers,
  Calendar,
  Eye,
  Send
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

interface OrderPageProps {
  initialProjectType?: string;
  onOrderSuccess: (orderId: string) => void;
  onBackToHome: () => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  initialProjectType = '',
  onOrderSuccess,
  onBackToHome,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [messengerType, setMessengerType] = useState<'bale' | 'telegram' | 'eitaa' | 'whatsapp' | 'other'>('bale');
  const [messengerHandle, setMessengerHandle] = useState('');
  const [email, setEmail] = useState('');

  const [projectType, setProjectType] = useState(initialProjectType || 'طراحی لوگو');
  const [projectTypeCustom, setProjectTypeCustom] = useState('');

  const [projectGoal, setProjectGoal] = useState('معرفی برند');
  const [projectGoalCustom, setProjectGoalCustom] = useState('');

  const [platforms, setPlatforms] = useState<string[]>(['Instagram']);
  const [platformCustom, setPlatformCustom] = useState('');

  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  const [brandColors, setBrandColors] = useState('');
  const [designStyle, setDesignStyle] = useState('مینیمال و مدرن');
  const [deliveryDeadline, setDeliveryDeadline] = useState('');
  const [hasLogo, setHasLogo] = useState<boolean>(false);
  const [hasReferenceFiles, setHasReferenceFiles] = useState<boolean>(false);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileMeta[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Completion State
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [formError, setFormError] = useState('');

  // Project Types Options
  const projectTypeOptions = [
    { id: 'لوگو', title: 'طراحی لوگو و نشانه', icon: '✨' },
    { id: 'پوستر', title: 'طراحی پوستر', icon: '🖼️' },
    { id: 'Flyer', title: 'طراحی فلایر و تراکت', icon: '📄' },
    { id: 'بنر سایت', title: 'طراحی بنر وب‌سایت', icon: '💻' },
    { id: 'بنر چاپی', title: 'بنر چاپی و بیلبورد', icon: '🏢' },
    { id: 'کارت ویزیت', title: 'طراحی کارت ویزیت و ست اداری', icon: '💳' },
    { id: 'پست اینستاگرام', title: 'طراحی پست اینستاگرام', icon: '📱' },
    { id: 'استوری', title: 'طراحی استوری اینستاگرام', icon: '⚡' },
    { id: 'Thumbnail', title: 'طراحی کاور و Thumbnail', icon: '🎬' },
    { id: 'طراحی محصول', title: 'طراحی بسته‌بندی و محصول', icon: '📦' },
    { id: 'تدوین', title: 'تدوین و ویرایش ویدئو', icon: '🎥' },
    { id: 'سایر', title: 'سایر خدمات اختصاصی', icon: '🎨' },
  ];

  // Project Goals Options
  const goalOptions = [
    'فروش محصول و خدمت',
    'معرفی محصول جدید',
    'معرفی و آگاهی از برند',
    'اطلاع‌رسانی و رویداد',
    'افتتاحیه و آغاز به کار',
    'جشنواره و تخفیف ویژه',
    'جذب مشتری و لید',
    'سایر موارد',
  ];

  // Publishing Platforms
  const platformOptions = [
    { id: 'Instagram', label: 'اینستاگرام (Instagram)' },
    { id: 'Website', label: 'وب‌سایت (Website)' },
    { id: 'Print', label: 'چاپ فیزیکی (Print)' },
    { id: 'Billboard', label: 'بیلبورد و محیطی (Billboard)' },
    { id: 'Telegram', label: 'تلگرام (Telegram)' },
    { id: 'WhatsApp', label: 'واتساپ (WhatsApp)' },
    { id: 'Bale', label: 'پیام‌رسان بله (Bale)' },
    { id: 'Other', label: 'سایر بسترهای انتشار' },
  ];

  const designStyles = [
    'مینیمال و مدرن',
    'لوکس، سلطنتی و متالیک',
    'کلاسیک و سنتی',
    'پرانرژی، شاد و رنگی',
    'تاریک (Dark Mode) و نئونی',
    'رسمی و سازمانی (Corporate)',
  ];

  // Toggle platform selection
  const togglePlatform = (p: string) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((item) => item !== p));
      }
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  // Mock File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);

    const filesArray = Array.from(e.target.files) as File[];
    setTimeout(() => {
      const newFilesMeta: UploadedFileMeta[] = filesArray.map((file: File) => ({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
      }));

      setUploadedFiles((prev) => [...prev, ...newFilesMeta]);
      setHasReferenceFiles(true);
      setIsUploading(false);
    }, 600);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Step Validation
  const validateCurrentStep = (): boolean => {
    setFormError('');

    if (currentStep === 1) {
      if (!customerName.trim()) {
        setFormError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
        return false;
      }
      if (!phone.trim() || phone.length < 10) {
        setFormError('لطفاً یک شماره تماس معتبر (حداقل ۱۰ رقم) وارد کنید.');
        return false;
      }
      if (!messengerHandle.trim()) {
        setFormError('لطفاً آیدی پیام‌رسان خود را جهت هماهنگی و ارسال پیش‌نمایش وارد کنید.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!projectType) {
        setFormError('لطفاً نوع پروژه مورد نظر خود را انتخاب کنید.');
        return false;
      }
    } else if (currentStep === 5) {
      if (!description.trim()) {
        setFormError('لطفاً توضیح مختصری از نیازمندی‌ها، شعار یا متون پروژه بنویسید.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setFormError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Submit Order
  const handleSubmitOrder = () => {
    setIsSubmitting(true);
    setFormError('');

    const finalProjectType = projectType === 'سایر' && projectTypeCustom ? projectTypeCustom : projectType;
    const finalGoal = projectGoal === 'سایر موارد' && projectGoalCustom ? projectGoalCustom : projectGoal;
    const finalPlatforms = platforms.join(', ');

    // Estimate price range placeholder
    let priceEstimate = 'بررسی پس از تایید بریف';
    if (projectType.includes('لوگو')) priceEstimate = '۱,۰۰۰,۰۰۰ تا ۱۵,۰۰۰,۰۰۰ تومان';
    else if (projectType.includes('بنر')) priceEstimate = '۷۰۰,۰۰۰ تا ۲,۰۰۰,۰۰۰ تومان';
    else if (projectType.includes('پوستر')) priceEstimate = '۷۰۰,۰۰۰ تا ۲,۰۰۰,۰۰۰ تومان';
    else if (projectType.includes('کارت')) priceEstimate = '۶۰۰,۰۰۰ تا ۵,۰۰۰,۰۰۰ تومان';
    else if (projectType.includes('Thumbnail')) priceEstimate = '۵۰,۰۰۰ تا ۲۰۰,۰۰۰ تومان';

    setTimeout(() => {
      try {
        const createdOrder = studioApi.createOrder({
          customerName: customerName.trim(),
          phone: phone.trim(),
          messengerHandle: messengerHandle.trim(),
          messengerType,
          email: email.trim() || undefined,
          projectType: finalProjectType,
          projectGoal: finalGoal,
          platform: finalPlatforms,
          dimensions: dimensions.trim() || 'استاندارد',
          description: description.trim(),
          brandColors: brandColors.trim() || 'به انتخاب طراح آرکا',
          designStyle,
          deliveryDeadline: deliveryDeadline.trim() || 'طبق زمان‌بندی استاندارد استودیو',
          hasLogo,
          hasReferenceFiles: hasReferenceFiles || uploadedFiles.length > 0,
          uploadedFiles,
          estimatedPrice: priceEstimate,
        });

        setSubmittedOrder(createdOrder);
        setIsSubmitting(false);

        // Confetti celebration
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#14b8a6', '#fde047', '#ffffff'],
          });
        } catch {
          // ignore if canvas confetti fails
        }
      } catch (err) {
        setIsSubmitting(false);
        setFormError('خطایی در ثبت سفارش رخ داد. لطفاً مجدداً تلاش کنید.');
      }
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  // If Order is successfully submitted, show success view
  if (submittedOrder) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#0e3639] to-[#071a1c] border-2 border-amber-400 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />

            {/* Success Icon */}
            <div className="w-20 h-20 rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-300 shadow-xl shadow-amber-500/20 animate-bounce-slow">
              <CheckCircle2 className="w-10 h-10 text-amber-400" />
            </div>

            <Badge variant="gold" size="lg">
              سفارش شما با موفقیت در آرکا ثبت شد
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              از اعتماد شما به مجموعه گرافیک آرکا سپاسگزاریم
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              اطلاعات پروژه شما با موفقیت برای تیم طراحی ارسال شد. کارشناسان هنری ما پس از بررسی نیازمندی‌ها، جهت هماهنگی و اعلام زمان دقیق با شما ارتباط خواهند گرفت.
            </p>

            {/* Tracking ID Card */}
            <div className="bg-[#051415] border border-amber-500/40 rounded-2xl p-6 max-w-md mx-auto space-y-3">
              <span className="text-xs text-slate-400 block font-medium">
                کد پیگیری اختصاصی سفارش شما:
              </span>
              <div className="flex items-center justify-between bg-[#092224] p-3 rounded-xl border border-teal-800">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                  {submittedOrder.id}
                </span>
                <button
                  onClick={() => copyToClipboard(submittedOrder.id)}
                  className="px-3 py-1.5 rounded-lg bg-teal-900 text-teal-200 hover:bg-amber-400 hover:text-teal-950 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId ? 'کپی شد!' : 'کپی کد'}</span>
                </button>
              </div>
              <p className="text-[11px] text-teal-400/80">
                این کد را ذخیره کنید؛ در هر زمان می‌توانید وضعیت طراحی و پیش‌نمایش فایل‌ها را با آن مشاهده نمایید.
              </p>
            </div>

            {/* Quick Summary list */}
            <div className="bg-teal-950/40 p-4 rounded-xl border border-teal-900 text-right text-xs text-slate-300 max-w-md mx-auto space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">سفارش‌دهنده:</span>
                <span className="font-bold text-white">{submittedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">خدمت درخواستی:</span>
                <span className="font-bold text-amber-300">{submittedOrder.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">پیام‌رسان هماهنگی:</span>
                <span className="font-mono text-teal-300">{submittedOrder.messengerHandle} ({submittedOrder.messengerType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">وضعیت اولیه:</span>
                <span className="text-emerald-400 font-bold">ثبت شده در سامانه</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                onClick={() => onOrderSuccess(submittedOrder.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-black text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-lg text-sm flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>مشاهده وضعیت در پنل پیگیری</span>
              </button>

              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-slate-300 bg-teal-950 border border-teal-800 hover:text-white text-sm"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-teal-900/60">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <button onClick={onBackToHome} className="hover:text-amber-300">
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">سامانه هوشمند ثبت سفارش پروژه</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-teal-300 hover:text-amber-300 flex items-center gap-1"
          >
            <span>انصراف و بازگشت</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-[#092224] border border-amber-500/30 p-6 sm:p-10 shadow-2xl text-right relative overflow-hidden">
          {/* Form Step Progress Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  مرحله {currentStep} از {totalSteps + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {currentStep === 1 && 'مرحله ۱: اطلاعات تماس و هماهنگی کارفرما'}
                  {currentStep === 2 && 'مرحله ۲: انتخاب نوع پروژه و خدمت'}
                  {currentStep === 3 && 'مرحله ۳: هدف و رویکرد بازاریابی پروژه'}
                  {currentStep === 4 && 'مرحله ۴: بستر و محل انتشار طرح'}
                  {currentStep === 5 && 'مرحله ۵: مشخصات، سبک بصری و رنگ‌بندی'}
                  {currentStep === 6 && 'مرحله ۶: پیوست فایل‌ها و نمونه‌های مرتبط'}
                  {currentStep === 7 && 'مرحله نهایی: بازبینی خلاصه و تأیید نهایی سفارش'}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-700 flex items-center justify-center text-amber-300 font-bold text-sm">
                {Math.round((currentStep / (totalSteps + 1)) * 100)}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#061516] h-2.5 rounded-full overflow-hidden border border-teal-900">
              <div
                className="h-full bg-gradient-to-r from-teal-500 via-amber-400 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / (totalSteps + 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Validation Error Banner */}
          {formError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Step 1: Customer Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    نام و نام خانوادگی / نام سازمان <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: رضا صادقی / شرکت نوآوران"
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    شماره تماس مستقیم <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="مثال: 09121234567"
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    پیام‌رسان ترجیحی جهت ارتباط و ارسال اتودها <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={messengerType}
                    onChange={(e) => setMessengerType(e.target.value as any)}
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="bale">پیام‌رسان بله (Bale)</option>
                    <option value="telegram">تلگرام (Telegram)</option>
                    <option value="eitaa">ایتا (Eitaa)</option>
                    <option value="whatsapp">واتساپ (WhatsApp)</option>
                    <option value="other">سایر</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    آیدی یا شماره در پیام‌رسان <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={messengerHandle}
                      onChange={(e) => setMessengerHandle(e.target.value)}
                      placeholder="مثال: @username یا شماره تماس"
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  آدرس ایمیل (اختیاری)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Type */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-xs sm:text-sm text-slate-300">
                نوع خدمتی که مایلید تیم طراحان آرکا برای شما اجرا کنند را انتخاب کنید:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {projectTypeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProjectType(opt.id)}
                    className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between min-h-[95px] ${
                      projectType === opt.id
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold shadow-lg shadow-amber-400/10'
                        : 'bg-[#061718] border-teal-800/80 text-slate-300 hover:border-teal-600 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-xs sm:text-sm mt-2">{opt.title}</span>
                  </button>
                ))}
              </div>

              {projectType === 'سایر' && (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-amber-300 mb-2">
                    لطفاً نام یا نوع خدمت مد نظر خود را بنویسید:
                  </label>
                  <input
                    type="text"
                    value={projectTypeCustom}
                    onChange={(e) => setProjectTypeCustom(e.target.value)}
                    placeholder="مثال: طراحی کاتالوگ ۱۶ صفحه‌ای / طراحی جعبه هدیه"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Project Goal */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-xs sm:text-sm text-slate-300">
                هدف اصلی از اجرای این طرح گرافیکی چیست تا بر اساس آن روانشناسی بصری و ترکیب‌بندی انتخاب شود؟
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goalOptions.map((goal, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProjectGoal(goal)}
                    className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between text-xs sm:text-sm ${
                      projectGoal === goal
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#061718] border-teal-800/80 text-slate-300 hover:border-teal-600 hover:text-white'
                    }`}
                  >
                    <span>{goal}</span>
                    {projectGoal === goal && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}
              </div>

              {projectGoal === 'سایر موارد' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={projectGoalCustom}
                    onChange={(e) => setProjectGoalCustom(e.target.value)}
                    placeholder="توضیح هدف پروژه شما..."
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Publishing Channels */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-xs sm:text-sm text-slate-300">
                این طرح قرار است در چه بسترها یا فضاهایی منتشر شود؟ (می‌توانید چند مورد را همزمان انتخاب کنید):
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {platformOptions.map((item) => {
                  const isSelected = platforms.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePlatform(item.id)}
                      className={`p-4 rounded-xl border text-right transition-all text-xs font-medium flex items-center justify-between ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold'
                          : 'bg-[#061718] border-teal-800/80 text-slate-300 hover:border-teal-600 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-teal-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {platforms.includes('Other') && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={platformCustom}
                    onChange={(e) => setPlatformCustom(e.target.value)}
                    placeholder="نام بستر مورد نظر (مثال: نمایشگر همایش، اپ استور...)"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 5: Specifications */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  توضیحات کامل پروژه، عنوان، متون و ایده‌های مد نظر <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="لطفاً عنوان اصلی، متون مورد نظر برای درج روی طرح، ویژگی‌های کلیدی محصول، پیام اصلی یا هر نکته مهمی که طراح باید بداند را شرح دهید..."
                  className="w-full bg-[#061718] border border-teal-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    ابعاد یا سایز مورد نیاز (در صورت مشخص بودن)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="مثال: 1080x1080 یا A4 چاپی یا 8.5x4.8 سانتی‌متر"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    رنگ‌های سازمانی یا مورد علاقه شما
                  </label>
                  <input
                    type="text"
                    value={brandColors}
                    onChange={(e) => setBrandColors(e.target.value)}
                    placeholder="مثال: سرمه‌ای، طلایی، سبز تیره یا کدهای هگز"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    سبک و اتمسفر بصری مد نظر
                  </label>
                  <select
                    value={designStyle}
                    onChange={(e) => setDesignStyle(e.target.value)}
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {designStyles.map((st, i) => (
                      <option key={i} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    تاریخ مورد انتظار برای تحویل اتود
                  </label>
                  <input
                    type="text"
                    value={deliveryDeadline}
                    onChange={(e) => setDeliveryDeadline(e.target.value)}
                    placeholder="مثال: تا ۵ روز آینده / فوری"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Yes/No Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#061718] p-4 rounded-xl border border-teal-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">آیا لوگوی آماده دارید؟</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasLogo(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        hasLogo ? 'bg-amber-400 text-teal-950' : 'bg-teal-950 text-slate-400'
                      }`}
                    >
                      بله
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasLogo(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        !hasLogo ? 'bg-teal-800 text-white' : 'bg-teal-950 text-slate-400'
                      }`}
                    >
                      خیر
                    </button>
                  </div>
                </div>

                <div className="bg-[#061718] p-4 rounded-xl border border-teal-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">آیا نمونه مرجع یا اتود اولیه دارید؟</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasReferenceFiles(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        hasReferenceFiles ? 'bg-amber-400 text-teal-950' : 'bg-teal-950 text-slate-400'
                      }`}
                    >
                      بله
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasReferenceFiles(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        !hasReferenceFiles ? 'bg-teal-800 text-white' : 'bg-teal-950 text-slate-400'
                      }`}
                    >
                      خیر
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: File Uploads */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-xs sm:text-sm text-slate-300">
                در صورت وجود فایل لوگو، عکس‌های باکیفیت محصول، نمونه‌کارهای مورد علاقه (Moodboard) یا اسناد متنی PDF را پیوست کنید:
              </p>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-teal-700/80 hover:border-amber-400/80 rounded-2xl p-8 text-center bg-[#061718]/80 transition-all">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*,.pdf,.ai,.psd,.zip,.rar,.doc,.docx"
                />
                <div className="space-y-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-teal-950 border border-teal-700 flex items-center justify-center mx-auto text-amber-300">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div className="text-sm font-bold text-white">
                    فایل‌ها را اینجا بکشید یا برای انتخاب فایل کلیک کنید
                  </div>
                  <p className="text-xs text-slate-400">
                    فرمت‌های مجاز: PNG, JPG, PDF, AI, PSD, ZIP (حداکثر ۵۰ مگابایت)
                  </p>
                </div>
              </div>

              {isUploading && (
                <div className="p-3 bg-teal-950 rounded-xl border border-teal-800 text-xs text-teal-300 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                  <span>در حال پردازش و آپلود فایل‌ها...</span>
                </div>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-teal-300 block">
                    فایل‌های پیوست شده ({uploadedFiles.length} فایل):
                  </span>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#061718] border border-teal-800 text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <File className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-slate-200 truncate font-mono">{file.name}</span>
                          <span className="text-slate-500 font-mono">({Math.round(file.size / 1024)} KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Final Summary Review & Confirm */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>لطفاً مشخصات زیر را بازبینی کنید و برای ثبت نهایی روی دکمه «ثبت نهایی سفارش» کلیک کنید.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#061718] p-4 rounded-xl border border-teal-800 space-y-2">
                  <span className="font-bold text-amber-400 block border-b border-teal-900 pb-1">اطلاعات کارفرما:</span>
                  <div>نام: <strong className="text-white">{customerName}</strong></div>
                  <div>شماره تماس: <strong className="text-white font-mono">{phone}</strong></div>
                  <div>پیام‌رسان: <strong className="text-teal-300 font-mono">{messengerHandle} ({messengerType})</strong></div>
                  {email && <div>ایمیل: <strong className="text-slate-300 font-mono">{email}</strong></div>}
                </div>

                <div className="bg-[#061718] p-4 rounded-xl border border-teal-800 space-y-2">
                  <span className="font-bold text-amber-400 block border-b border-teal-900 pb-1">مشخصات خدمت:</span>
                  <div>نوع پروژه: <strong className="text-white">{projectType === 'سایر' ? projectTypeCustom : projectType}</strong></div>
                  <div>هدف پروژه: <strong className="text-white">{projectGoal === 'سایر موارد' ? projectGoalCustom : projectGoal}</strong></div>
                  <div>محل انتشار: <strong className="text-teal-300">{platforms.join(', ')}</strong></div>
                  <div>سبک بصری: <strong className="text-slate-200">{designStyle}</strong></div>
                </div>
              </div>

              <div className="bg-[#061718] p-4 rounded-xl border border-teal-800 text-xs space-y-2">
                <span className="font-bold text-amber-400 block border-b border-teal-900 pb-1">شرح بریف پروژه:</span>
                <p className="text-slate-300 leading-relaxed">{description}</p>
                {brandColors && <div className="text-teal-300">رنگ‌های پیشنهادی: {brandColors}</div>}
                {dimensions && <div className="text-teal-300">ابعاد: {dimensions}</div>}
                {uploadedFiles.length > 0 && <div className="text-emerald-400">تعداد فایل‌های پیوست: {uploadedFiles.length} فایل</div>}
              </div>
            </div>
          )}

          {/* Navigation & Action Buttons */}
          <div className="pt-8 mt-8 border-t border-teal-900/80 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-teal-950 hover:bg-teal-900 border border-teal-800 flex items-center gap-1.5 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps + 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                <span>مرحله بعد</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl text-sm font-black text-teal-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-teal-950 border-t-transparent animate-spin" />
                    <span>در حال صدور سفارش...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>ثبت نهایی سفارش و دریافت کد رهگیری</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
