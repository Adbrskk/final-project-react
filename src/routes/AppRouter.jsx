import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import ProductsPage from '../pages/ProductsPage';
import CategoryProductsPage from '../pages/CategoryProductsPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories/:slug" element={<CategoryProductsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;