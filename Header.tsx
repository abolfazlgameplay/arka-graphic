import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import {
  Menu,
  X,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'services', label: 'خدمات طراحی' },
    { id: 'portfolio', label: 'نمونه‌کارها' },
    { id: 'pricing', label: 'تعرفه‌ها و قیمت' },
    { id: 'track', label: 'پیگیری سفارش' },
    { id: 'about', label: 'درباره آرکا' },
    { id: 'contact', label: 'تماس با ما' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071b1d]/90 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo onClick={() => handleNavClick('home')} size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#092224]/80 p-1.5 rounded-full border border-teal-800/40 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-teal-950 font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-teal-900/40'
                  }`}
                >
                  {link.label}
                  {link.id === 'track' && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Track Button */}
            <button
              onClick={() => handleNavClick('track')}
              className="px-3 py-2 rounded-xl text-xs text-teal-300 hover:text-amber-300 hover:bg-teal-950/60 border border-teal-800/60 transition-all flex items-center gap-1.5"
              title="پیگیری وضعیت سفارش"
            >
              <Search className="w-3.5 h-3.5" />
              <span>پیگیری سریع</span>
            </button>

            {/* Main Order CTA Button */}
            <button
              onClick={() => handleNavClick('order')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold text-teal-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-950" />
                ثبت سفارش آنلاین
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Admin discrete entry */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-xl border transition-colors ${
                currentPage === 'admin'
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-teal-950/40 border-teal-900/60 text-slate-400 hover:text-amber-300 hover:border-teal-700'
              }`}
              title="پنل مدیریت استودیو آرکا"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('order')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-teal-950 bg-amber-400 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              سفارش
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-teal-950/80 border border-teal-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bg-[#071a1c]/95 border-b border-amber-500/20 backdrop-blur-2xl p-5 shadow-2xl transition-all animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-teal-950 font-bold'
                      : 'text-slate-300 hover:bg-teal-900/40'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.id === 'track' && (
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      آنلاین
                    </span>
                  )}
                </button>
              );
            })}

            <div className="h-px bg-teal-900/60 my-2" />

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleNavClick('order')}
                className="w-full py-3 rounded-xl font-bold text-teal-950 bg-gradient-to-r from-amber-300 to-amber-500 text-center shadow-lg text-sm flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                ثبت سفارش جدید
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-3 rounded-xl font-medium text-slate-200 bg-teal-950 border border-teal-800/80 text-center text-sm flex items-center justify-center gap-1.5 hover:text-amber-300"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                پنل ادمین
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
