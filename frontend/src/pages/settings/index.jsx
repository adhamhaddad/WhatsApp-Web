import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@config';
import { useTheme, useUser, useProfile, useAbout } from '@hooks';
import PageTitle from '@common/pageTitle';
import Modal from '@common/modal';
import Theme from '@common/theme';
import styles from '@styles/settings.module.css';

const Settings = () => {
  const [themeStatus, setThemeStatus] = useState(false);
  const { theme } = useTheme();
  const { user } = useUser();
  const { profile } = useProfile();
  const { about } = useAbout();

  const handleTheme = () => {
    setThemeStatus((prev) => !prev);
  };

  return (
    <div className={`${styles['settings-page']} ${styles[theme.palette.type]}`}>
      <PageTitle title='Settings' back='/' />
      <ul className={styles['settings-list']}>
        <li>
          <Link to='/profile' exact='true' className={styles['user-link']}>
            <div className={styles['user-photo']}>
              {profile.image_url !== null ? (
                <img
                  src={`${API_URL}/${profile.image_url}`}
                  crossOrigin='anonymous'
                  alt='Profile-Picture'
                />
              ) : (
                <svg
                  viewBox='0 0 212 212'
                  height='212'
                  width='212'
                  preserveAspectRatio='xMidYMid meet'
                  version='1.1'
                  x='0px'
                  y='0px'
                  enableBackground='new 0 0 212 212'
                  xmlSpace='preserve'
                >
                  <path
                    fill='#DFE5E7'
                    className={styles['background']}
                    d='M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z'
                  ></path>
                  <g>
                    <path
                      fill='#FFFFFF'
                      d='M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z'
                    ></path>
                    <path
                      fill='#FFFFFF'
                      d='M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z'
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            <div className={styles['user-info']}>
              <h3>{user.name}</h3>
              <span>{about.about}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to='/notifications' exact='true'>
            <span className={styles['icon']}>
              <svg
                viewBox='0 0 24 24'
                height='24'
                width='24'
                preserveAspectRatio='xMidYMid meet'
                version='1.1'
                x='0px'
                y='0px'
                enableBackground='new 0 0 24 24'
                xmlSpace='preserve'
              >
                <path
                  fill='currentColor'
                  d='M12,21.7c0.9,0,1.7-0.8,1.7-1.7h-3.4C10.3,20.9,11.1,21.7,12,21.7z M17.6,16.5v-4.7 c0-2.7-1.8-4.8-4.3-5.4V5.8c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3v0.6C8.2,7,6.4,9.1,6.4,11.8v4.7l-1.7,1.7v0.9h14.6v-0.9 L17.6,16.5z'
                ></path>
              </svg>
            </span>
            <span className={styles['title']}>Notifications</span>
          </Link>
        </li>
        <li>
          <Link to='/privacy' exact='true'>
            <span className={styles['icon']}>
              <svg
                viewBox='0 0 28 35'
                height='24'
                width='24'
                preserveAspectRatio='xMidYMid meet'
                version='1.1'
              >
                <path
                  d='M14,1.10204082 C18.5689011,1.10204082 22.2727273,4.80586698 22.2727273,9.37476809 L22.272,12.1790408 L22.3564837,12.181606 C24.9401306,12.294858 27,14.4253101 27,17.0368705 L27,29.4665309 C27,32.1506346 24.824104,34.3265306 22.1400003,34.3265306 L5.85999974,34.3265306 C3.175896,34.3265306 1,32.1506346 1,29.4665309 L1,17.0368705 C1,14.3970988 3.10461313,12.2488858 5.72742704,12.178644 L5.72727273,9.37476809 C5.72727273,4.80586698 9.43109889,1.10204082 14,1.10204082 Z M14,19.5600907 C12.0418995,19.5600907 10.4545455,21.2128808 10.4545455,23.2517007 C10.4545455,25.2905206 12.0418995,26.9433107 14,26.9433107 C15.9581005,26.9433107 17.5454545,25.2905206 17.5454545,23.2517007 C17.5454545,21.2128808 15.9581005,19.5600907 14,19.5600907 Z M14,4.79365079 C11.4617216,4.79365079 9.39069048,6.79417418 9.27759175,9.30453585 L9.27272727,9.52092352 L9.272,12.1760408 L18.727,12.1760408 L18.7272727,9.52092352 C18.7272727,6.91012289 16.6108006,4.79365079 14,4.79365079 Z'
                  fill='currentColor'
                ></path>
              </svg>
            </span>
            <span className={styles['title']}>Privacy</span>
          </Link>
        </li>
        <li>
          <Link to='/security' exact='true'>
            <span className={styles['icon']}>
              <svg
                viewBox='0 0 24 24'
                height='24'
                width='24'
                preserveAspectRatio='xMidYMid meet'
                version='1.1'
              >
                <path
                  d='M12.027027,2 L4,5.56756757 L4,10.9189189 C4,15.8689189 7.42486486,20.4978378 12.027027,21.6216216 C16.6291892,20.4978378 20.0540541,15.8689189 20.0540541,10.9189189 L20.0540541,5.56756757 L12.027027,2 Z M12.027027,11.8018919 L18.2702703,11.8018919 C17.7975676,15.4764865 15.3448649,18.7497297 12.027027,19.7754054 L12.027027,11.8108108 L5.78378378,11.8108108 L5.78378378,6.72702703 L12.027027,3.95324324 L12.027027,11.8018919 Z'
                  fill='currentColor'
                  fillRule='nonzero'
                ></path>
              </svg>
            </span>
            <span className={styles['title']}>Security</span>
          </Link>
        </li>
        <li>
          <Link to='#' onClick={handleTheme}>
            <span className={styles['icon']}>
              <svg
                viewBox='0 0 24 24'
                height='24'
                width='24'
                preserveAspectRatio='xMidYMid meet'
                version='1.1'
              >
                <path
                  d='M12,1 L15.219275,4.21927498 L19.780725,4.21927498 L19.780725,8.78072502 L23,12 L19.780725,15.219275 L19.780725,19.780725 L15.219275,19.780725 L12,23 L8.78072502,19.780725 L4.21927498,19.780725 L4.21927498,15.219275 L1,12 L4.21927498,8.78072502 L4.21927498,4.21927498 L8.78072502,4.21927498 L12,1 Z M12,6 L12,18 C15.31,18 18,15.31 18,12 C18,8.76522727 15.4308833,6.12259298 12.2246968,6.00414409 L12,6 Z'
                  fill='currentColor'
                  fillRule='nonzero'
                ></path>
              </svg>
            </span>
            <span className={styles['title']}>Theme</span>
          </Link>
        </li>
        <li>
          <Link to='/chat-wallpaper' exact='true'>
            <span className={styles['icon']}>
              <svg
                viewBox='0 0 24 24'
                height='24'
                width='24'
                preserveAspectRatio='xMidYMid meet'
                version='1.1'
                x='0px'
                y='0px'
                enableBackground='new 0 0 24 24'
                xmlSpace='preserve'
              >
                <path
                  fill='currentColor'
                  d='M4.9,5.9h6.4V4.1H4.9c-1,0-1.8,0.8-1.8,1.8v6.4h1.8V5.9z M10.2,13.9l-3.6,4.4h10.7 l-2.7-3.6l-1.8,2.4L10.2,13.9z M16.4,9.9c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3s0.6,1.3,1.3,1.3S16.4,10.6,16.4,9.9z M19.1,4.1 h-6.4v1.8h6.4v6.4h1.8V5.9C20.9,4.9,20.1,4.1,19.1,4.1z M19.1,20.1h-6.4v1.8h6.4c1,0,1.8-0.8,1.8-1.8v-6.4h-1.8V20.1z M4.9,13.7H3.1 v6.4c0,1,0.8,1.8,1.8,1.8h6.4v-1.8H4.9V13.7z'
                ></path>
              </svg>
            </span>
            <span className={styles['title']}>Chat wallpaper</span>
          </Link>
        </li>
      </ul>
      {themeStatus && (
        <Modal onClick={handleTheme}>
          <Theme onCancel={handleTheme} />
        </Modal>
      )}
    </div>
  );
};
export default Settings;
