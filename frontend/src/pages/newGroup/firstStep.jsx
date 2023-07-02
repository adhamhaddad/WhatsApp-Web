import React from 'react';
import styles from '@styles/new-group.module.css';

const FirstStep = ({ contactList }) => {
  return (
    <>
      <input
        type='text'
        placeholder='Type contact name'
        className={styles['search']}
      />
      <ul className={styles['contacts-list']}>{contactList && contactList}</ul>
    </>
  );
};
export default FirstStep;
