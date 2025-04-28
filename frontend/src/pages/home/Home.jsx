import styles from './home.module.css';
import BUSSINESS from '/bussiness.webp';

export const Home = () => {

  return (
    <main className={styles.home}>
      <div className={styles.text}>
        <span style={{ color: '#000000' }}>Your</span>
        <span style={{ color: '#929292' }}>Best</span>
        <span style={{ color: '#616161' }}>App</span>
        <span style={{ color: '#141414' }}>For</span>
        <span style={{ color: '#929292' }}>Managing</span>
        <span style={{ color: '#c2c2c2' }}>Time</span>
      </div>
      <img src={BUSSINESS} alt="image of analytics" />
    </main>
  );
};
