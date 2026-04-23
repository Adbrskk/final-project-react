import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import ProductsPage from '../pages/ProductsPage';
import CategoryProductsPage from '../pages/CategoryProductsPage';
import AllProductsPage from '../pages/AllProductsPage';
import SalesPage from '../pages/SalesPage';
import NotFoundPage from '../pages/NotFoundPage';
import CartPage from '../pages/CartPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryProductsPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:slug" element={<ProductsPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;