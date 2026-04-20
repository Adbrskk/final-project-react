import { Link } from 'react-router-dom';
import styles from './hero.module.css';

const Hero = () => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero-banner.png)` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Amazing Discounts
            <br />
            on Pets Products!
          </h1>

          <a href="#sale" className={styles.button}>
            Check out
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;