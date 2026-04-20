import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductsGridSection from '../components/products/ProductsGridSection/ProductsGridSection';
import { fetchAllProducts, resetProductsState } from '../features/products/productSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProductsState());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <ProductsGridSection
      title="All products"
      breadcrumbs={[
        { label: 'Main page', to: '/' },
        { label: 'All products' },
      ]}
    />
  );
};

export default ProductsPage;