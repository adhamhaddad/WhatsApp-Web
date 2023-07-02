import React, { useState, useEffect } from 'react';
import { API_URL } from '@config';
import { useProfile, useTheme } from '@hooks';
import Modal from '@common/modal';
import styles from '@styles/profileImage.module.css';

const ProfileImage = () => {
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState(false);
  const { profile, handleUpload, deleteProfilePicture } = useProfile();
  const { theme } = useTheme();

  const handleOptions = () => {
    setOptions((prev) => !prev);
  };
  const handleResetFile = () => {
    setFile(null);
  };

  const handleFilePick = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleImageUpload = () => {
    handleUpload({ file }, (data) => {
      setFile(data);
      setOptions(false);
    });
  };
  return (
    <>
      <div className={styles['profile-img']} onClick={handleOptions}>
        {!profile.image_url && (
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
        {profile.image_url && (
          <img
            src={`${API_URL}/${profile.image_url}`}
            crossOrigin='anonymous'
            alt='profile'
            loading='lazy'
          />
        )}
      </div>
      {options && (
        <ul className={`${styles['options']} ${styles[theme.palette.type]}`}>
          <li>View photo</li>
          <li>
            <label htmlFor='file'>Upload photo</label>
            <input
              type='file'
              id='file'
              onChange={handleFilePick}
              className={styles['upload-image']}
            />
          </li>
          <li onClick={deleteProfilePicture}>Remove photo</li>
        </ul>
      )}
      {file && (
        <Modal onClick={handleOptions}>
          <div
            className={`${styles['upload-modal']} ${
              styles[theme.palette.type]
            }`}
          >
            <div className={styles['upload-control']}>
              <button
                className={styles['close-button']}
                onClick={handleResetFile}
              >
                <svg
                  viewBox='0 0 24 24'
                  height='24'
                  width='24'
                  fill='currentColor'
                  enableBackground='new 0 0 24 24'
                  xmlSpace='preserve'
                >
                  <path d='M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z'></path>
                </svg>
              </button>
              <h3>Drag the image to adjust</h3>
              <button>
                <svg
                  viewBox='0 0 24 24'
                  height='24'
                  width='24'
                  x='0px'
                  y='0px'
                  xmlSpace='preserve'
                >
                  <path
                    fill='currentColor'
                    d='M19.77,11.73c0,1.64-0.5,2.95-1.48,3.89c-1.38,1.32-3.26,1.41-3.75,1.41c-0.07,0-0.11,0-0.12,0l-5.41,0v-2.1 h5.46c0.05,0,1.47,0.04,2.38-0.84c0.55-0.53,0.82-1.32,0.82-2.37c0-1.27-0.33-2.23-0.99-2.84c-0.98-0.92-2.43-0.85-2.44-0.85 l-4.23,0v3.1L4,7.07L10.01,3v2.93h4.16c0.03,0,2.29-0.13,3.95,1.42C19.21,8.38,19.77,9.85,19.77,11.73z'
                  ></path>
                </svg>
                Upload
              </button>
            </div>
            <div className={styles['picked-image']}>
              <img src={URL.createObjectURL(file)} alt='profile' />
            </div>
            <div className={styles['upload-bottom']}>
              <button
                className={styles['upload-button']}
                onClick={handleImageUpload}
              >
                <svg
                  viewBox='0 0 30 30'
                  height='30'
                  width='30'
                  x='0px'
                  y='0px'
                  enableBackground='new 0 0 30 30'
                  xmlSpace='preserve'
                >
                  <path
                    fill='currentColor'
                    d='M9.9,21.25l-6.7-6.7L1,16.75l8.9,8.9L29,6.55l-2.2-2.2L9.9,21.25z'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default ProfileImage;
