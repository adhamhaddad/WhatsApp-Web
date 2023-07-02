import React, { useState } from 'react';
import { useApi } from '@config';
import { useAuth, useTheme } from '@hooks';
import { encryptedMessage } from '@utils/cryptoUtils';
import styles from '@styles/chat-input.module.css';

const ChatInput = ({ conversation_id, message, setMessage }) => {
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState(false);
  const { post, loading } = useApi();
  const { user } = useAuth();
  const { theme } = useTheme();

  const handleChange = (prop) => (event) => {
    setMessage((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleOptions = () => {
    setOptions((prev) => !prev);
  };

  const createChat = async () => {
    // const message = encryptedMessage(message.message, 'TheKey');
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('participant_id', JSON.stringify([user.id, user_id]));
      formData.append('message', message.message);
      formData.append(
        'image_url',
        JSON.stringify({ image_url: message.image_url })
      );
      formData.append('file_url', message.file_url);
      const response = await post('/chats', formData);
      setMessage({ message: '', image_url: null, file_url: null });
    } catch (error) {
      console.log(error);
    }
  };
  const createMessage = async () => {
    // const messageEncryption = encryptedMessage(message.message, 'TheKey');
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('conversation_id', conversation_id);
      formData.append('message', message.message);
      formData.append('image_url', message.image_url);
      formData.append('file_url', message.file_url);
      const response = await post('/messages', formData);
      setMessage({ message: '', image_url: null, file_url: null });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    if (conversation_id) {
      createMessage();
    } else {
      createChat();
    }
  };

  return (
    <div className={`${styles['chat-input']} ${styles[theme.palette.type]}`}>
      <div>
        <button>
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
              d='M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z'
            ></path>
          </svg>
        </button>
      </div>
      <div className={styles['media-box']}>
        <button
          onClick={handleOptions}
          className={options ? styles['active'] : null}
        >
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
              d='M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698 c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244 c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685 c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211 c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z'
            ></path>
          </svg>
        </button>
        {options && (
          <ul className={styles['options']}>
            <li>
              <button>
                <svg
                  viewBox='0 0 53 53'
                  height='53'
                  width='53'
                  x='0px'
                  y='0px'
                  enableBackground='new 0 0 53 53'
                  xmlSpace='preserve'
                >
                  <g>
                    <path
                      fill='#5157AE'
                      d='M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z'
                    ></path>
                    <path
                      fill='#5F66CD'
                      d='M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z'
                    ></path>
                  </g>
                  <g fill='#F5F5F5'>
                    <path d='M29.09 17.09c-.38-.38-.89-.59-1.42-.59H20.5c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H32.5c1.1 0 2-.9 2-2V23.33c0-.53-.21-1.04-.59-1.41l-4.82-4.83zM27.5 22.5V18L33 23.5H28.5c-.55 0-1-.45-1-1z'></path>
                  </g>
                </svg>
              </button>
            </li>
            <li>
              <button>
                <svg
                  viewBox='0 0 53 53'
                  height='53'
                  width='53'
                  x='0px'
                  y='0px'
                  enableBackground='new 0 0 53 53'
                  xmlSpace='preserve'
                >
                  <g>
                    <path
                      fill='#D3396D'
                      d='M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z'
                    ></path>
                    <path
                      fill='#EC407A'
                      d='M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z'
                    ></path>
                    <rect
                      x='17'
                      y='24.5'
                      fill='#D3396D'
                      width='15'
                      height='9'
                    ></rect>
                  </g>
                  <g fill='#F5F5F5'>
                    <path d='M27.795 17C28.742 17 29.634 17.447 30.2 18.206L30.5 18.609C31.066 19.368 31.958 19.815 32.905 19.815L34.2 19.815C35.746 19.815 37 21.068 37 22.615L37 32C37 34.209 35.209 36 33 36L20 36C17.791 36 16 34.209 16 32L16 22.615C16 21.068 17.254 19.815 18.8 19.815L20.095 19.815C21.042 19.815 21.934 19.368 22.5 18.609L22.8 18.206C23.366 17.447 24.258 17 25.205 17L27.795 17ZM26.5 22.25C23.601 22.25 21.25 24.601 21.25 27.5 21.25 30.399 23.601 32.75 26.5 32.75 29.399 32.75 31.75 30.399 31.75 27.5 31.75 24.601 29.399 22.25 26.5 22.25ZM26.5 24C28.433 24 30 25.567 30 27.5 30 29.433 28.433 31 26.5 31 24.567 31 23 29.433 23 27.5 23 25.567 24.567 24 26.5 24Z'></path>
                  </g>
                </svg>
              </button>
            </li>
            <li>
              <button>
                <svg
                  viewBox='0 0 53 53'
                  height='53'
                  width='53'
                  x='0px'
                  y='0px'
                  enableBackground='new 0 0 53 53'
                  xmlSpace='preserve'
                >
                  <g>
                    <path
                      fill='#AC44CF'
                      d='M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z'
                    ></path>
                    <path
                      fill='#BF59CF'
                      d='M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z'
                    ></path>
                    <rect
                      x='17'
                      y='24.5'
                      fill='#AC44CF'
                      width='18'
                      height='9'
                    ></rect>
                  </g>
                  <g fill='#F5F5F5'>
                    <path d='M18.318 18.25 34.682 18.25C35.545 18.25 36.409 19.077 36.493 19.946L36.5 20.083 36.5 32.917C36.5 33.788 35.68 34.658 34.818 34.743L34.682 34.75 18.318 34.75C17.368 34.75 16.582 34.005 16.506 33.066L16.5 32.917 16.5 20.083C16.5 19.213 17.32 18.342 18.182 18.257L18.318 18.25 34.682 18.25ZM23.399 26.47 19.618 31.514C19.349 31.869 19.566 32.25 20.008 32.25L32.963 32.25C33.405 32.239 33.664 31.848 33.384 31.492L30.702 28.043C30.486 27.774 30.077 27.763 29.861 28.032L27.599 30.759 24.26 26.459C24.045 26.179 23.614 26.179 23.399 26.47ZM31.75 21.25C30.784 21.25 30 22.034 30 23 30 23.966 30.784 24.75 31.75 24.75 32.716 24.75 33.5 23.966 33.5 23 33.5 22.034 32.716 21.25 31.75 21.25Z'></path>
                  </g>
                </svg>
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className={styles['message-box']}>
        <textarea
          placeholder='Type a message'
          value={message.message}
          onChange={handleChange('message')}
        ></textarea>
      </div>
      <div>
        <button onClick={handleSendMessage}>
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
        </button>
      </div>
    </div>
  );
};
export default ChatInput;
