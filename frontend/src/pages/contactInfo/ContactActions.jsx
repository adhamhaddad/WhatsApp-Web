import React from 'react';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/contact-actions.module.css';

const ContactActions = ({
  loading,
  id,
  first_name,
  last_name,
  is_blocked,
  setContactInfo
}) => {
  const { post, deleteFunc } = useApi();
  const { user } = useAuth();
  const handleBlock = async () => {
    try {
      const response = await post('/blocked-contacts', {
        user_id: user.id,
        contact_id: id
      });
      setContactInfo((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnblock = async () => {
    try {
      const response = await deleteFunc(`/blocked-contacts/${id}`);
      setContactInfo((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles['contact-actions']}>
      <button onClick={is_blocked ? handleUnblock : handleBlock}>
        <span>
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
              d='M12,2.8c-5.3,0-9.7,4.3-9.7,9.7s4.3,9.7,9.7,9.7s9.7-4.3,9.7-9.7S17.3,2.8,12,2.8z  M4.7,12.5c0-4,3.3-7.3,7.3-7.3c1.6,0,3.1,0.5,4.3,1.4L6.1,16.8C5.2,15.6,4.7,14.1,4.7,12.5z M12,19.8c-1.6,0-3-0.5-4.2-1.4 L17.9,8.3c0.9,1.2,1.4,2.6,1.4,4.2C19.3,16.5,16,19.8,12,19.8z'
            ></path>
          </svg>
        </span>
        {is_blocked ? 'Unblock' : 'Block'} {first_name} {last_name}
      </button>
      <button>
        <span>
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
            <g>
              <g id='thumb-down'>
                <path
                  fill='currentColor'
                  d='M14.091,4.2H6.318c-0.691,0-1.295,0.432-1.555,1.036l-2.591,6.132C2.086,11.541,2,11.714,2,11.973v1.641 l0,0V13.7c0,0.95,0.777,1.727,1.727,1.727h5.441L8.305,19.4c0,0.086,0,0.173,0,0.259c0,0.345,0.173,0.691,0.345,0.95l0.95,0.864 l5.7-5.7c0.345-0.345,0.518-0.777,0.518-1.209V5.927C15.818,4.977,15.041,4.2,14.091,4.2z M17.545,4.2v10.364H21V4.2H17.545z'
                ></path>
              </g>
            </g>
          </svg>
        </span>
        Report {loading && 'Loading Name...'} {!loading && first_name}{' '}
        {!loading && last_name}
      </button>
      <button>
        <span>
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
              d='M6,18c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H6V18z M19,3h-3.5l-1-1h-5l-1,1H5v2h14V3z'
            ></path>
          </svg>
        </span>
        Delete chat
      </button>
    </div>
  );
};
export default ContactActions;
