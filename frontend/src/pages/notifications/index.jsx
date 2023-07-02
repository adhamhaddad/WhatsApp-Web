import React from 'react';
import PageTitle from '@common/pageTitle';
import styles from '@styles/notifications-page.module.css';

const NotificationsPage = () => {
  return (
    <div className={styles['notifications-page']}>
      <PageTitle title='Notifications' back='/settings' />

      <h1>Notifications Page</h1>
    </div>
  );
};
export default NotificationsPage;
