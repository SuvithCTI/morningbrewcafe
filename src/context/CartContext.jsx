import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('morning_brew_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountFlat, setDiscountFlat] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [orderType, setOrderType] = useState('Dine-In'); // 'Dine-In' | 'Takeaway' | 'Express Delivery'
  const [tipAmount, setTipAmount] = useState(1.50);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('T-04');
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('morning_brew_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, customization = {}) => {
    // Generate a unique key based on id + customization combinations
    const size = customization.size || 'Regular';
    const milk = customization.milk || 'Whole Milk';
    const sweetness = customization.sweetness || '100%';
    const extraShots = customization.extraShots || 0;
    const syrup = customization.syrup || 'None';
    const notes = customization.notes || '';

    // Size multiplier
    let sizeExtra = 0;
    if (size === 'Large') sizeExtra = 0.85;
    if (size === 'Small') sizeExtra = -0.40;

    // Extra shots ($0.75 each)
    const shotsExtra = extraShots * 0.75;

    // Plant milk extra ($0.50)
    const milkExtra = (milk === 'Oat Milk' || milk === 'Almond Milk' || milk === 'Coconut Milk') ? 0.50 : 0;

    // Syrup extra ($0.50)
    const syrupExtra = (syrup !== 'None' && syrup) ? 0.50 : 0;

    const unitPrice = parseFloat((product.price + sizeExtra + shotsExtra + milkExtra + syrupExtra).toFixed(2));
    const cartItemId = `${product.id}-${size}-${milk}-${sweetness}-${extraShots}-${syrup}`;

    setItems(prevItems => {
      const existing = prevItems.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prevItems.map(i =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + (customization.quantity || 1) } : i
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            cartItemId,
            unitPrice,
            quantity: customization.quantity || 1,
            customization: {
              size,
              milk,
              sweetness,
              extraShots,
              syrup,
              notes
            }
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountFlat(0);
    setPromoMessage('');
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BREW20') {
      setDiscountPercent(20);
      setDiscountFlat(0);
      setPromoCode(clean);
      setPromoMessage('🎉 20% discount applied!');
      return { success: true, message: '20% discount applied!' };
    } else if (clean === 'FIRSTSIP') {
      setDiscountPercent(0);
      setDiscountFlat(3.00);
      setPromoCode(clean);
      setPromoMessage('🎉 $3.00 off your order!');
      return { success: true, message: '$3.00 off applied!' };
    } else if (clean === 'MORNINGVIBE') {
      setDiscountPercent(15);
      setDiscountFlat(0);
      setPromoCode(clean);
      setPromoMessage('🎉 15% discount applied!');
      return { success: true, message: '15% discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try "BREW20" or "FIRSTSIP".' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountFlat(0);
    setPromoMessage('');
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const percentageDiscount = (subtotal * discountPercent) / 100;
  const totalDiscount = Math.min(subtotal, percentageDiscount + discountFlat);
  const deliveryFee = orderType === 'Express Delivery' ? (subtotal > 30 ? 0 : 2.99) : 0;
  const tax = (subtotal - totalDiscount) * 0.0825; // 8.25% sales tax
  const total = Math.max(0, subtotal - totalDiscount + deliveryFee + tax + (subtotal > 0 ? tipAmount : 0));

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        promoMessage,
        applyPromoCode,
        removePromoCode,
        orderType,
        setOrderType,
        tipAmount,
        setTipAmount,
        deliveryAddress,
        setDeliveryAddress,
        tableNumber,
        setTableNumber,
        orderNotes,
        setOrderNotes,
        subtotal,
        totalDiscount,
        deliveryFee,
        tax,
        total,
        totalCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
