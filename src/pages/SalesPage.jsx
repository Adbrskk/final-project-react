import ProductsGridSection from '../components/products/ProductsGridSection/ProductsGridSection';

const SalesPage = () => {
  return (
    <ProductsGridSection
      title="Discounted items"
      breadcrumbs={[
        { label: 'Main page', to: '/' },
        { label: 'All sales' },
      ]}
      mode="sales"
    />
  );
};

export default SalesPage;