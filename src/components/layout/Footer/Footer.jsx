import styles from './footer.module.css';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.label}>Phone</p>
            <a href="tel:+493091588492" className={styles.value}>
              +49 30 915-88492
            </a>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Socials</p>
            <div className={styles.socials}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <img
                  src="/assets/icons/instagram.png"
                  alt="Instagram"
                  className={styles.icon}
                />
              </a>

              <a
                href="https://wa.me/493091588492"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="WhatsApp"
              >
                <img
                  src="/assets/icons/whatsapp.png"
                  alt="WhatsApp"
                  className={styles.icon}
                />
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Address</p>
            <p className={styles.value}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Working Hours</p>
            <p className={styles.value}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            title="Pet shop location"
            src="https://www.google.com/maps?q=Wallstraße%209-13,%2010179%20Berlin&z=15&output=embed"
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;