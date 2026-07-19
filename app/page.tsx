import HomeHero from '@/components/sections/HomeHero';
import BrandStory from '@/components/sections/BrandStory';
import ProductShowcase from '@/components/sections/ProductShowcase';
import IngredientsSection from '@/components/sections/IngredientsSection';
import Testimonials from '@/components/sections/Testimonials';
import PageTransition from '@/components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      {/* We reset padding top for the hero to be full screen */}
      <div className="-mt-24">
        <HomeHero />
      </div>
      <BrandStory />
      <ProductShowcase />
      <IngredientsSection />
      <Testimonials />
    </PageTransition>
  );
}
