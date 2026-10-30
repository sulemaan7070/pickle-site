'use client';

import { Button, Card, CardContent, Chip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '@/components/cart/CartProvider';
import { PRODUCT_TAGLINE } from '@/data/site';
import { getOriginalPrice, getPrice } from '@/data/products';
import CardImages from './CardImages';
import TagChips from './TagChips';

/**
 * One product in one pack size (e.g. "Boneless Chicken Pickle, 250 g").
 * Its Add to cart button turns grey and says "Added to cart" once the pack is in the cart.
 */
export default function SizeCard({ product, size }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id, size);

  return (
    // This outer div is what the row slider measures, so it carries the card width.
    <div className="shrink-0 grow-0 basis-[78vw] max-w-[340px] sm:basis-[340px] lg:max-w-[420px] lg:basis-[420px]">
      <Card
        elevation={0}
        sx={{ height: '100%', borderRadius: '24px', bgcolor: '#fffdf0', p: 1.5, boxShadow: '0 6px 20px rgba(39,62,16,.12)' }}
      >
        <CardImages product={product} size={size} />

        <CardContent sx={{ textAlign: 'center', px: 1, pt: 2, pb: '8px !important' }}>
          <TagChips />

          <Typography component="h4" sx={{ fontWeight: 500, fontSize: 21, lineHeight: 1.25, color: '#1d1d1b' }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: '#777', fontSize: 14, mt: 0.5, mb: 2 }}>{PRODUCT_TAGLINE}</Typography>

          <div className="mb-3 flex items-center justify-between">
            <Chip label={size} color="primary" size="small" sx={{ fontWeight: 700 }} />
            <Price product={product} size={size} />
          </div>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disableElevation
            disabled={inCart}
            startIcon={inCart ? <CheckIcon /> : <ShoppingCartIcon />}
            aria-label={inCart ? `${product.name} ${size} is in your cart` : `Add ${product.name} ${size} to cart`}
            onClick={() => addToCart(product, size)}
            sx={{ borderRadius: 99, py: 1 }}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/** Selling price in red, with the higher "original" price struck through after it. */
function Price({ product, size }) {
  const price = getPrice(product, size);
  const originalPrice = getOriginalPrice(product, size);

  return (
    <div className="flex items-baseline gap-2">
      <Typography component="span" aria-label={`Now ${price} rupees`} sx={{ fontWeight: 800, fontSize: 26, color: 'secondary.main' }}>
        ₹{price}
      </Typography>
      <Typography
        component="span"
        aria-label={`Original price ${originalPrice} rupees`}
        sx={{ textDecoration: 'line-through', textDecorationThickness: '2px', color: '#8a8a8a', fontSize: 16, fontWeight: 500 }}
      >
        ₹{originalPrice}
      </Typography>
    </div>
  );
}
