import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { selectUser, updateUserData } from '../../redux';

import { Button } from '../../components';
import styles from './settings.module.css';

export const Settings = () => {
  const { email, name, imageURL } = useSelector(selectUser);
  const [newName, setNewName] = useState(name || '');
  const [newImageURL, setNewImageURL] = useState(imageURL || '');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      updateUserData({ email, name: newName, imageURL: newImageURL })
    );
    setMessage(response.message);
    navigate('/projects');
  };

  return (
    <main className={styles.main}>
      <h1>Edit your data</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.email}>
          <span>Email: </span>
          <input className={styles.input_email} value={email} readOnly />
        </div>
        <div className={styles.name}>
          <span>Name: </span>{' '}
          <input
            className={styles.input_name}
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div className={styles.image}>
          <span>Image URL: </span>
          <input
            className={styles.input_imgURL}
            value={newImageURL}
            onChange={(event) => setNewImageURL(event.target.value)}
          />
        </div>
        <Button className={styles.settingsBtn}>Send</Button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </main>
  );
};
