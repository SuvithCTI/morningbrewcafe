import express from 'express';
import { store } from '../db.js';

const router = express.Router();

// GET /api/reservations
router.get('/', (req, res) => {
  const { email, userId } = req.query;
  let reservations = [...store.reservations];

  if (email) {
    reservations = reservations.filter(r => r.email.toLowerCase() === email.toLowerCase());
  }

  reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ reservations });
});

// POST /api/reservations - Create a reservation
router.post('/', (req, res) => {
  const {
    userName,
    email,
    phone,
    date,
    time,
    guests,
    tableZone,
    occasion,
    specialRequests,
    tastingOrders,
    advancePaid,
    paymentStatus,
    paymentMethod
  } = req.body;

  if (!userName || !email || !date || !time || !guests) {
    return res.status(400).json({ error: 'Please provide name, email, date, time, and number of guests.' });
  }

  const newReservation = {
    id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
    userName,
    email,
    phone: phone || '',
    date,
    time,
    guests: parseInt(guests, 10),
    tableZone: tableZone || 'Sunlit Window (Standard)',
    occasion: occasion || 'Casual Coffee',
    specialRequests: specialRequests || '',
    tastingOrders: Array.isArray(tastingOrders) ? tastingOrders : [],
    advancePaid: Number(advancePaid) || 100,
    paymentStatus: paymentStatus || 'Paid',
    paymentMethod: paymentMethod || 'UPI / Instant Pay',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  store.reservations.unshift(newReservation);
  res.status(201).json({
    reservation: newReservation,
    message: `Table reserved successfully at ${newReservation.tableZone} for ${newReservation.guests} guests on ${date} at ${time}!`
  });
});

// PATCH /api/reservations/:id/status (Admin)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const reservation = store.reservations.find(r => r.id === req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  reservation.status = status;
  res.json({ reservation, message: `Reservation ${reservation.id} marked as ${status}.` });
});

export default router;
