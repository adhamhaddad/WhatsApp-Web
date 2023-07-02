import React from 'react';
import { useTheme } from '@hooks';
import styles from '@styles/loading.module.css';

const LoadingSpinner = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${styles['loading-spinner']} ${styles[theme.palette.type]}`}
    ></div>
  );
};
export default LoadingSpinner;
