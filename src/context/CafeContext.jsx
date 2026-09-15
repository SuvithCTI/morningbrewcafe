import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMenuItems, initialReviews, initialReservations, initialOrders } from '../../server/seedData.js';

const CafeContext = createContext();

export const CafeProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState(initialReviews);
  const [reservations, setReservations] = useState(initialReservations);
  const [orders, setOrders] = useState(initialOrders);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(initialOrders[0]);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Fetch Menu from backend
  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setMenuItems(data.items);
        }
      }
    } catch (err) {
      console.log('Using initial menu fallback');
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.reviews) setReviews(data.reviews);
      }
    } catch (err) {
      console.log('Using initial reviews fallback');
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
          if (data.orders.length > 0 && !activeTrackingOrder) {
            setActiveTrackingOrder(data.orders[0]);
          }
        }
      }
    } catch (err) {
      console.log('Using initial orders fallback');
    }
  };

  // Fetch Reservations
  const fetchReservations = async () => {
    try {
      const res = await fetch('/api/reservations');
      if (res.ok) {
        const data = await res.json();
        if (data.reservations) setReservations(data.reservations);
      }
    } catch (err) {
      console.log('Using initial reservations fallback');
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchReviews();
    fetchOrders();
    fetchReservations();
  }, []);

  // Submit Order
  const submitOrder = async (orderPayload) => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setOrders(prev => [data.order, ...prev]);
      setActiveTrackingOrder(data.order);
      addToast(`☕ Order #${data.order.id} placed successfully!`, 'success');
      return { success: true, order: data.order };
    } catch (err) {
      // Offline fallback
      const fallbackOrder = {
        id: `MB-${Math.floor(10000 + Math.random() * 90000)}`,
        ...orderPayload,
        orderStatus: 'Placed',
        paymentStatus: 'Paid',
        estimatedTime: '15-20 mins',
        createdAt: new Date().toISOString()
      };
      setOrders(prev => [fallbackOrder, ...prev]);
      setActiveTrackingOrder(fallbackOrder);
      addToast(`☕ Order #${fallbackOrder.id} confirmed!`, 'success');
      return { success: true, order: fallbackOrder };
    } finally {
      setLoading(false);
    }
  };

  // Submit Reservation
  const submitReservation = async (reservationPayload) => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to book table');

      setReservations(prev => [data.reservation, ...prev]);
      addToast(`✨ Table reserved: ${data.reservation.tableZone}`, 'success');
      return { success: true, reservation: data.reservation };
    } catch (err) {
      const fallbackRes = {
        id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
        ...reservationPayload,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      setReservations(prev => [fallbackRes, ...prev]);
      addToast(`✨ Table reserved: ${fallbackRes.tableZone}`, 'success');
      return { success: true, reservation: fallbackRes };
    } finally {
      setLoading(false);
    }
  };

  // Submit Review
  const submitReview = async (reviewPayload) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post review');

      setReviews(prev => [data.review, ...prev]);
      addToast('🌟 Thank you for your review!', 'success');
      return { success: true };
    } catch (err) {
      const fallbackRev = {
        id: `rev-${Date.now()}`,
        ...reviewPayload,
        date: 'Just now',
        likes: 0
      };
      setReviews(prev => [fallbackRev, ...prev]);
      addToast('🌟 Thank you for your review!', 'success');
      return { success: true };
    }
  };

  // Update order status (for Admin or simulation)
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(prev => prev.map(o => o.id === orderId ? data.order : o));
        if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
          setActiveTrackingOrder(data.order);
        }
        addToast(`Order #${orderId} updated to "${newStatus}"`, 'info');
      }
    } catch (err) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
        setActiveTrackingOrder(prev => ({ ...prev, orderStatus: newStatus }));
      }
      addToast(`Order #${orderId} updated to "${newStatus}"`, 'info');
    }
  };

  // Admin menu management
  const addMenuItem = (newItem) => {
    setMenuItems(prev => [newItem, ...prev]);
    addToast(`Added "${newItem.name}" to menu`, 'success');
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
    addToast(`Updated "${updatedItem.name}"`, 'info');
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(prev => prev.filter(i => i.id !== itemId));
    addToast('Menu item removed', 'warning');
  };

  return (
    <CafeContext.Provider
      value={{
        menuItems,
        setMenuItems,
        selectedCategory,
        setSelectedCategory,
        selectedDietary,
        setSelectedDietary,
        searchQuery,
        setSearchQuery,
        reviews,
        reservations,
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        customizingItem,
        setCustomizingItem,
        toasts,
        addToast,
        removeToast,
        loading,
        submitOrder,
        submitReservation,
        submitReview,
        updateOrderStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        refreshData: () => {
          fetchMenu();
          fetchReviews();
          fetchOrders();
          fetchReservations();
        }
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => useContext(CafeContext);
