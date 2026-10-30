'use client';

import { Avatar, IconButton, ListItem, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { getPrice, getProduct } from '@/data/products';
import { useCart } from './CartProvider';

/** One row in the cart panel: photo, name, size, quantity buttons and line total. */
export default function CartLine({ line }) {
  const { changeQuantity, removeFromCart } = useCart();
  const product = getProduct(line.id);
  const price = getPrice(product, line.size);

  return (
    <ListItem alignItems="flex-start" sx={{ gap: 1.5, py: 1.5 }}>
      <Avatar variant="rounded" src={product.image} alt={product.name} sx={{ width: 64, height: 64 }} />

      <div className="min-w-0 flex-1">
        <Typography sx={{ fontWeight: 700, lineHeight: 1.25 }}>{product.name}</Typography>
        <Typography sx={{ fontSize: 14, color: '#6a7a4f' }}>
          {line.size} · ₹{price}
        </Typography>

        <div className="mt-1 flex items-center gap-1">
          <IconButton
            size="small"
            aria-label="Decrease quantity"
            onClick={() => changeQuantity(line.id, line.size, line.qty - 1)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{line.qty}</Typography>
          <IconButton
            size="small"
            aria-label="Increase quantity"
            onClick={() => changeQuantity(line.id, line.size, line.qty + 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <IconButton
          size="small"
          aria-label={`Remove ${product.name} ${line.size}`}
          onClick={() => removeFromCart(line.id, line.size)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ fontWeight: 700 }}>₹{price * line.qty}</Typography>
      </div>
    </ListItem>
  );
}
