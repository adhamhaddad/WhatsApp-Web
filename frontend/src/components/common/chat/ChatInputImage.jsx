import React, { useState } from 'react';
import styles from '@styles/chat-input-image.module.css';

const ChatInputImage = ({ message, setMessage, conversation_id }) => {
  const handleCancel = () => {
    setMessage((prev) => ({ ...prev, image_url: [] }));
  };

  const handleChange = (prop) => (event) => {
    setMessage((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  return (
    <div className={styles['chat-input-image']}>
      <div className={styles['chat-input-header']}>
        <button className={styles['cancel-button']} onClick={handleCancel}>
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
      </div>

      <div className={styles['chat-input-content']}>
        <img src='' alt='' />
      </div>

      <div className={styles['message-box']}>
        <textarea
          placeholder='Type a message'
          value={message.message}
          onChange={handleChange('message')}
        ></textarea>
      </div>
      <div className={styles['chat-control']}>
        <div className={styles['chat-image']}>
          <button>x</button>
          <img src='' alt='' />
        </div>

        <button className={styles['add-button']}>
          <span className={styles['add-button-svg']}>
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M20,13.5h-6.5V20h-2.9v-6.5H4v-2.9h6.5V4h2.9v6.5H20V13.5z'
              ></path>
            </svg>
          </span>
        </button>

        <button className={styles['send-button']}>
          <span className={styles['send-button-count']}>2</span>
          <span className={styles['send-button-svg']}>
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z'
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};
export default ChatInputImage;
