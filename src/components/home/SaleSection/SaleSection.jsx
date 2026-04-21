import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../../../features/products/productSlice';
import { addToCart } from '../../../features/cart/cartSlice';
import styles from './saleSection.module.css';

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, status]);

  const discountedProducts = items
    .filter((product) => product.discont_price !== null)
    .slice(0, 4);

  const getDiscountPercent = (price, discontPrice) => {
    if (!price || !discontPrice) return 0;
    return Math.round(((price - discontPrice) / price) * 100);
  };

  return (
    <section id="sale" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Sale</h2>
            <div className={styles.line}></div>
          </div>

          <Link to="/sales" className={styles.button}>
            All sales
          </Link>
        </div>

        {status === 'loading' && (
          <p className={styles.message}>Loading...</p>
        )}

        {status === 'failed' && (
          <p className={styles.message}>
            {error || 'Something went wrong'}
          </p>
        )}

        {status === 'succeeded' && (
          <div className={styles.grid}>
            {discountedProducts.map((product) => {
              const discount = getDiscountPercent(
                product.price,
                product.discont_price
              );

              return (
                <Link
                  to={`/products/${product.slug}`}
                  key={product.id}
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={`http://localhost:3333${product.image}`}
                      alt={product.title}
                      className={styles.image}
                    />

                    <span className={styles.badge}>
                      -{discount}%
                    </span>
                  </div>

                  <div className={styles.info}>
                    <h3 className={styles.cardTitle}>{product.title}</h3>

                    <div className={styles.prices}>
                      <span className={styles.currentPrice}>
                        ${product.discont_price}
                      </span>

                      <span className={styles.oldPrice}>
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SaleSection;