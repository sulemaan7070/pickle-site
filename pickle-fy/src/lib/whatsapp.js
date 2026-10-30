import { WHATSAPP_NUMBER } from '@/data/site';
import { getProduct } from '@/data/products';
import { totalPrice } from '@/lib/cart';

/** Opens a plain chat with the shop. */
export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Opens a chat with the whole order already typed out. */
export function buildOrderLink(items) {
  const lines = items.map((line) => `• ${getProduct(line.id).name} – ${line.size} × ${line.qty}`);
  const message = [
    'Hi Pickle-Fy! I would like to order:',
    ...lines,
    '',
    `Total: ₹${totalPrice(items)}`,
  ].join('\n');

  return `${WHATSAPP_CHAT_URL}?text=${encodeURIComponent(message)}`;
}
