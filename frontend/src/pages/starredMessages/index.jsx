import React from 'react';
import PageTitle from '@common/pageTitle';
import styles from '@styles/starred-messages.module.css';

const StarredMessagesPage = () => {
  return (
    <div className={styles['starred-messages-page']}>
      <PageTitle title='Starred Message' back='/' />
    </div>
  );
};
export default StarredMessagesPage;
