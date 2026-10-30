'use client';

import { Button, Divider, Drawer, IconButton, List, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { buildOrderLink } from '@/lib/whatsapp';
import { useCart } from './CartProvider';
import CartLine from './CartLine';

/** The cart panel that slides in from the right. Ordering happens on WhatsApp. */
export default function CartDrawer() {
  const { items, count, total, isOpen, closeCart, clearCart } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      PaperProps={{ sx: { width: 'min(420px, 100vw)', bgcolor: '#fbf6e9' } }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Typography component="h2" sx={{ fontWeight: 800, fontSize: 22 }}>
          {count ? `Your cart (${count})` : 'Your cart'}
        </Typography>
        <IconButton aria-label="Close cart" onClick={closeCart}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />

      {count === 0 ? (
        <EmptyCart onBrowse={closeCart} />
      ) : (
        <>
          {/* data-lenis-prevent: this list scrolls on its own while the page is locked */}
          <List data-lenis-prevent sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
            {items.map((line) => (
              <CartLine key={`${line.id}|${line.size}`} line={line} />
            ))}
          </List>
          <Divider />

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <Typography sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 22 }}>₹{total}</Typography>
            </div>

            <Button
              href={buildOrderLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              size="large"
              variant="contained"
              disableElevation
              startIcon={<WhatsAppIcon />}
              sx={{ borderRadius: 99, py: 1.25, bgcolor: '#25D366', color: '#fff', '&:hover': { bgcolor: '#1ebe5b' } }}
            >
              Send order on WhatsApp
            </Button>
            <Button fullWidth color="primary" onClick={clearCart} sx={{ mt: 1 }}>
              Clear cart
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}

function EmptyCart({ onBrowse }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <ShoppingCartIcon sx={{ fontSize: 64, opacity: 0.35 }} />
      <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Your cart is empty</Typography>
      <Button href="#star" variant="contained" color="secondary" disableElevation onClick={onBrowse} sx={{ borderRadius: 99, px: 3 }}>
        Browse star items
      </Button>
    </div>
  );
}
