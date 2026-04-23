import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './header.module.css';

const Header = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="/assets/logos/logo.png"
            alt="Pet Shop"
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Main Page
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            All products
          </NavLink>

          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            All sales
          </NavLink>
        </nav>

        <Link to="/cart" className={styles.cartWrapper}>
          <img
            src="/assets/icons/basket.png"
            alt="Cart"
            className={styles.cartIcon}
          />
          {cartCount > 0 && (
            <span className={styles.badge}>{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;