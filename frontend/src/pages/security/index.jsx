import React from 'react';
import PageTitle from '@common/pageTitle';
import styles from '@styles/security-page.module.css';

const SecurityPage = () => {
  return (
    <div className={styles['security-page']}>
      <PageTitle title='Security' back='/settings' />

      <h1>Security Page</h1>
    </div>
  );
};
export default SecurityPage;
