import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { getSingleProduct } from '../services/api';
import styles from './productsPage.module.css';

const ProductsPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setStatus('loading');
        setError(null);

        const response = await getSingleProduct(slug);
        const data = response.data;

        setProduct(data);
        setActiveImage(data.image || '');
        setStatus('succeeded');
      } catch (err) {
        setStatus('failed');
        setError(err.response?.data?.msg || 'Failed to fetch product');
      }
    };

    fetchProduct();
  }, [slug]);

  const isInCart = useMemo(() => {
    if (!product) return false;
    return cartItems.some((item) => item.id === product.id);
  }, [cartItems, product]);

  const getDiscountPercent = (price, discontPrice) => {
    if (!price || !discontPrice) return 0;
    return Math.round(((price - discontPrice) / price) * 100);
  };

  const handleDecrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        ...product,
        quantity: count,
      })
    );
  };

  if (status === 'loading') {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.message}>Loading...</p>
        </div>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.message}>{error || 'Something went wrong'}</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.message}>Product not found</p>
        </div>
      </section>
    );
  }

  const hasDiscount = product.discont_price !== null;
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.discont_price)
    : 0;

  const currentPrice =
    product.discont_price !== null ? product.discont_price : product.price;

  const shortDescription =
    product.description && product.description.length > 320
      ? `${product.description.slice(0, 320)}...`
      : product.description;

  const displayedDescription = showFullDescription
    ? product.description
    : shortDescription;

  const galleryImages = [product.image, product.image, product.image].filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>
            Main page
          </Link>

          <Link to="/categories" className={styles.breadcrumbLink}>
            Categories
          </Link>

          {product.category?.slug && (
            <Link
              to={`/categories/${product.category.slug}`}
              className={styles.breadcrumbLink}
            >
              {product.category?.title}
            </Link>
          )}

          <span className={styles.breadcrumbCurrent}>{product.title}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.galleryColumn}>
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`${styles.thumbnailButton} ${
                  activeImage === image ? styles.thumbnailButtonActive : ''
                }`}
                onClick={() => setActiveImage(image)}
              >
                <img
                  src={`http://localhost:3333${image}`}
                  alt={`${product.title} ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>

          <div className={styles.mainImageWrapper}>
            <img
              src={`http://localhost:3333${activeImage || product.image}`}
              alt={product.title}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>${currentPrice}</span>

              {hasDiscount && (
                <>
                  <span className={styles.oldPrice}>${product.price}</span>
                  <span className={styles.badge}>-{discount}%</span>
                </>
              )}
            </div>

            <div className={styles.actionsRow}>
              <div className={styles.counter}>
                <button
                  type="button"
                  className={styles.counterButton}
                  onClick={handleDecrease}
                >
                  −
                </button>

                <span className={styles.counterValue}>{count}</span>

                <button
                  type="button"
                  className={styles.counterButton}
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={styles.addButton}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
            </div>

            <div className={styles.descriptionBlock}>
              <h2 className={styles.descriptionTitle}>Description</h2>

              <p className={styles.descriptionText}>{displayedDescription}</p>

              {product.description?.length > 320 && (
                <button
                  type="button"
                  className={styles.readMoreButton}
                  onClick={() => setShowFullDescription((prev) => !prev)}
                >
                  {showFullDescription ? 'Hide' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;