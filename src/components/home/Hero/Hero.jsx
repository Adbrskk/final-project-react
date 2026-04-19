import { Link } from 'react-router-dom';
import styles from './hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Amazing Discounts
            <br />
            on Pets Products!
          </h1>

          <Link to="/sales" className={styles.button}>
            Check out
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;