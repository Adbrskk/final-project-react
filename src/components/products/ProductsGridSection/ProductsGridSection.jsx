import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import {
  fetchAllProducts,
  resetProductsState,
} from '../../../features/products/productSlice';
import styles from './productsGridSection.module.css';

const ProductsGridSection = ({ title, breadcrumbs, mode = 'category' }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart?.items || []);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discountOnly, setDiscountOnly] = useState(false);

  useEffect(() => {
    if (mode === 'all' || mode === 'sales') {
      dispatch(resetProductsState());
      dispatch(fetchAllProducts());
    }
  }, [dispatch, mode]);

  const filteredProducts = useMemo(() => {
    return items
      .filter((product) => {
        const actualPrice =
          product.discont_price !== null ? product.discont_price : product.price;

        const matchesFrom =
          priceFrom === '' || actualPrice >= Number(priceFrom);
        const matchesTo = priceTo === '' || actualPrice <= Number(priceTo);

        const salesFilter = mode === 'sales'
          ? product.discont_price !== null
          : true;

        const matchesDiscount =
          !discountOnly || product.discont_price !== null;

        return matchesFrom && matchesTo && matchesDiscount && salesFilter;
      });
  }, [items, priceFrom, priceTo, discountOnly, mode]);

  const getDiscountPercent = (price, discontPrice) => {
    if (!price || !discontPrice) return 0;
    return Math.round(((price - discontPrice) / price) * 100);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map((item, index) =>
            item.to ? (
              <Link key={index} to={item.to} className={styles.breadcrumbLink}>
                {item.label}
              </Link>
            ) : (
              <span key={index} className={styles.breadcrumbCurrent}>
                {item.label}
              </span>
            )
          )}
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Price</span>
            <input
              type="number"
              placeholder="from"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="to"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className={styles.input}
            />
          </div>

          <label className={styles.checkboxGroup}>
            <span className={styles.filterLabel}>Discounted items</span>
            <input
              type="checkbox"
              checked={discountOnly}
              onChange={(e) => setDiscountOnly(e.target.checked)}
              className={styles.checkbox}
            />
          </label>
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
            {filteredProducts.map((product) => {
              const isInCart = cartItems.some((item) => item.id === product.id);
              const hasDiscount = product.discont_price !== null;
              const discount = hasDiscount
                ? getDiscountPercent(product.price, product.discont_price)
                : 0;

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

                    {hasDiscount && (
                      <span className={styles.badge}>-{discount}%</span>
                    )}

                    <button
                      className={isInCart ? styles.addedButton : styles.cartButton}
                      disabled={isInCart}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        if (!isInCart) {
                          dispatch(addToCart(product));
                        }
                      }}
                    >
                      {isInCart ? 'Added' : 'Add to cart'}
                    </button>
                  </div>

                  <div className={styles.info}>
                    <h3 className={styles.cardTitle}>{product.title}</h3>

                    <div className={styles.prices}>
                      <span className={styles.currentPrice}>
                        $
                        {product.discont_price !== null
                          ? product.discont_price
                          : product.price}
                      </span>

                      {product.discont_price !== null && (
                        <span className={styles.oldPrice}>${product.price}</span>
                      )}
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

export default ProductsGridSection;