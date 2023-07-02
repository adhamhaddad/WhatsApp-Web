import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '@config';
import { useTheme } from '@hooks';
import ContactInfo from './ContactInfo';
import ContactAbout from './ContactAbout';
import ContactMedia from './ContactMedia';
import ContactActions from './ContactActions';
import ContactSettings from './ContactSettings';
import styles from '@styles/contact-info-page.module.css';

const ContactInfoPage = () => {
  const [contactInfo, setContactInfo] = useState({ is_blocked: false });
  const { get, loading } = useApi();
  const { id } = useParams();
  const { theme } = useTheme();

  const getContact = async () => {
    try {
      const response = await get(`/contacts/${id}`);
      setContactInfo((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
    // return () => setContactInfo({});
  }, []);
  return (
    <div
      className={`${styles['contact-info-page']} ${styles[theme.palette.type]}`}
    >
      <div className={styles['page-title']}>
        <h1>
          <span>
            <Link to='/' exact='true'>
              <svg
                viewBox='0 0 24 24'
                height='24'
                width='24'
                preserveAspectRatio='xMidYMid meet'
                fill='currentColor'
                enableBackground='new 0 0 24 24'
                xmlSpace='preserve'
              >
                <path d='M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z'></path>
              </svg>
            </Link>
            Contact info
          </span>
        </h1>
      </div>
      <div className={styles['contact-page']}>
        <ContactInfo
          loading={loading}
          img_url={contactInfo.img_url}
          first_name={contactInfo.first_name}
          last_name={contactInfo.last_name}
          phone_number={contactInfo.phone_number}
        />
        <ContactAbout loading={loading} about={contactInfo.about} />
        <ContactMedia />
        <ContactSettings />
        <ContactActions
          loading={loading}
          id={contactInfo.id}
          first_name={contactInfo.first_name}
          last_name={contactInfo.last_name}
          is_blocked={contactInfo.is_blocked}
          setContactInfo={setContactInfo}
        />
      </div>
    </div>
  );
};
export default ContactInfoPage;
