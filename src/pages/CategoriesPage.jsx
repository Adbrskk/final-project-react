import { Link } from 'react-router-dom';
import CategoriesList from '../components/CategoriesList/CategoriesList';
import styles from './categoriesPage.module.css';

const CategoriesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>
            Main page
          </Link>
          <span className={styles.breadcrumbCurrent}>Categories</span>
        </div>

        <h1 className={styles.title}>Categories</h1>
      </div>

      <CategoriesList />
    </div>
  );
};

export default CategoriesPage;