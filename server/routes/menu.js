import express from 'express';
import { store } from '../db.js';

const router = express.Router();

// GET /api/menu - Get all menu items (supports query filters)
router.get('/', (req, res) => {
  const { category, search, dietary, isSpecial } = req.query;
  let items = [...store.menuItems];

  if (category && category !== 'All') {
    items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (dietary && dietary !== 'All') {
    items = items.filter(item => item.dietary && item.dietary.some(d => d.toLowerCase().includes(dietary.toLowerCase())));
  }

  if (isSpecial === 'true') {
    items = items.filter(item => item.isSpecial);
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  res.json({ items, count: items.length });
});

// GET /api/menu/:id - Get single item
router.get('/:id', (req, res) => {
  const item = store.menuItems.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }
  res.json({ item });
});

// POST /api/menu - Create new menu item (Admin)
router.post('/', (req, res) => {
  const { name, category, price, description, image, calories, caffeine, dietary, tags, isSpecial, isPopular } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, category, and price are required.' });
  }

  const newItem = {
    id: `mb-${Date.now()}`,
    name,
    category,
    price: parseFloat(price),
    rating: 5.0,
    reviewsCount: 1,
    calories: calories || 150,
    caffeine: caffeine || '100mg',
    isSpecial: Boolean(isSpecial),
    isPopular: Boolean(isPopular),
    dietary: Array.isArray(dietary) ? dietary : (dietary ? dietary.split(',').map(s => s.trim()) : []),
    description: description || 'Artisanal handcrafted delicacy prepared fresh daily.',
    image: image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(s => s.trim()) : ['Artisanal', 'Fresh']),
    accentColor: '#f59e0b',
    ingredients: ['Fresh Roast Beans', 'Pure Mineral Water']
  };

  store.menuItems.unshift(newItem);
  res.status(201).json({ item: newItem, message: 'New menu item created successfully!' });
});

// PUT /api/menu/:id - Update item (Admin)
router.put('/:id', (req, res) => {
  const index = store.menuItems.findIndex(i => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  store.menuItems[index] = {
    ...store.menuItems[index],
    ...req.body,
    price: req.body.price !== undefined ? parseFloat(req.body.price) : store.menuItems[index].price
  };

  res.json({ item: store.menuItems[index], message: 'Menu item updated successfully!' });
});

// DELETE /api/menu/:id - Delete item (Admin)
router.delete('/:id', (req, res) => {
  const index = store.menuItems.findIndex(i => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  const deleted = store.menuItems.splice(index, 1);
  res.json({ item: deleted[0], message: 'Menu item deleted successfully.' });
});

export default router;
