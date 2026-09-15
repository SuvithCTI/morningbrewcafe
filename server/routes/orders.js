import express from 'express';
import { store } from '../db.js';

const router = express.Router();

// GET /api/orders
router.get('/', (req, res) => {
  const { userId } = req.query;
  let orders = [...store.orders];
  if (userId) {
    orders = orders.filter(o => o.userId === userId || o.customerEmail === userId);
  }
  // Sort latest first
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ orders });
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const order = store.orders.find(o => o.id.toLowerCase() === req.params.id.toLowerCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found. Check your Order ID.' });
  }
  res.json({ order });
});

// POST /api/orders - Place a new order
router.post('/', (req, res) => {
  const {
    userId,
    customerName,
    customerEmail,
    customerPhone,
    items,
    orderType,
    deliveryAddress,
    tableNumber,
    subtotal,
    discount,
    tax,
    tip,
    total,
    paymentMethod,
    notes
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty. Please add items to place an order.' });
  }

  const newOrder = {
    id: `MB-${Math.floor(10000 + Math.random() * 90000)}`,
    userId: userId || 'guest',
    customerName: customerName || 'Valued Guest',
    customerEmail: customerEmail || 'guest@morningbrew.com',
    customerPhone: customerPhone || '+1 (555) 000-0000',
    items,
    orderType: orderType || 'Dine-In',
    deliveryAddress: deliveryAddress || '',
    tableNumber: tableNumber || '',
    subtotal: parseFloat(subtotal || 0),
    discount: parseFloat(discount || 0),
    tax: parseFloat(tax || 0),
    tip: parseFloat(tip || 0),
    total: parseFloat(total || 0),
    paymentMethod: paymentMethod || 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Placed', // 'Placed' -> 'Brewing' -> 'Quality Check' -> 'Ready / Out for Delivery' -> 'Delivered'
    estimatedTime: orderType === 'Express Delivery' ? '20-30 mins' : '10-15 mins',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  store.orders.unshift(newOrder);

  // Award loyalty points to logged-in user
  if (userId && userId !== 'guest') {
    const user = store.users.find(u => u.id === userId);
    if (user) {
      const earned = Math.floor(newOrder.total * 5);
      user.loyaltyPoints = (user.loyaltyPoints || 0) + earned;
    }
  }

  res.status(201).json({
    order: newOrder,
    message: 'Your order has been placed successfully! Our baristas are preparing your brew.'
  });
});

// PATCH /api/orders/:id/status - Update order status (Admin)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const order = store.orders.find(o => o.id.toLowerCase() === req.params.id.toLowerCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  order.orderStatus = status;
  res.json({ order, message: `Order #${order.id} status updated to ${status}` });
});

export default router;
