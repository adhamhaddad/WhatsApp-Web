import React, { useState, useEffect } from 'react';
import { useAbout, useTheme } from '@hooks';
import styles from '@styles/about.module.css';

const About = () => {
  const [aboutState, setAboutState] = useState(true);
  const { about, handleChange, handleUpdate } = useAbout();
  const { theme } = useTheme();

  const handleChangeState = () => {
    setAboutState((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate((data) => setAboutState(data));
  };

  useEffect(() => {
    return () => setAboutState(true);
  }, []);
  return (
    <div className={`${styles['about-section']} ${styles[theme.palette.type]}`}>
      <label>About</label>
      <div className={styles['input']}>
        <input
          type='text'
          value={about.about}
          onChange={handleChange}
          disabled={aboutState}
        />
        <span onClick={aboutState ? handleChangeState : handleSubmit}>
          {aboutState ? (
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              version='1.1'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z'
              ></path>
            </svg>
          ) : (
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              version='1.1'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z'
              ></path>
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};
export default About;
