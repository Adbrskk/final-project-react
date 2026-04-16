import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Home Page</h1>

      {status === 'loading' && <p>Loading...</p>}

      {items.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price}$</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;