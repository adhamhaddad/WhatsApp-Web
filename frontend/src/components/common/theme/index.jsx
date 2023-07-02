import React, { useState } from 'react';
import { useTheme } from '@hooks';
import styles from '@styles/theme.module.css';

const Theme = ({ onCancel }) => {
  const [pageTheme, setPageTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const { theme, handleTheme } = useTheme();

  const handleChange = (e) => {
    setPageTheme(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTheme(pageTheme);
    onCancel();
  };

  return (
    <div className={`${styles['theme']} ${styles[theme.palette.type]}`}>
      <h3>Theme</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-input']}>
          <input
            type='radio'
            value='light'
            name='theme'
            id='light'
            onChange={handleChange}
          />
          <label htmlFor='light'>Light</label>
        </div>
        <div className={styles['form-input']}>
          <input
            type='radio'
            value='dark'
            name='theme'
            id='dark'
            onChange={handleChange}
          />
          <label htmlFor='dark'>Dark</label>
        </div>
        <div className={styles['form-input']}>
          <input
            type='radio'
            value={theme}
            name='theme'
            id='system-default'
            onChange={handleChange}
          />
          <label htmlFor='system-default'>System default</label>
        </div>
        <div className={styles['form-actions']}>
          <button onClick={onCancel} className={styles['cancel-button']}>
            Cancel
          </button>
          <button type='submit' className={styles['ok-button']}>
            OK
          </button>
        </div>
      </form>
    </div>
  );
};
export default Theme;
