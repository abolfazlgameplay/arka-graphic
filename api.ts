import {
  Order,
  Service,
  PortfolioItem,
  PricingPlan,
  Review,
  ContactMessage,
  StudioSettings,
  OrderStatus,
  FAQItem,
  AdminUser
} from '../types';
import {
  INITIAL_ORDERS,
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_PRICING,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS,
  INITIAL_MESSAGES,
  INITIAL_FAQS,
  INITIAL_ADMINS
} from '../data/initialData';

const STORAGE_KEYS = {
  ORDERS: 'arka_orders_data',
  SERVICES: 'arka_services_data',
  PORTFOLIO: 'arka_portfolio_data',
  PRICING: 'arka_pricing_data',
  REVIEWS: 'arka_reviews_data',
  SETTINGS: 'arka_settings_data',
  MESSAGES: 'arka_messages_data',
  FAQS: 'arka_faqs_data',
  ADMINS: 'arka_admins_data',
  CURRENT_ADMIN: 'arka_current_admin_session',
};

// Helper for local storage with fallback
function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function setStoredItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving to localStorage [${key}]:`, err);
  }
}

export const studioApi = {
  // Orders
  getOrders: (): Order[] => {
    return getStoredItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  getOrderById: (idOrPhone: string): Order | undefined => {
    const orders = studioApi.getOrders();
    const cleanQuery = idOrPhone.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.id.toLowerCase() === cleanQuery ||
        o.phone.includes(cleanQuery) ||
        (o.messengerHandle && o.messengerHandle.toLowerCase().includes(cleanQuery))
    );
  },

  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'stageProgress'>): Order => {
    const orders = studioApi.getOrders();
    const count = orders.length + 1;
    const orderId = `ARKA-${new Date().getFullYear()}-${String(count).padStart(5, '0')}`;
    
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'submitted',
      stageProgress: 15,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      adminNotes: ['سفارش با موفقیت در سیستم ثبت گردید.'],
      deliverableFiles: []
    };

    const updated = [newOrder, ...orders];
    setStoredItem(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  },

  updateOrderStatus: (orderId: string, status: OrderStatus, progress?: number, note?: string): Order | null => {
    const orders = studioApi.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const progressMap: Record<OrderStatus, number> = {
      submitted: 15,
      under_review: 25,
      awaiting_info: 35,
      in_design: 50,
      preview_sent: 70,
      revision: 80,
      awaiting_approval: 90,
      completed: 100,
    };

    const targetOrder = orders[index];
    const newNotes = [...(targetOrder.adminNotes || [])];
    if (note && note.trim()) {
      newNotes.push(`[${new Date().toLocaleTimeString('fa-IR')}] ${note.trim()}`);
    }

    const updatedOrder: Order = {
      ...targetOrder,
      status,
      stageProgress: progress !== undefined ? progress : progressMap[status],
      adminNotes: newNotes,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    orders[index] = updatedOrder;
    setStoredItem(STORAGE_KEYS.ORDERS, orders);
    return updatedOrder;
  },

  addDeliverableFile: (orderId: string, file: { title: string; format: string; fileSize: string; downloadUrl: string }): Order | null => {
    const orders = studioApi.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const order = orders[index];
    const newDeliverable = {
      id: `del-${Date.now()}`,
      title: file.title,
      format: file.format,
      fileSize: file.fileSize || '1.5 MB',
      downloadUrl: file.downloadUrl || '#',
      uploadedAt: new Date().toLocaleDateString('fa-IR'),
      version: `v${(order.deliverableFiles?.length || 0) + 1}.0`
    };

    const updatedOrder: Order = {
      ...order,
      deliverableFiles: [...(order.deliverableFiles || []), newDeliverable],
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    orders[index] = updatedOrder;
    setStoredItem(STORAGE_KEYS.ORDERS, orders);
    return updatedOrder;
  },

  // Services
  getServices: (): Service[] => {
    return getStoredItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },

  updateService: (updatedService: Service): void => {
    const services = studioApi.getServices();
    const idx = services.findIndex((s) => s.id === updatedService.id);
    if (idx !== -1) {
      services[idx] = updatedService;
    } else {
      services.push(updatedService);
    }
    setStoredItem(STORAGE_KEYS.SERVICES, services);
  },

  // Portfolio
  getPortfolio: (): PortfolioItem[] => {
    return getStoredItem<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  },

  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>): PortfolioItem => {
    const portfolio = studioApi.getPortfolio();
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    const updated = [newItem, ...portfolio];
    setStoredItem(STORAGE_KEYS.PORTFOLIO, updated);
    return newItem;
  },

  updatePortfolioItem: (item: PortfolioItem): void => {
    const portfolio = studioApi.getPortfolio();
    const idx = portfolio.findIndex((p) => p.id === item.id);
    if (idx !== -1) {
      portfolio[idx] = item;
      setStoredItem(STORAGE_KEYS.PORTFOLIO, portfolio);
    }
  },

  deletePortfolioItem: (id: string): void => {
    const portfolio = studioApi.getPortfolio();
    const filtered = portfolio.filter((p) => p.id !== id);
    setStoredItem(STORAGE_KEYS.PORTFOLIO, filtered);
  },

  // Pricing
  getPricing: (): PricingPlan[] => {
    return getStoredItem<PricingPlan[]>(STORAGE_KEYS.PRICING, INITIAL_PRICING);
  },

  updatePricingPlan: (updatedPlan: PricingPlan): void => {
    const plans = studioApi.getPricing();
    const idx = plans.findIndex((p) => p.id === updatedPlan.id);
    if (idx !== -1) {
      plans[idx] = updatedPlan;
    } else {
      plans.push(updatedPlan);
    }
    setStoredItem(STORAGE_KEYS.PRICING, plans);
  },

  // Reviews
  getReviews: (): Review[] => {
    return getStoredItem<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },

  addReview: (review: Omit<Review, 'id' | 'date'>): Review => {
    const reviews = studioApi.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('fa-IR')
    };
    const updated = [newRev, ...reviews];
    setStoredItem(STORAGE_KEYS.REVIEWS, updated);
    return newRev;
  },

  // Messages / Contact
  getMessages: (): ContactMessage[] => {
    return getStoredItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  },

  sendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage => {
    const messages = studioApi.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    const updated = [newMsg, ...messages];
    setStoredItem(STORAGE_KEYS.MESSAGES, updated);
    return newMsg;
  },

  updateMessageStatus: (id: string, status: 'unread' | 'read' | 'answered'): void => {
    const messages = studioApi.getMessages();
    const idx = messages.findIndex((m) => m.id === id);
    if (idx !== -1) {
      messages[idx].status = status;
      setStoredItem(STORAGE_KEYS.MESSAGES, messages);
    }
  },

  // Settings
  getSettings: (): StudioSettings => {
    return getStoredItem<StudioSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  updateSettings: (newSettings: StudioSettings): void => {
    setStoredItem(STORAGE_KEYS.SETTINGS, newSettings);
  },

  // FAQs
  getFaqs: (): FAQItem[] => {
    return getStoredItem<FAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  },

  // Admin Management & Authentication
  getAdmins: (): AdminUser[] => {
    return getStoredItem<AdminUser[]>(STORAGE_KEYS.ADMINS, INITIAL_ADMINS);
  },

  getCurrentAdmin: (): AdminUser | null => {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN);
      if (!session) return null;
      const parsed = JSON.parse(session) as AdminUser;
      // Ensure admin still exists and is active in DB
      const admins = studioApi.getAdmins();
      const match = admins.find((a) => a.id === parsed.id && a.isActive);
      return match || null;
    } catch {
      return null;
    }
  },

  loginAdmin: (username: string, password: string): { success: boolean; admin?: AdminUser; error?: string } => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      return { success: false, error: 'لطفاً نام کاربری و کلمه عبور را وارد نمایید.' };
    }

    const admins = studioApi.getAdmins();
    const match = admins.find(
      (a) => a.username.toLowerCase() === trimmedUser.toLowerCase() && a.password === trimmedPass
    );

    if (!match) {
      return { success: false, error: 'نام کاربری یا کلمه عبور وارد شده نادرست است.' };
    }

    if (!match.isActive) {
      return { success: false, error: 'این حساب کاربری توسط مدیر غیرفعال شده است.' };
    }

    // Update last login
    const updatedAdmin: AdminUser = {
      ...match,
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedAdmins = admins.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a));
    setStoredItem(STORAGE_KEYS.ADMINS, updatedAdmins);
    setStoredItem(STORAGE_KEYS.CURRENT_ADMIN, updatedAdmin);

    return { success: true, admin: updatedAdmin };
  },

  logoutAdmin: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    } catch (err) {
      console.error('Error clearing admin session:', err);
    }
  },

  createAdmin: (adminData: Omit<AdminUser, 'id' | 'createdAt'>): { success: boolean; admin?: AdminUser; error?: string } => {
    const admins = studioApi.getAdmins();
    const normalizedUsername = adminData.username.trim().toLowerCase();

    if (!normalizedUsername) {
      return { success: false, error: 'نام کاربری نمی‌تواند خالی باشد.' };
    }

    if (adminData.password.trim().length < 4) {
      return { success: false, error: 'کلمه عبور باید حداقل ۴ کاراکتر باشد.' };
    }

    if (admins.some((a) => a.username.toLowerCase() === normalizedUsername)) {
      return { success: false, error: 'این نام کاربری قبلاً ثبت شده است. لطفاً نام کاربری دیگری انتخاب کنید.' };
    }

    const newAdmin: AdminUser = {
      ...adminData,
      id: `admin-${Date.now()}`,
      username: normalizedUsername,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isActive: adminData.isActive ?? true,
      permissions: adminData.permissions || (adminData.role === 'super_admin' ? ['all'] : ['orders', 'portfolio'])
    };

    const newAdminsList = [...admins, newAdmin];
    setStoredItem(STORAGE_KEYS.ADMINS, newAdminsList);

    return { success: true, admin: newAdmin };
  },

  updateAdmin: (id: string, updates: Partial<AdminUser>): { success: boolean; admin?: AdminUser; error?: string } => {
    const admins = studioApi.getAdmins();
    const index = admins.findIndex((a) => a.id === id);

    if (index === -1) {
      return { success: false, error: 'کاربر مورد نظر یافت نشد.' };
    }

    if (updates.username) {
      const normalized = updates.username.trim().toLowerCase();
      const duplicate = admins.find((a) => a.username.toLowerCase() === normalized && a.id !== id);
      if (duplicate) {
        return { success: false, error: 'این نام کاربری توسط کاربر دیگری استفاده شده است.' };
      }
      updates.username = normalized;
    }

    const updatedAdmin: AdminUser = {
      ...admins[index],
      ...updates,
    };

    admins[index] = updatedAdmin;
    setStoredItem(STORAGE_KEYS.ADMINS, admins);

    // If current session is this admin, update session too
    const current = studioApi.getCurrentAdmin();
    if (current && current.id === id) {
      setStoredItem(STORAGE_KEYS.CURRENT_ADMIN, updatedAdmin);
    }

    return { success: true, admin: updatedAdmin };
  },

  deleteAdmin: (id: string): { success: boolean; error?: string } => {
    const admins = studioApi.getAdmins();
    const target = admins.find((a) => a.id === id);
    if (!target) {
      return { success: false, error: 'کاربر پیدا نشد.' };
    }

    const current = studioApi.getCurrentAdmin();
    if (current && current.id === id) {
      return { success: false, error: 'شما نمی‌توانید حساب کاربری خودتان را حذف کنید.' };
    }

    // Check if it's the last super_admin
    const superAdmins = admins.filter((a) => a.role === 'super_admin');
    if (target.role === 'super_admin' && superAdmins.length <= 1) {
      return { success: false, error: 'امکان حذف تنها مدیر ارشد سیستم وجود ندارد.' };
    }

    const filtered = admins.filter((a) => a.id !== id);
    setStoredItem(STORAGE_KEYS.ADMINS, filtered);
    return { success: true };
  },

  // Dashboard Stats
  getDashboardStats: () => {
    const orders = studioApi.getOrders();
    const messages = studioApi.getMessages();
    const portfolio = studioApi.getPortfolio();

    const newOrdersCount = orders.filter((o) => o.status === 'submitted' || o.status === 'under_review').length;
    const inProgressCount = orders.filter((o) => ['awaiting_info', 'in_design', 'preview_sent', 'revision', 'awaiting_approval'].includes(o.status)).length;
    const completedCount = orders.filter((o) => o.status === 'completed').length;
    const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

    // Unique customer phones
    const uniqueCustomers = new Set(orders.map((o) => o.phone)).size;

    return {
      totalOrders: orders.length,
      newOrders: newOrdersCount,
      inProgress: inProgressCount,
      completed: completedCount,
      totalCustomers: uniqueCustomers,
      unreadMessages: unreadMessagesCount,
      totalPortfolioItems: portfolio.length,
      estimatedRevenueFormatted: '۳۸,۴۰۰,۰۰۰ تومان',
    };
  }
};
