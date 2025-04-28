import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import { fetchUserData, selectToken, selectUser } from '../../redux';
import styles from './header.module.css';
import { useEffect } from 'react';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && user.email && user.id) {
      dispatch(fetchUserData(user.id));
    }
  }, [dispatch, user.id, user.email]);

  const token = useSelector(selectToken);
  const { name, email, imageURL } = useSelector(selectUser);

  const isAuth = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <header>
      {isAuth ? (
        <nav className={styles.navigation}>
          <div className={styles.links}>
            <Link className={styles.home} to="/">
              Home
            </Link>
            <Link className={styles.projects} to="/projects">
              Projects
            </Link>
            <Link className={styles.settings} to="/settings">
              Settings
            </Link>
          </div>
          <div className={styles.userCircle}>
            <span>{name || email || 'User'}</span>
            <img className={styles.circle} src={imageURL} />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </nav>
      ) : (
        <nav className={styles.navigation}>
          <span
            className={styles.time_management}
            onClick={() => navigate('/')}
          >
            Mange your time!
          </span>
          <div className={styles.login_register_area}>
            <Link className={styles.login} to="/login">
              Login
            </Link>
            <Link className={styles.register} to="/register">
              Register
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
