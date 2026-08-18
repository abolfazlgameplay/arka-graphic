import React, { useState } from 'react';
import {
  Order,
  OrderStatus,
  Service,
  PortfolioItem,
  PricingPlan,
  Review,
  ContactMessage,
  StudioSettings,
  AdminUser,
  AdminRole
} from '../types';
import { studioApi } from '../services/api';
import { ORDER_STATUS_MAP } from '../data/initialData';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  DollarSign,
  Star,
  MessageSquare,
  Settings as SettingsIcon,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Download,
  Upload,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Eye,
  EyeOff,
  Send,
  Save,
  Shield,
  ShieldCheck,
  UserPlus,
  Key,
  Lock,
  LogOut,
  UserCheck,
  Phone,
  Mail,
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

interface AdminPageProps {
  onBackToSite: () => void;
}

type AdminTab =
  | 'dashboard'
  | 'orders'
  | 'customers'
  | 'projects'
  | 'portfolio'
  | 'services'
  | 'pricing'
  | 'reviews'
  | 'messages'
  | 'admins'
  | 'settings';

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  // Current Authenticated Admin Session
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => studioApi.getCurrentAdmin());

  // Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Data State
  const [orders, setOrders] = useState<Order[]>(() => studioApi.getOrders());
  const [services, setServices] = useState<Service[]>(() => studioApi.getServices());
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => studioApi.getPortfolio());
  const [pricing, setPricing] = useState<PricingPlan[]>(() => studioApi.getPricing());
  const [reviews, setReviews] = useState<Review[]>(() => studioApi.getReviews());
  const [messages, setMessages] = useState<ContactMessage[]>(() => studioApi.getMessages());
  const [settings, setSettings] = useState<StudioSettings>(() => studioApi.getSettings());
  const [adminsList, setAdminsList] = useState<AdminUser[]>(() => studioApi.getAdmins());

  // Selected Order for detail & status editing
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('submitted');
  const [newNote, setNewNote] = useState('');
  const [deliverableTitle, setDeliverableTitle] = useState('');
  const [deliverableFormat, setDeliverableFormat] = useState('ZIP');
  const [orderSearch, setOrderSearch] = useState('');

  // Portfolio modal
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortClient, setNewPortClient] = useState('');
  const [newPortCategory, setNewPortCategory] = useState<'logo' | 'banner' | 'poster' | 'social' | 'branding' | 'video' | 'other'>('logo');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortImage, setNewPortImage] = useState('https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80');

  // Admin Management Modals & Form States
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [adminFormName, setAdminFormName] = useState('');
  const [adminFormUsername, setAdminFormUsername] = useState('');
  const [adminFormPassword, setAdminFormPassword] = useState('');
  const [adminFormRole, setAdminFormRole] = useState<AdminRole>('designer');
  const [adminFormPhone, setAdminFormPhone] = useState('');
  const [adminFormEmail, setAdminFormEmail] = useState('');
  const [adminFormActive, setAdminFormActive] = useState(true);
  const [adminFormError, setAdminFormError] = useState<string | null>(null);
  const [adminFormSuccess, setAdminFormSuccess] = useState<string | null>(null);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Stats calculation
  const stats = studioApi.getDashboardStats();

  const refreshData = () => {
    setOrders(studioApi.getOrders());
    setServices(studioApi.getServices());
    setPortfolio(studioApi.getPortfolio());
    setPricing(studioApi.getPricing());
    setReviews(studioApi.getReviews());
    setMessages(studioApi.getMessages());
    setSettings(studioApi.getSettings());
    setAdminsList(studioApi.getAdmins());
    setCurrentAdmin(studioApi.getCurrentAdmin());
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    setTimeout(() => {
      const res = studioApi.loginAdmin(loginUsername, loginPassword);
      if (res.success && res.admin) {
        setCurrentAdmin(res.admin);
        setLoginUsername('');
        setLoginPassword('');
      } else {
        setLoginError(res.error || 'خطا در ورود به سامانه.');
      }
      setIsLoggingIn(false);
    }, 400);
  };

  // Quick fill credentials for demo convenience
  const handleQuickLogin = (u: string, p: string) => {
    setLoginUsername(u);
    setLoginPassword(p);
  };

  // Logout handler
  const handleLogout = () => {
    studioApi.logoutAdmin();
    setCurrentAdmin(null);
  };

  // Status Change Handler
  const handleUpdateOrderStatus = (orderId: string) => {
    const updated = studioApi.updateOrderStatus(orderId, newStatus, undefined, newNote);
    if (updated) {
      refreshData();
      setSelectedOrder(updated);
      setNewNote('');
    }
  };

  // Add Deliverable File Handler
  const handleAddDeliverable = (orderId: string) => {
    if (!deliverableTitle.trim()) return;
    const updated = studioApi.addDeliverableFile(orderId, {
      title: deliverableTitle.trim(),
      format: deliverableFormat,
      fileSize: '4.8 MB',
      downloadUrl: '#',
    });
    if (updated) {
      refreshData();
      setSelectedOrder(updated);
      setDeliverableTitle('');
    }
  };

  // Add Portfolio Handler
  const handleCreatePortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim() || !newPortClient.trim()) return;

    const catTitles: Record<string, string> = {
      logo: 'طراحی لوگو',
      banner: 'بنر تبلیغاتی',
      poster: 'پوستر',
      social: 'شبکه‌های اجتماعی',
      branding: 'هویت بصری',
      video: 'تدوین ویدئو',
      other: 'سایر',
    };

    studioApi.addPortfolioItem({
      title: newPortTitle.trim(),
      client: newPortClient.trim(),
      category: newPortCategory,
      categoryTitle: catTitles[newPortCategory] || 'طراحی',
      year: '۱۴۰۳',
      description: newPortDesc.trim() || 'پروژه طراحی اختصاصی اجرا شده توسط استودیو آرکا.',
      coverImage: newPortImage,
      tags: ['طراحی اختصاصی', 'آرکا'],
      features: ['طراحی برداری', 'پالت رنگی'],
      deliverables: ['فایل لایه‌باز'],
    });

    refreshData();
    setIsPortfolioModalOpen(false);
    setNewPortTitle('');
    setNewPortClient('');
    setNewPortDesc('');
  };

  // Open Create Admin Modal
  const handleOpenCreateAdminModal = () => {
    setEditingAdmin(null);
    setAdminFormName('');
    setAdminFormUsername('');
    setAdminFormPassword('');
    setAdminFormRole('designer');
    setAdminFormPhone('');
    setAdminFormEmail('');
    setAdminFormActive(true);
    setAdminFormError(null);
    setAdminFormSuccess(null);
    setIsAdminModalOpen(true);
  };

  // Open Edit Admin Modal
  const handleOpenEditAdminModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setAdminFormName(admin.fullName);
    setAdminFormUsername(admin.username);
    setAdminFormPassword(''); // leave blank if unchanged
    setAdminFormRole(admin.role);
    setAdminFormPhone(admin.phone || '');
    setAdminFormEmail(admin.email || '');
    setAdminFormActive(admin.isActive);
    setAdminFormError(null);
    setAdminFormSuccess(null);
    setIsAdminModalOpen(true);
  };

  // Generate strong random password
  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let generated = '';
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAdminFormPassword(generated);
  };

  // Save (Create or Update) Admin
  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminFormError(null);

    const roleTitles: Record<AdminRole, string> = {
      super_admin: 'مدیر ارشد و مدیر کل',
      designer: 'طراح ارشد گرافیک',
      manager: 'مدیر داخلی و هماهنگی پروژه‌ها',
      support: 'پشتیبان فنی و پاسخگویی',
    };

    if (!adminFormName.trim()) {
      setAdminFormError('لطفاً نام و نام خانوادگی را وارد کنید.');
      return;
    }

    if (!adminFormUsername.trim()) {
      setAdminFormError('لطفاً نام کاربری را وارد کنید.');
      return;
    }

    if (!editingAdmin && (!adminFormPassword || adminFormPassword.trim().length < 4)) {
      setAdminFormError('برای مدیر جدید وارد کردن رمز عبور (حداقل ۴ کاراکتر) الزامی است.');
      return;
    }

    if (editingAdmin) {
      // Update existing admin
      const updates: Partial<AdminUser> = {
        fullName: adminFormName.trim(),
        username: adminFormUsername.trim(),
        role: adminFormRole,
        roleTitle: roleTitles[adminFormRole],
        phone: adminFormPhone.trim(),
        email: adminFormEmail.trim(),
        isActive: adminFormActive,
      };

      if (adminFormPassword.trim()) {
        updates.password = adminFormPassword.trim();
      }

      const res = studioApi.updateAdmin(editingAdmin.id, updates);
      if (!res.success) {
        setAdminFormError(res.error || 'خطا در ویرایش اطلاعات مدیر.');
        return;
      }
      setAdminFormSuccess('اطلاعات مدیر با موفقیت به‌روزرسانی شد.');
    } else {
      // Create new admin
      const res = studioApi.createAdmin({
        fullName: adminFormName.trim(),
        username: adminFormUsername.trim(),
        password: adminFormPassword.trim(),
        role: adminFormRole,
        roleTitle: roleTitles[adminFormRole],
        phone: adminFormPhone.trim(),
        email: adminFormEmail.trim(),
        isActive: adminFormActive,
        avatar:
          adminFormRole === 'super_admin'
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        permissions: adminFormRole === 'super_admin' ? ['all'] : ['orders', 'portfolio', 'services'],
      });

      if (!res.success) {
        setAdminFormError(res.error || 'خطا در ایجاد مدیر جدید.');
        return;
      }
      setAdminFormSuccess('مدیر جدید با موفقیت ایجاد شد.');
    }

    refreshData();
    setTimeout(() => {
      setIsAdminModalOpen(false);
      setAdminFormSuccess(null);
    }, 900);
  };

  // Delete Admin
  const handleDeleteAdmin = (adminId: string, adminName: string) => {
    if (window.confirm(`آیا از حذف حساب کاربری مدیر "${adminName}" اطمینان دارید؟`)) {
      const res = studioApi.deleteAdmin(adminId);
      if (res.success) {
        refreshData();
      } else {
        alert(res.error || 'امکان حذف این کاربر وجود ندارد.');
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.projectType.toLowerCase().includes(q)
    );
  });

  // ==========================================
  // VIEW 1: ADMIN LOGIN SCREEN (IF NOT LOGGED IN)
  // ==========================================
  if (!currentAdmin) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-[#040e10] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-md w-full">
          {/* Main Login Card */}
          <div className="bg-[#081f21]/95 border border-teal-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Studio Emblem Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-teal-950 font-black text-2xl shadow-xl shadow-amber-500/20 mb-3 border border-amber-300">
                <Lock className="w-8 h-8 text-teal-950" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">ورود به پنل مدیریت آرکا</h2>
              <p className="text-xs text-slate-400 mt-1">
                برای دسترسی به سفارشات، مشتریان و تنظیمات لطفاً وارد شوید
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">نام کاربری (Username)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="مثال: admin"
                    required
                    dir="ltr"
                    className="w-full bg-[#040e10] border border-teal-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono transition-all"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                    @
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">کلمه عبور (Password)</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    dir="ltr"
                    className="w-full bg-[#040e10] border border-teal-800 rounded-2xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-teal-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>در حال اعتبارسنجی...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>ورود به پنل مدیریت</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials for Fast Testing */}
            <div className="mt-6 pt-5 border-t border-teal-900/60">
              <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
                <span>حساب‌های پیش‌فرض دمو (جهت تست سریع):</span>
                <span className="text-amber-400/80 text-[10px]">کلیک برای تکمیل فرم</span>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin', 'arka@admin1403')}
                  className="w-full text-right p-2.5 rounded-xl bg-teal-950/60 hover:bg-teal-900/60 border border-teal-800/80 text-xs text-slate-300 flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="font-bold text-amber-300 block">مدیر کل (Super Admin):</span>
                    <span className="font-mono text-[11px] text-slate-400">admin / arka@admin1403</span>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-500/30 group-hover:bg-amber-400 group-hover:text-teal-950 transition-colors">
                    انتخاب
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('designer_ali', 'ali@design123')}
                  className="w-full text-right p-2.5 rounded-xl bg-teal-950/60 hover:bg-teal-900/60 border border-teal-800/80 text-xs text-slate-300 flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="font-bold text-teal-300 block">طراح ارشد (Designer):</span>
                    <span className="font-mono text-[11px] text-slate-400">designer_ali / ali@design123</span>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 group-hover:bg-teal-400 group-hover:text-teal-950 transition-colors">
                    انتخاب
                  </span>
                </button>
              </div>
            </div>

            {/* Back to Public Site */}
            <div className="mt-5 text-center">
              <button
                onClick={onBackToSite}
                className="text-xs text-slate-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>بازگشت به وب‌سایت اصلی استودیو</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const navItems = [
    { id: 'dashboard', label: 'داشبورد کلی (Dashboard)', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'orders', label: 'مدیریت سفارش‌ها (Orders)', icon: <ShoppingBag className="w-4 h-4" />, count: orders.length },
    { id: 'customers', label: 'مشتریان (Customers)', icon: <Users className="w-4 h-4" />, count: stats.totalCustomers },
    { id: 'projects', label: 'پروژه‌های در حال اجرا (Projects)', icon: <Briefcase className="w-4 h-4" />, count: stats.inProgress },
    { id: 'portfolio', label: 'نمونه‌کارها (Portfolio)', icon: <Layers className="w-4 h-4" />, count: portfolio.length },
    { id: 'admins', label: 'مدیران و دسترسی‌ها (Admins)', icon: <ShieldCheck className="w-4 h-4" />, count: adminsList.length },
    { id: 'services', label: 'خدمات استودیو (Services)', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'pricing', label: 'مدیریت قیمت‌ها (Pricing)', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'reviews', label: 'نظرات مشتریان (Reviews)', icon: <Star className="w-4 h-4" /> },
    { id: 'messages', label: 'پیام‌ها و تیکت‌ها (Messages)', icon: <MessageSquare className="w-4 h-4" />, count: stats.unreadMessages },
    { id: 'settings', label: 'تنظیمات برند و ربات (Settings)', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#051415] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Topbar with Logged-in Profile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-teal-900/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-teal-950 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/20 border border-amber-300">
              AR
            </div>
            <div>
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                پنل مدیریت استودیو گرافیک آرکا
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-950 border border-teal-800 text-teal-300">
                  v2.8
                </span>
              </h1>
              <p className="text-xs text-slate-400">مدیریت سفارش‌ها، طراحان و مدیران، خروجی‌ها و تعرفه‌ها</p>
            </div>
          </div>

          {/* User profile & Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Admin User Badge */}
            <div className="flex items-center gap-2.5 bg-[#092224] border border-teal-800/80 px-3.5 py-1.5 rounded-2xl">
              <img
                src={currentAdmin.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={currentAdmin.fullName}
                className="w-7 h-7 rounded-full object-cover border border-amber-400"
              />
              <div className="text-right">
                <span className="text-xs font-bold text-white block leading-tight">{currentAdmin.fullName}</span>
                <span className="text-[10px] text-amber-300/90 font-medium">{currentAdmin.roleTitle}</span>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              title="خروج از حساب مدیریت"
              className="p-2.5 rounded-xl text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center gap-1.5 text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">خروج</span>
            </button>

            {/* Public site return */}
            <button
              onClick={onBackToSite}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-[#092224] hover:bg-teal-900 border border-teal-800 flex items-center gap-1.5 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>مشاهده سایت</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar & Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar Navigation (3 cols) */}
          <div className="lg:col-span-3 bg-[#092224] rounded-3xl border border-teal-800/80 p-4 space-y-1.5 shadow-xl">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              بخش‌های مدیریت:
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-right ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-teal-950 shadow-md shadow-amber-500/20 font-black'
                      : 'text-slate-300 hover:bg-teal-950/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label.split('(')[0]}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive ? 'bg-teal-950 text-amber-300' : 'bg-teal-950 text-teal-300 border border-teal-800'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Workspace (9 cols) */}
          <div className="lg:col-span-9 bg-[#092224] rounded-3xl border border-teal-800/80 p-6 sm:p-8 shadow-xl min-h-[600px]">
            {/* ---------------- 1. DASHBOARD OVERVIEW ---------------- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-teal-900 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">خلاصه وضعیت استودیو آرکا</h2>
                    <p className="text-xs text-slate-400 mt-0.5">آمار کلیدی پروژه‌ها و درآمد ماه جاری</p>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-500/20">
                    امروز: ۲۵ مرداد ۱۴۰۵
                  </span>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#061718] p-5 rounded-2xl border border-teal-800/80 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">سفارش‌های جدید</span>
                      <ShoppingBag className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-2xl font-black text-white">{stats.newOrders}</div>
                    <span className="text-[11px] text-blue-400 mt-1 block">نیاز به بررسی و تأیید</span>
                  </div>

                  <div className="bg-[#061718] p-5 rounded-2xl border border-teal-800/80 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">پروژه‌های در حال اجرا</span>
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-amber-300">{stats.inProgress}</div>
                    <span className="text-[11px] text-amber-400 mt-1 block">در صف طراحی / ویرایش</span>
                  </div>

                  <div className="bg-[#061718] p-5 rounded-2xl border border-teal-800/80 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">سفارش‌های تحویل شده</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-300">{stats.completed}</div>
                    <span className="text-[11px] text-emerald-400 mt-1 block">۱۰۰٪ رضایت مشتریان</span>
                  </div>

                  <div className="bg-[#061718] p-5 rounded-2xl border border-teal-800/80 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">تعداد مدیران و طراحان</span>
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-white">{adminsList.length} نفر</div>
                    <span className="text-[11px] text-teal-300 mt-1 block">با دسترسی امنیتی مجزا</span>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>آخرین سفارشات دریافتی</span>
                      <Badge variant="teal" size="sm">
                        {orders.length} کل
                      </Badge>
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>مشاهده همه</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="border-b border-teal-900 text-slate-400">
                          <th className="py-3 px-3">کد سفارش</th>
                          <th className="py-3 px-3">مشتری</th>
                          <th className="py-3 px-3">نوع پروژه</th>
                          <th className="py-3 px-3">وضعیت</th>
                          <th className="py-3 px-3">مبلغ</th>
                          <th className="py-3 px-3">عملیات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-teal-950">
                        {orders.slice(0, 4).map((order) => {
                          const statusInfo = ORDER_STATUS_MAP[order.status] || {
                            label: order.status,
                            badgeColor: 'bg-slate-800 text-slate-300',
                          };
                          return (
                            <tr key={order.id} className="hover:bg-teal-950/40 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-amber-300">{order.id}</td>
                              <td className="py-3 px-3">
                                <div className="font-bold text-white">{order.customerName}</div>
                                <div className="text-[10px] text-slate-400">{order.phone}</div>
                              </td>
                              <td className="py-3 px-3 text-slate-200">{order.projectType}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusInfo.badgeColor}`}>
                                  {statusInfo.label}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-200 font-mono">{order.estimatedPrice}</td>
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setNewStatus(order.status);
                                    setActiveTab('orders');
                                  }}
                                  className="px-3 py-1 rounded-lg bg-teal-900 hover:bg-teal-800 text-teal-200 text-[11px] font-bold"
                                >
                                  مدیریت
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- 2. ORDERS MANAGEMENT ---------------- */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-900 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">مدیریت سفارش‌ها</h2>
                    <p className="text-xs text-slate-400 mt-0.5">بررسی نیازمندی‌ها، تغییر وضعیت و بارگذاری فایل‌های نهایی</p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="جستجو با کد، نام، شماره..."
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Orders List & Selected Order Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Orders List */}
                  <div className={`${selectedOrder ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-3`}>
                    {filteredOrders.map((ord) => {
                      const isSelected = selectedOrder?.id === ord.id;
                      const statusInfo = ORDER_STATUS_MAP[ord.status] || {
                        label: ord.status,
                        badgeColor: 'bg-slate-800 text-slate-300',
                      };
                      return (
                        <div
                          key={ord.id}
                          onClick={() => {
                            setSelectedOrder(ord);
                            setNewStatus(ord.status);
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer text-right ${
                            isSelected
                              ? 'bg-teal-950 border-amber-400 shadow-lg shadow-amber-500/10'
                              : 'bg-[#061718] border-teal-800/80 hover:border-teal-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono font-bold text-amber-300 text-xs">{ord.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusInfo.badgeColor}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          <div className="font-bold text-white text-sm">{ord.customerName}</div>
                          <div className="text-xs text-slate-300 mt-1">{ord.projectType}</div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-teal-900/60">
                            <span>{ord.phone}</span>
                            <span>{ord.createdAt.split(' ')[0]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right: Selected Order Detail Editor */}
                  {selectedOrder && (
                    <div className="lg:col-span-7 bg-[#061718] border border-amber-400/40 rounded-3xl p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-teal-900 pb-3">
                        <div>
                          <span className="text-xs text-amber-400 font-mono font-bold block">{selectedOrder.id}</span>
                          <h3 className="text-lg font-bold text-white">{selectedOrder.customerName}</h3>
                        </div>
                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-teal-950 border border-teal-800"
                        >
                          بستن
                        </button>
                      </div>

                      {/* Order Info Specs */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#092224] p-3 rounded-xl border border-teal-800/80">
                          <span className="text-slate-400 block mb-1">شماره تماس / پیام‌رسان:</span>
                          <span className="text-white font-bold block font-mono">{selectedOrder.phone}</span>
                          <span className="text-teal-300 text-[11px] font-mono">{selectedOrder.messengerHandle}</span>
                        </div>
                        <div className="bg-[#092224] p-3 rounded-xl border border-teal-800/80">
                          <span className="text-slate-400 block mb-1">هدف و بستر انتشار:</span>
                          <span className="text-white font-bold block">{selectedOrder.projectGoal}</span>
                          <span className="text-amber-300 text-[11px]">{selectedOrder.platform}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-[#092224] p-4 rounded-xl border border-teal-800/80 text-xs">
                        <span className="text-slate-400 block mb-1 font-bold">توضیحات و نیازمندی‌های مشتری:</span>
                        <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{selectedOrder.description}</p>
                      </div>

                      {/* Status Update Control */}
                      <div className="p-4 rounded-2xl bg-teal-950/80 border border-teal-700/80 space-y-3">
                        <span className="text-xs font-bold text-amber-300 block">تغییر وضعیت مرحله سفارش:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                            className="bg-[#061718] border border-teal-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                          >
                            <option value="submitted">۱. ثبت شده (Submitted)</option>
                            <option value="under_review">۲. در حال بررسی (Under Review)</option>
                            <option value="awaiting_info">۳. در انتظار اطلاعات (Awaiting Info)</option>
                            <option value="in_design">۴. در حال طراحی (In Design)</option>
                            <option value="preview_sent">۵. پیش‌نمایش ارسال شد (Preview Sent)</option>
                            <option value="revision">۶. در انتظار اصلاح (Revision)</option>
                            <option value="awaiting_approval">۷. در انتظار تأیید (Awaiting Approval)</option>
                            <option value="completed">۸. تکمیل و تحویل شد (Completed)</option>
                          </select>

                          <button
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id)}
                            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold text-xs shadow-md transition-colors"
                          >
                            ثبت و اعلام وضعیت به مشتری
                          </button>
                        </div>

                        {/* Add Admin Note */}
                        <div className="pt-2">
                          <input
                            type="text"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="یادداشت جدید برای مشتری یا تیم..."
                            className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                          />
                        </div>
                      </div>

                      {/* Deliverables Upload Section */}
                      <div className="p-4 rounded-2xl bg-teal-950/80 border border-teal-700/80 space-y-3">
                        <span className="text-xs font-bold text-emerald-300 block">افزودن فایل تحویلی نهایی (Deliverable):</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={deliverableTitle}
                            onChange={(e) => setDeliverableTitle(e.target.value)}
                            placeholder="عنوان فایل (مثال: فایل لایه‌باز)"
                            className="sm:col-span-2 bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <select
                            value={deliverableFormat}
                            onChange={(e) => setDeliverableFormat(e.target.value)}
                            className="bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                          >
                            <option value="ZIP">ZIP</option>
                            <option value="AI">AI (Illustrator)</option>
                            <option value="PSD">PSD (Photoshop)</option>
                            <option value="PDF">PDF Print</option>
                            <option value="PNG">PNG HQ</option>
                          </select>
                        </div>
                        <button
                          onClick={() => handleAddDeliverable(selectedOrder.id)}
                          className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-teal-950 font-bold text-xs shadow-md"
                        >
                          ثبت فایل خروجی در پنل مشتری
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------- 3. ADMINS & ACCESS MANAGEMENT (NEW TAB!) ---------------- */}
            {activeTab === 'admins' && (
              <div className="space-y-6">
                {/* Header & Add Admin Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-900 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <span>مدیریت مدیران و سطوح دسترسی</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      تعریف حساب کاربری جدید، تنظیم کلمه عبور اختصاصی، و مدیریت نقش‌های تیم استودیو آرکا
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCreateAdminModal}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-teal-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>افزودن مدیر / طراح جدید</span>
                  </button>
                </div>

                {/* Admins Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adminsList.map((admin) => {
                    const isSelf = currentAdmin.id === admin.id;
                    const roleBadges: Record<AdminRole, { label: string; color: string }> = {
                      super_admin: { label: 'مدیر ارشد', color: 'bg-amber-400/20 text-amber-300 border-amber-500/40' },
                      designer: { label: 'طراح ارشد', color: 'bg-teal-500/20 text-teal-300 border-teal-500/40' },
                      manager: { label: 'مدیر هماهنگی', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
                      support: { label: 'پشتیبانی', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
                    };

                    const badge = roleBadges[admin.role] || roleBadges.designer;

                    return (
                      <div
                        key={admin.id}
                        className={`p-5 rounded-3xl border bg-[#061718] transition-all relative ${
                          isSelf ? 'border-amber-400/70 shadow-lg shadow-amber-500/10' : 'border-teal-800/80 hover:border-teal-700'
                        }`}
                      >
                        {/* Status & Self indicator */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={admin.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                                alt={admin.fullName}
                                className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-700"
                              />
                              <span
                                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#061718] ${
                                  admin.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-white">{admin.fullName}</h3>
                                {isSelf && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-400 text-teal-950 font-black">
                                    حساب شما
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-mono text-amber-300/80 mt-0.5">
                                @{admin.username}
                              </div>
                            </div>
                          </div>

                          <span className={`text-[11px] px-2.5 py-1 rounded-full border font-bold ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 text-xs text-slate-300 py-3 border-y border-teal-900/80">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">عنوان نقش:</span>
                            <span className="font-medium text-slate-200">{admin.roleTitle}</span>
                          </div>
                          {admin.phone && (
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">تلفن همراه:</span>
                              <span className="font-mono text-slate-200">{admin.phone}</span>
                            </div>
                          )}
                          {admin.email && (
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">ایمیل:</span>
                              <span className="font-mono text-slate-200">{admin.email}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">آخرین ورود:</span>
                            <span className="font-mono text-slate-400">{admin.lastLogin || 'ثبت نشده'}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">وضعیت دسترسی:</span>
                            <span className={admin.isActive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {admin.isActive ? 'فعال و مجاز' : 'غیرفعال شده'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-2 mt-4">
                          <button
                            onClick={() => handleOpenEditAdminModal(admin)}
                            className="px-3 py-1.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-teal-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>ویرایش / تغییر رمز</span>
                          </button>

                          {!isSelf && (
                            <button
                              onClick={() => handleDeleteAdmin(admin.id, admin.fullName)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>حذف</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------- 4. CUSTOMERS ---------------- */}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">مشتریان استودیو آرکا</h2>
                  <p className="text-xs text-slate-400 mt-0.5">لیست کارفرمایان و تاریخچه ارتباطات</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-2xl bg-[#061718] border border-teal-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{ord.customerName}</span>
                        <span className="text-xs font-mono text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                          {ord.phone}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        سفارش اخیر: <span className="text-amber-300">{ord.projectType}</span> ({ord.id})
                      </div>
                      <div className="text-xs text-slate-400">
                        پیام‌رسان: <span className="font-mono text-slate-200">{ord.messengerHandle}</span> ({ord.messengerType})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 5. PROJECTS IN PROGRESS ---------------- */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">پروژه‌های در حال طراحی و بررسی</h2>
                  <p className="text-xs text-slate-400 mt-0.5">مدیریت تایم‌لاین و ددلاین‌های تحویل</p>
                </div>

                <div className="space-y-3">
                  {orders
                    .filter((o) => o.status !== 'completed')
                    .map((ord) => (
                      <div key={ord.id} className="p-4 rounded-2xl bg-[#061718] border border-teal-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-amber-300 text-xs">{ord.id}</span>
                            <span className="font-bold text-white text-sm">{ord.customerName}</span>
                          </div>
                          <div className="text-xs text-slate-300 mt-1">{ord.projectType} • ددلاین: {ord.deliveryDeadline || 'عادی'}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-teal-950 rounded-full h-2.5 overflow-hidden border border-teal-800">
                            <div
                              className="bg-amber-400 h-full rounded-full transition-all"
                              style={{ width: `${ord.stageProgress}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-amber-300">{ord.stageProgress}%</span>
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setActiveTab('orders');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-teal-200 text-xs font-bold"
                          >
                            مشاهده
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ---------------- 6. PORTFOLIO ---------------- */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-teal-900 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">نمونه‌کارها و پروژه‌ها</h2>
                    <p className="text-xs text-slate-400 mt-0.5">افزودن نمونه‌کار به ویترین سایت عمومی</p>
                  </div>

                  <button
                    onClick={() => setIsPortfolioModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن نمونه‌کار</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolio.map((item) => (
                    <div key={item.id} className="bg-[#061718] rounded-2xl border border-teal-800 overflow-hidden group">
                      <img src={item.coverImage} alt={item.title} className="w-full h-36 object-cover" />
                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] text-amber-300 font-bold uppercase">{item.categoryTitle}</span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                        <p className="text-[11px] text-slate-400">{item.client}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 7. SERVICES ---------------- */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">خدمات استودیو آرکا</h2>
                  <p className="text-xs text-slate-400 mt-0.5">دسته‌بندی و تعرفه خدمات قابل ارائه</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div key={srv.id} className="p-4 rounded-2xl bg-[#061718] border border-teal-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-sm">{srv.title}</h3>
                        <span className="text-xs text-amber-300 font-mono font-bold">{srv.priceRange.formatted}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{srv.shortDesc}</p>
                      <div className="flex items-center justify-between text-[11px] text-teal-300 pt-2 border-t border-teal-900/60">
                        <span>زمان تخمینی: {srv.estimatedDays}</span>
                        <span>{srv.deliverables.length} فایل خروجی</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 8. PRICING ---------------- */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">پلن‌ها و تعرفه‌ها</h2>
                  <p className="text-xs text-slate-400 mt-0.5">قیمت‌گذاری خدمات و بسته‌های اقتصادی</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pricing.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#061718] border border-teal-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{p.title}</h4>
                        {p.popular && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-teal-950 font-bold">پیشنهادی</span>}
                      </div>
                      <div className="text-base font-black text-amber-300 font-mono">{p.formattedRange}</div>
                      <p className="text-xs text-slate-400">زمان تحویل: {p.turnaroundTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 9. REVIEWS ---------------- */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">نظرات و بازخورد مشتریان</h2>
                  <p className="text-xs text-slate-400 mt-0.5">امتیازات و دیدگاه‌های ثبت‌شده</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-[#061718] border border-teal-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white text-sm">{r.clientName}</div>
                        <div className="flex text-amber-400 text-xs">{'★'.repeat(r.rating)}</div>
                      </div>
                      <div className="text-xs text-slate-400">{r.companyName} • {r.serviceTitle}</div>
                      <p className="text-xs text-slate-200 leading-relaxed italic">«{r.comment}»</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 10. MESSAGES ---------------- */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">پیام‌های تماس و مشاوره</h2>
                  <p className="text-xs text-slate-400 mt-0.5">درخواست‌های ارسالی از فرم تماس با ما</p>
                </div>

                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="p-4 rounded-2xl bg-[#061718] border border-teal-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{m.name}</span>
                        <span className="text-xs font-mono text-teal-300">{m.phone}</span>
                      </div>
                      <div className="text-xs font-bold text-amber-300">{m.subject}</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{m.message}</p>
                      <div className="text-[10px] text-slate-500 text-left font-mono">{m.createdAt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 11. SETTINGS ---------------- */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-2xl">
                <div className="border-b border-teal-900 pb-4">
                  <h2 className="text-xl font-bold text-white">تنظیمات استودیو و کانال‌های ارتباطی</h2>
                  <p className="text-xs text-slate-400 mt-0.5">اطلاعات تماس، شبکه‌های اجتماعی و وب‌هوک ربات‌ها</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">نام استودیو:</label>
                    <input
                      type="text"
                      value={settings.brandName}
                      onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">شعار برند:</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">شماره تماس مستقیم:</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">ایمیل ارتباطی:</label>
                      <input
                        type="text"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">لینک پیام‌رسان بله:</label>
                    <input
                      type="text"
                      value={settings.baleLink}
                      onChange={(e) => setSettings({ ...settings, baleLink: e.target.value })}
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">لینک تلگرام:</label>
                    <input
                      type="text"
                      value={settings.telegramLink}
                      onChange={(e) => setSettings({ ...settings, telegramLink: e.target.value })}
                      className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-800 text-xs space-y-2">
                  <span className="font-bold text-amber-300 block">اتصال وب‌هوک ربات بله / تلگرام:</span>
                  <input
                    type="text"
                    value={settings.baleWebhookUrl || ''}
                    onChange={(e) => setSettings({ ...settings, baleWebhookUrl: e.target.value })}
                    placeholder="https://tapi.bale.ai/bot<TOKEN>/sendMessage"
                    className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                  <p className="text-[11px] text-slate-400">
                    با وارد کردن توکن یا وب‌هوک ربات بله، پس از ثبت هر سفارش به صورت خودکار پیام به ربات ارسال خواهد شد.
                  </p>
                </div>

                <button
                  onClick={() => {
                    studioApi.updateSettings(settings);
                    alert('تنظیمات با موفقیت ذخیره شد.');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold text-xs shadow-md"
                >
                  ذخیره تغییرات تنظیمات
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT ADMIN USER ================= */}
      <Modal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        title={editingAdmin ? `ویرایش حساب مدیر: ${editingAdmin.fullName}` : 'افزودن مدیر یا طراح جدید'}
        size="lg"
      >
        <form onSubmit={handleSaveAdmin} className="space-y-4 text-xs">
          {adminFormError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{adminFormError}</span>
            </div>
          )}

          {adminFormSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{adminFormSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">نام و نام خانوادگی:</label>
              <input
                type="text"
                value={adminFormName}
                onChange={(e) => setAdminFormName(e.target.value)}
                placeholder="مثال: سارا کاظمی"
                required
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">نام کاربری (جهت ورود):</label>
              <input
                type="text"
                value={adminFormUsername}
                onChange={(e) => setAdminFormUsername(e.target.value)}
                placeholder="مثال: sara_kazemi"
                required
                dir="ltr"
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Password & Generator */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-bold">
                {editingAdmin ? 'کلمه عبور جدید (در صورت عدم تغییر خالی بگذارید):' : 'کلمه عبور:'}
              </label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold"
              >
                <Key className="w-3 h-3" />
                <span>تولید رمز قوی تصادفی</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showAdminPassword ? 'text' : 'password'}
                value={adminFormPassword}
                onChange={(e) => setAdminFormPassword(e.target.value)}
                placeholder={editingAdmin ? 'برای حفظ رمز فعلی خالی بگذارید' : 'حداقل ۴ کاراکتر'}
                dir="ltr"
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 pl-10 text-white font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">نقش و سطح دسترسی:</label>
              <select
                value={adminFormRole}
                onChange={(e) => setAdminFormRole(e.target.value as AdminRole)}
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="super_admin">مدیر ارشد (Super Admin - دسترسی کامل)</option>
                <option value="designer">طراح ارشد (Senior Designer - سفارش‌ها و نمونه‌کار)</option>
                <option value="manager">مدیر هماهنگی (Project Manager - پیگیری سفارش‌ها)</option>
                <option value="support">پشتیبانی (Support - پیام‌ها و پاسخگویی)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">وضعیت حساب:</label>
              <select
                value={adminFormActive ? 'true' : 'false'}
                onChange={(e) => setAdminFormActive(e.target.value === 'true')}
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="true">فعال (امکان ورود به پنل)</option>
                <option value="false">غیرفعال (مسدود شده)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">شماره تماس (اختیاری):</label>
              <input
                type="text"
                value={adminFormPhone}
                onChange={(e) => setAdminFormPhone(e.target.value)}
                placeholder="09123456789"
                dir="ltr"
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">ایمیل (اختیاری):</label>
              <input
                type="email"
                value={adminFormEmail}
                onChange={(e) => setAdminFormEmail(e.target.value)}
                placeholder="designer@arkadesign.ir"
                dir="ltr"
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-teal-900">
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-300 hover:bg-teal-950 border border-teal-800"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold shadow-md shadow-amber-500/20"
            >
              {editingAdmin ? 'ذخیره تغییرات مدیر' : 'ایجاد و فعال‌سازی مدیر جدید'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ================= MODAL: ADD PORTFOLIO ITEM ================= */}
      <Modal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        title="افزودن نمونه‌کار جدید به ویترین"
      >
        <form onSubmit={handleCreatePortfolioItem} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">عنوان پروژه:</label>
            <input
              type="text"
              value={newPortTitle}
              onChange={(e) => setNewPortTitle(e.target.value)}
              placeholder="مثال: طراحی هویت بصری استارتاپ هیراد"
              required
              className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">نام کارفرما / برند:</label>
              <input
                type="text"
                value={newPortClient}
                onChange={(e) => setNewPortClient(e.target.value)}
                placeholder="مثال: گروه صنعتی پارس"
                required
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">دسته‌بندی:</label>
              <select
                value={newPortCategory}
                onChange={(e) => setNewPortCategory(e.target.value as any)}
                className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="logo">طراحی لوگو و نشانه</option>
                <option value="banner">بنر تبلیغاتی و کلیکی</option>
                <option value="poster">پوستر رویداد و همایش</option>
                <option value="social">کاور و پست شبکه‌های اجتماعی</option>
                <option value="branding">ست اداری و هویت بصری</option>
                <option value="video">موشن‌گرافیک و ویدیو</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">لینک تصویر کاور:</label>
            <input
              type="text"
              value={newPortImage}
              onChange={(e) => setNewPortImage(e.target.value)}
              className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">توضیحات مختصر پروژه:</label>
            <textarea
              rows={3}
              value={newPortDesc}
              onChange={(e) => setNewPortDesc(e.target.value)}
              placeholder="توضیحات درباره سبک، اهداف بصری و چالش‌های پروژه..."
              className="w-full bg-[#061718] border border-teal-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-teal-900">
            <button
              type="button"
              onClick={() => setIsPortfolioModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-300 hover:bg-teal-950 border border-teal-800"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-bold"
            >
              انتشار در سایت
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
