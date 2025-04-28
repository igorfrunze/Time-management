import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../redux';
import { Button } from '../../components';
import styles from './login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await dispatch(userData(email, password));
      navigate('/projects');
    } catch (error) {
      setErr('Something went wrong, please try again', error);
    }
  };

  return (
    <main className={styles.login}>
      <h1>Enter</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input_email}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          className={styles.input_password}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Button>Send</Button>
        {err && <p className={styles.err}>{err}</p>}
      </form>
    </main>
  );
};
