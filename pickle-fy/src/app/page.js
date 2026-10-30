import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/hero/HeroCarousel';
import WhyPickleFy from '@/components/sections/WhyPickleFy';
import StarItems from '@/components/sections/StarItems';
import VegPickles from '@/components/sections/VegPickles';
import TrustStrip from '@/components/sections/TrustStrip';

/** The home page: every section, top to bottom. */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <WhyPickleFy />
        <StarItems />
        <VegPickles />
        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
