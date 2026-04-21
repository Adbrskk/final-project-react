import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsGridSection from '../components/products/ProductsGridSection/ProductsGridSection';
import {
  fetchProductsByCategory,
  resetProductsState,
} from '../features/products/productSlice';

const CategoryProductsPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { categoryTitle, products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(resetProductsState());
    dispatch(fetchProductsByCategory(slug));
  }, [dispatch, slug]);

  return (
    <ProductsGridSection
      title={categoryTitle || 'Category'}
      products={products}
      loading={loading}
      error={error}
      breadcrumbs={[
        { label: 'Main page', to: '/' },
        { label: 'Categories', to: '/categories' },
        { label: categoryTitle || 'Category' },
      ]}
    />
  );
};

export default CategoryProductsPage;