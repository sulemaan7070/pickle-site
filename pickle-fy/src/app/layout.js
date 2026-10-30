import { Poppins } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { CartProvider } from '@/components/cart/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import AddedToast from '@/components/cart/AddedToast';
import PickleLoader from '@/components/loader/PickleLoader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import PromoModal from '@/components/promo/PromoModal';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins', // used by the Material UI theme
  display: 'swap',
});

export const metadata = {
  title: 'Pickle-Fy | Real Flavours. Local Roots.',
  description:
    'Small-batch pickles made with age-old spices & fresh ingredients. No preservatives, no palm oil. Order boneless chicken pickle, gongura and tokku on WhatsApp.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ThemeRegistry>
          <CartProvider>
            <PickleLoader />
            <SmoothScroll />
            {children}
            <CartDrawer />
            <AddedToast />
            <PromoModal />
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
