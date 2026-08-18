export type OrderStatus =
  | 'submitted'          // ثبت شده
  | 'under_review'        // در حال بررسی
  | 'awaiting_info'       // در انتظار اطلاعات
  | 'in_design'           // در حال طراحی
  | 'preview_sent'        // پیش‌نمایش ارسال شد
  | 'revision'            // در انتظار اصلاح
  | 'awaiting_approval'   // در انتظار تأیید
  | 'completed';          // تکمیل شده

export interface OrderStatusInfo {
  key: OrderStatus;
  label: string;
  description: string;
  stepNumber: number;
  badgeColor: string;
}

export interface UploadedFileMeta {
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface DeliverableFile {
  id: string;
  title: string;
  format: string;
  fileSize: string;
  downloadUrl: string;
  uploadedAt: string;
  version: string;
}

export interface Order {
  id: string; // e.g. ARKA-2026-00101
  // Customer Info
  customerName: string;
  phone: string;
  messengerHandle: string; // e.g. @username
  messengerType: 'bale' | 'telegram' | 'eitaa' | 'whatsapp' | 'other';
  email?: string;
  
  // Project Type & Goals
  projectType: string; // لوگو، پوستر، بنر و...
  projectGoal: string; // فروش، برندسازی، معرفی محصول و...
  platform: string;    // اینستاگرام، سایت، چاپ و...
  
  // Project Specs
  dimensions?: string;
  description: string;
  brandColors?: string;
  designStyle?: string;
  deliveryDeadline?: string;
  hasLogo: boolean;
  hasReferenceFiles: boolean;
  
  // Uploads & Deliverables
  uploadedFiles: UploadedFileMeta[];
  deliverableFiles?: DeliverableFile[];
  
  // Status & Management
  status: OrderStatus;
  stageProgress: number; // 0 to 100%
  estimatedPrice: string;
  finalPrice?: string;
  adminNotes?: string[];
  clientFeedback?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  popular?: boolean;
  priceRange: {
    min: number;
    max: number;
    formatted: string;
  };
  estimatedDays: string;
  deliverables: string[];
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'logo' | 'banner' | 'poster' | 'social' | 'branding' | 'video' | 'other';
  categoryTitle: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
  additionalImages?: string[];
  tags: string[];
  features: string[];
  deliverables: string[];
  clientTestimonial?: string;
  colorPalette?: string[];
}

export interface PricingPlan {
  id: string;
  serviceId: string;
  title: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  formattedRange: string;
  turnaroundTime: string;
  features: string[];
  popular?: boolean;
  note?: string;
}

export interface Review {
  id: string;
  clientName: string;
  companyName: string;
  rating: number;
  avatar: string;
  comment: string;
  serviceTitle: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'order' | 'pricing' | 'delivery' | 'technical';
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'answered';
  createdAt: string;
}

export interface StudioSettings {
  brandName: string;
  tagline: string;
  adminHandle: string;
  telegramLink: string;
  baleLink: string;
  eitaaLink: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  baleWebhookUrl?: string;
  telegramWebhookUrl?: string;
  currency: string;
}

export type AdminRole = 'super_admin' | 'designer' | 'manager' | 'support';

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: AdminRole;
  roleTitle: string;
  avatar?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  permissions?: string[];
}
