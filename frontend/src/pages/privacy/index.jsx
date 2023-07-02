import React from 'react';
import { useTheme, useUser, useProfile, useAbout } from '@hooks';
import PageTitle from '@common/pageTitle';
import styles from '@styles/privacy-page.module.css';

const PrivacyPage = () => {
  return (
    <div className={styles['privacy-page']}>
      <PageTitle title='Privacy' back='/settings' />

      <h1>Privacy Page</h1>
    </div>
  );
};
export default PrivacyPage;
