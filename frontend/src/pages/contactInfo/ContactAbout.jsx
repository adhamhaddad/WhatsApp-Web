import React from 'react';
import styles from '@styles/contact-about.module.css';

const ContactAbout = ({ loading, about }) => {
  return (
    <div className={styles['contact-about']}>
      <span>About</span>
      <p>
        {loading && 'Loading About...'}
        {!loading && about}
      </p>
    </div>
  );
};
export default ContactAbout;
