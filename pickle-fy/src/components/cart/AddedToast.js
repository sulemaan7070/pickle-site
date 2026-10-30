'use client';

import { Button, Snackbar } from '@mui/material';
import { useCart } from './CartProvider';

/** Small "Added to cart" message at the bottom of the screen, with a View cart shortcut. */
export default function AddedToast() {
  const { toast, dismissToast, openCart } = useCart();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return; // keep it until the timer ends
    dismissToast();
  };

  const handleViewCart = () => {
    dismissToast();
    openCart();
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={2500}
      onClose={handleClose}
      message={toast.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <Button size="small" onClick={handleViewCart} sx={{ color: '#F0AE0A', fontWeight: 700 }}>
          View cart
        </Button>
      }
    />
  );
}
