import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { registerUser } from '../../redux';
import styles from './register.module.css';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      await dispatch(registerUser(email, password));
      navigate('/projects');
    } catch (error) {
      setErr('Email in use', error);
    }
  };

  return (
    <main className={styles.login}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
