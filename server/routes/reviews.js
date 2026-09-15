import express from 'express';
import { store } from '../db.js';

const router = express.Router();

// GET /api/reviews
router.get('/', (req, res) => {
  res.json({ reviews: store.reviews });
});

// POST /api/reviews
router.post('/', (req, res) => {
  const { userName, rating, comment, title, tags, userAvatar } = req.body;
  if (!userName || !rating || !comment) {
    return res.status(400).json({ error: 'Name, rating, and review comment are required.' });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    userName,
    userAvatar: userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: Number(rating),
    date: 'Just now',
    title: title || 'Exceptional Coffee Experience',
    comment,
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ['Great Ambiance', 'Delicious']),
    likes: 0
  };

  store.reviews.unshift(newReview);
  res.status(201).json({ review: newReview, message: 'Thank you for your warm feedback! Your review is now live.' });
});

// POST /api/reviews/:id/like
router.post('/:id/like', (req, res) => {
  const review = store.reviews.find(r => r.id === req.params.id);
  if (!review) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  review.likes = (review.likes || 0) + 1;
  res.json({ likes: review.likes });
});

export default router;
