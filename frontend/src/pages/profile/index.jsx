import React from 'react';
import { useTheme } from '@hooks';
import PageTitle from '@common/pageTitle';
import ProfileImage from './profileImage';
import UserName from './username';
import About from './about';
import styles from '@styles/profile.module.css';

const Profile = () => {
  const { theme } = useTheme();

  return (
    <div className={`${styles['profile-page']} ${styles[theme.palette.type]}`}>
      <PageTitle title='Profile' back='/' />
      <div className={styles['profile-view']}>
        <ProfileImage />
        <UserName />
        <p className={styles['user-hint']}>
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
        <About />
      </div>
    </div>
  );
};
export default Profile;
