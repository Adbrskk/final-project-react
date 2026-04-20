import Hero from '../components/home/Hero/Hero';
import CategoriesSection from '../components/home/CategoriesSection/CategoriesSection';
import DiscountSection from '../components/home/DiscountSection/DiscountSection';
import SaleSection from '../components/home/SaleSection/SaleSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <DiscountSection />
      <SaleSection />
    </>
  );
};

export default HomePage;