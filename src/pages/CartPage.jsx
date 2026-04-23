import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';
import styles from './cartPage.module.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const actualPrice =
        item.discont_price !== null ? item.discont_price : item.price;
      return sum + actualPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const formatPrice = (value) => {
    return value.toFixed(2).replace('.', ',');
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) return;
    if (cartItems.length === 0) return;

    setShowModal(true);
    dispatch(clearCart());

    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <h1 className={styles.title}>Shopping cart</h1>

          <Link to="/" className={styles.backButton}>
            Back to the store
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyBlock}>
            <p className={styles.emptyText}>Looks like you have no items in your basket currently.</p>
            <Link to="/products" className={styles.continueButton}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.list}>
              {cartItems.map((item) => {
                const actualPrice =
                  item.discont_price !== null ? item.discont_price : item.price;

                return (
                  <article key={item.id} className={styles.card}>
                    <Link to={`/products/${item.slug}`} className={styles.imageLink}>
                      <img
                        src={`http://localhost:3333${item.image}`}
                        alt={item.title}
                        className={styles.image}
                      />
                    </Link>

                    <div className={styles.cardInfo}>
                      <div className={styles.cardTop}>
                        <h3 className={styles.cardTitle}>{item.title}</h3>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          ×
                        </button>
                      </div>

                      <div className={styles.cardBottom}>
                        <div className={styles.counter}>
                          <button
                            type="button"
                            className={styles.counterButton}
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            −
                          </button>

                          <span className={styles.counterValue}>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            className={styles.counterButton}
                            onClick={() => dispatch(increaseQuantity(item.id))}
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.prices}>
                          <span className={styles.currentPrice}>
                            ${actualPrice * item.quantity}
                          </span>

                          {item.discont_price !== null && (
                            <span className={styles.oldPrice}>${item.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order details</h2>

              <p className={styles.itemsCount}>{totalItems} items</p>

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>${formatPrice(totalPrice)}</span>
              </div>

              <form className={styles.form} onSubmit={handleOrder}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />

                <button type="submit" className={styles.orderButton}>
                  Order
                </button>
              </form>
            </div>
          </div>
        )}

        {showModal && (
          <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalTop}>
                <h3 className={styles.modalTitle}>Congratulations!</h3>

                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <p className={styles.modalText}>
                Your order has been successfully placed on the website.
              </p>

              <p className={styles.modalText}>
                A manager will contact you shortly to confirm your order.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;