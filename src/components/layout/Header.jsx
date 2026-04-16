import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>🐾</div>

      <nav style={styles.nav}>
        <Link to="/">Main Page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All products</Link>
        <Link to="/sales">All sales</Link>
      </nav>

      <div style={styles.cart}>🛒</div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  logo: {
    fontSize: '24px',
  },
  cart: {
    fontSize: '20px',
  },
};

export default Header;