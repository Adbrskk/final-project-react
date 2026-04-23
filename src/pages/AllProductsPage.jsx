import ProductsGridSection from '../components/products/ProductsGridSection/ProductsGridSection';

const AllProductsPage = () => {
  return (
    <ProductsGridSection
      title="All products"
      breadcrumbs={[
        { label: 'Main page', to: '/' },
        { label: 'All products' },
      ]}
      mode="all"
    />
  );
};

export default AllProductsPage;