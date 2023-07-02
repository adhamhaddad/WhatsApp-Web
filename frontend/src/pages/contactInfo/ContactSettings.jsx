import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '@styles/contact-settings.module.css';

const ContactSettings = () => {
  return (
    <div className={styles['contact-settings']}>
      <Link to='/starred-message' exact='true'>
        <span>
          <svg
            viewBox='0 0 16 15'
            height='20'
            preserveAspectRatio='xMidYMid meet'
            version='1.1'
            x='0px'
            y='0px'
            enableBackground='new 0 0 16 15'
            xmlSpace='preserve'
          >
            <path
              fill='currentColor'
              d='M8.3,10.2l-2.5,1.7c-0.3,0.2-0.8-0.1-0.7-0.5L6,8.6c0.1-0.2,0-0.4-0.2-0.5L3.5,6.3C3.1,6,3.3,5.5,3.7,5.5 l3-0.1c0.2,0,0.3-0.1,0.4-0.3l1-2.8c0.1-0.4,0.7-0.4,0.8,0l1,2.8c0.1,0.2,0.2,0.3,0.4,0.3l3,0.1c0.4,0,0.6,0.5,0.3,0.8l-2.4,1.8 C11.1,8.2,11,8.4,11,8.6l0.9,2.9c0.1,0.4-0.3,0.7-0.7,0.5l-2.5-1.7C8.6,10.1,8.4,10.1,8.3,10.2z'
            ></path>
          </svg>
        </span>
        Starred messages
        <span>
          <svg
            viewBox='0 0 10 21'
            height='21'
            width='10'
            preserveAspectRatio='xMidYMid meet'
            version='1.1'
            x='0px'
            y='0px'
            enableBackground='new 0 0 10 21'
            xmlSpace='preserve'
          >
            <path
              fill='currentColor'
              d='M1,15.75l5.2-5.2L1,5.35l1.5-1.5l6.5,6.7l-6.6,6.6L1,15.75z'
            ></path>
          </svg>
        </span>
      </Link>
      <Link to='/starred-message' exact='true'>
        <span>
          <svg
            viewBox='0 0 24 24'
            height='20'
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
        Mute notifications
        <span>
          <svg
            viewBox='0 0 10 21'
            height='21'
            width='10'
            preserveAspectRatio='xMidYMid meet'
            version='1.1'
            x='0px'
            y='0px'
            enableBackground='new 0 0 10 21'
            xmlSpace='preserve'
          >
            <path
              fill='currentColor'
              d='M1,15.75l5.2-5.2L1,5.35l1.5-1.5l6.5,6.7l-6.6,6.6L1,15.75z'
            ></path>
          </svg>
        </span>
      </Link>
    </div>
  );
};
export default ContactSettings;
