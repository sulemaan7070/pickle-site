'use client';

import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './CartProvider';

/** Cart icon in the top bar. The red badge shows how many packs are in the cart. */
export default function CartButton() {
  const { count, openCart } = useCart();

  return (
    <IconButton color="inherit" aria-label={`Open cart, ${count} items`} onClick={openCart}>
      <Badge badgeContent={count} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
