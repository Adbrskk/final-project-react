import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCategories } from '../../features/categories/categoriesSlice';
import styles from './categoriesList.module.css';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, status]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
            {items.map((category) => (
              <Link
                to={`/categories/${category.slug}`}
                key={category.id}
                className={styles.card}
              >
                <img
                  src={`http://localhost:3333${category.image}`}
                  alt={category.title}
                  className={styles.image}
                />
                <h3 className={styles.cardTitle}>{category.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesList;