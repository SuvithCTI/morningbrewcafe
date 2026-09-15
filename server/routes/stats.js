import express from 'express';
import { store } from '../db.js';

const router = express.Router();

// GET /api/stats - Admin Dashboard Overview
router.get('/', (req, res) => {
  const totalOrders = store.orders.length;
  const totalRevenue = store.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalReservations = store.reservations.length;
  const totalMenuItems = store.menuItems.length;
  const totalUsers = store.users.length;
  
  const avgRating = store.reviews.length > 0 
    ? (store.reviews.reduce((sum, r) => sum + r.rating, 0) / store.reviews.length).toFixed(1)
    : 4.9;

  // Recent order trends
  const recentOrders = store.orders.slice(0, 5);
  const recentReservations = store.reservations.slice(0, 5);

  // Category distribution
  const categoryCounts = {};
  store.menuItems.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });

  // Sales by hour simulated data
  const hourlySales = [
    { hour: '7 AM', sales: 120, orders: 18 },
    { hour: '9 AM', sales: 340, orders: 45 },
    { hour: '11 AM', sales: 290, orders: 38 },
    { hour: '1 PM', sales: 410, orders: 52 },
    { hour: '3 PM', sales: 260, orders: 32 },
    { hour: '5 PM', sales: 380, orders: 48 },
    { hour: '7 PM', sales: 190, orders: 24 },
  ];

  res.json({
    metrics: {
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders,
      totalReservations,
      totalMenuItems,
      totalUsers,
      avgRating,
      occupancyRate: "88%"
    },
    categoryCounts,
    hourlySales,
    recentOrders,
    recentReservations
  });
});

export default router;
