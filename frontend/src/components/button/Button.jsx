import styles from './button.module.css';

export const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
};
