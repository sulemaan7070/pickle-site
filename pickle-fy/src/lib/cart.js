/**
 * Pure cart helpers (no React in here, so they are easy to read and test).
 *
 * A cart is an array of lines:  { id: 'chicken-pickle', size: '250 g', qty: 2 }
 */
import { getProduct, getPrice } from '@/data/products';

const STORAGE_KEY = 'pickle-fy-cart';

const isSameLine = (line, id, size) => line.id === id && line.size === size;

/** Add one pack. If the same product + size is already there, its quantity goes up. */
export function addItem(items, id, size) {
  if (hasItem(items, id, size)) {
    return items.map((line) => (isSameLine(line, id, size) ? { ...line, qty: line.qty + 1 } : line));
  }
  return [...items, { id, size, qty: 1 }];
}

/** Set a line's quantity. Zero (or less) removes the line. */
export function setItemQuantity(items, id, size, qty) {
  return items
    .map((line) => (isSameLine(line, id, size) ? { ...line, qty } : line))
    .filter((line) => line.qty > 0);
}

export function removeItem(items, id, size) {
  return items.filter((line) => !isSameLine(line, id, size));
}

export function hasItem(items, id, size) {
  return items.some((line) => isSameLine(line, id, size));
}

/** Total number of packs (what the badge on the cart icon shows). */
export function countItems(items) {
  return items.reduce((sum, line) => sum + line.qty, 0);
}

/** Total price in rupees. */
export function totalPrice(items) {
  return items.reduce((sum, line) => sum + getPrice(getProduct(line.id), line.size) * line.qty, 0);
}

/* ---- remembering the cart between visits ---- */

function isValidLine(line) {
  const product = line && getProduct(line.id);
  return Boolean(product && product.prices[line.size] && line.qty > 0);
}

export function loadSavedItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return saved
      .filter(isValidLine)
      .map(({ id, size, qty }) => ({ id, size, qty: Math.floor(qty) }));
  } catch {
    return [];
  }
}

export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be blocked (private mode). The cart still works for this visit.
  }
}
