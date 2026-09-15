import express from 'express';
import jwt from 'jsonwebtoken';
import { store } from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'morning-brew-secret-key-2026';

// Helper to generate token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password.' });
  }

  const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const newUser = {
    id: `cust-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password,
    phone: phone || '',
    role: 'customer',
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
    loyaltyPoints: 50 // welcome bonus
  };

  store.users.push(newUser);
  const token = generateToken(newUser);
  const { password: _, ...userSafe } = newUser;
  res.status(201).json({ user: userSafe, token, message: 'Registration successful! Welcome bonus 50 Brew Points added.' });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter email and password.' });
  }

  const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = generateToken(user);
  const { password: _, ...userSafe } = user;
  res.json({ user: userSafe, token, message: `Welcome back, ${user.name}!` });
});

// POST /api/auth/demo-login
router.post('/demo-login', (req, res) => {
  const { role } = req.body; // 'admin' or 'customer'
  const user = store.users.find(u => u.role === (role === 'admin' ? 'admin' : 'customer'));
  if (!user) {
    return res.status(404).json({ error: 'Demo user not found.' });
  }
  const token = generateToken(user);
  const { password: _, ...userSafe } = user;
  res.json({ user: userSafe, token, message: `Logged in as demo ${user.role} (${user.name})` });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. No token provided.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = store.users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const { password: _, ...userSafe } = user;
    res.json({ user: userSafe });
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired.' });
  }
});

export default router;
