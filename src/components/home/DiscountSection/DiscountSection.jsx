import { useState } from 'react';
import api from '../../../services/api';
import styles from './discountSection.module.css';

const initialState = {
  name: '',
  phone: '',
  email: '',
};

const DiscountSection = () => {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus('loading');

      const response = await api.post('/sale/send', formData);

      if (response.status === 200) {
        setStatus('success');
        setFormData(initialState);
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2 className={styles.title}>
            5% off on the first order
          </h2>

          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <img
                src="/assets/images/dogs-5-off.png"
                alt="Pets"
                className={styles.image}
              />
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={status === 'success'}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={status === 'success'}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={status === 'success'}
              />

              <button
                type="submit"
                className={
                  status === 'success'
                    ? styles.successButton
                    : styles.button
                }
                disabled={
                  status === 'loading' ||
                  status === 'success'
                }
              >
                {status === 'loading'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Request Submitted'
                  : 'Get a discount'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;