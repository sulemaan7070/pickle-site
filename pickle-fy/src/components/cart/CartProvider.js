'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  addItem,
  countItems,
  hasItem,
  loadSavedItems,
  removeItem,
  saveItems,
  setItemQuantity,
  totalPrice,
} from '@/lib/cart';

/**
 * Keeps the shopping cart for the whole site.
 * Any component can read it with:  const { count, addToCart } = useCart();
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, size, qty }]
  const [isOpen, setIsOpen] = useState(false); // is the cart panel open?
  const [toast, setToast] = useState({ open: false, message: '' }); // "Added to cart" message
  const [hasLoaded, setHasLoaded] = useState(false);

  // Restore the saved cart after the page has loaded in the browser.
  useEffect(() => {
    setItems(loadSavedItems());
    setHasLoaded(true);
  }, []);

  // Save the cart whenever it changes (but not before it has been restored).
  useEffect(() => {
    if (hasLoaded) saveItems(items);
  }, [items, hasLoaded]);

  const value = useMemo(
    () => ({
      items,
      count: countItems(items),
      total: totalPrice(items),
      isInCart: (id, size) => hasItem(items, id, size),

      addToCart: (product, size) => {
        setItems((current) => addItem(current, product.id, size));
        setToast({ open: true, message: `Added to cart: ${product.name} (${size})` });
      },
      changeQuantity: (id, size, qty) => setItems((current) => setItemQuantity(current, id, size, qty)),
      removeFromCart: (id, size) => setItems((current) => removeItem(current, id, size)),
      clearCart: () => setItems([]),

      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),

      toast,
      dismissToast: () => setToast((current) => ({ ...current, open: false })),
    }),
    [items, isOpen, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
