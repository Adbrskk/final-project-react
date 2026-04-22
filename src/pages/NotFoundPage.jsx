import { Link } from 'react-router-dom';
import styles from './notFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.four}>4</span>

          <img
            src="assets/images/404-pets.png"
            alt="404"
            className={styles.image}
          />

          <span className={styles.four}>4</span>
        </div>
   
        <h1 className={styles.title}>Page Not Found</h1>

        <p className={styles.text}>
          We’re sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage.
        </p>

        <Link to="/" className={styles.button}>
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;