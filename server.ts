import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  INITIAL_ORDERS,
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_PRICING,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS,
  INITIAL_MESSAGES
} from './src/data/initialData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory data store for server runtime
let orders = [...INITIAL_ORDERS];
let services = [...INITIAL_SERVICES];
let portfolio = [...INITIAL_PORTFOLIO];
let pricing = [...INITIAL_PRICING];
let reviews = [...INITIAL_REVIEWS];
let messages = [...INITIAL_MESSAGES];
let settings = { ...INITIAL_SETTINGS };

// --- API Endpoints ---

// Orders API
app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: orders });
});

app.get('/api/orders/:id', (req, res) => {
  const query = req.params.id.trim().toLowerCase();
  const order = orders.find(
    (o) =>
      o.id.toLowerCase() === query ||
      o.phone.includes(query) ||
      (o.messengerHandle && o.messengerHandle.toLowerCase().includes(query))
  );
  if (!order) {
    return res.status(404).json({ success: false, message: 'سفارشی با این شناسه یافت نشد.' });
  }
  res.json({ success: true, data: order });
});

app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  const count = orders.length + 1;
  const orderId = `ARKA-${new Date().getFullYear()}-${String(count).padStart(5, '0')}`;
  
  const newOrder = {
    ...orderData,
    id: orderId,
    status: 'submitted',
    stageProgress: 15,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    adminNotes: ['سفارش با موفقیت در سامانه آنلاین آرکا ثبت شد.'],
    deliverableFiles: []
  };

  orders.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'سفارش یافت نشد' });
  }

  const updatedOrder = {
    ...orders[idx],
    ...req.body,
    updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  orders[idx] = updatedOrder;
  res.json({ success: true, data: updatedOrder });
});

// Services API
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: services });
});

// Portfolio API
app.get('/api/portfolio', (req, res) => {
  res.json({ success: true, data: portfolio });
});

app.post('/api/portfolio', (req, res) => {
  const newItem = {
    ...req.body,
    id: `port-${Date.now()}`
  };
  portfolio.unshift(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// Pricing API
app.get('/api/pricing', (req, res) => {
  res.json({ success: true, data: pricing });
});

// Reviews API
app.get('/api/reviews', (req, res) => {
  res.json({ success: true, data: reviews });
});

// Messages API
app.get('/api/messages', (req, res) => {
  res.json({ success: true, data: messages });
});

app.post('/api/messages', (req, res) => {
  const newMsg = {
    ...req.body,
    id: `msg-${Date.now()}`,
    status: 'unread',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  messages.unshift(newMsg);
  res.status(201).json({ success: true, data: newMsg });
});

// Settings API
app.get('/api/settings', (req, res) => {
  res.json({ success: true, data: settings });
});

app.put('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json({ success: true, data: settings });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', studio: 'Arka Graphic Studio API', timestamp: new Date() });
});

// Serve static frontend in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
