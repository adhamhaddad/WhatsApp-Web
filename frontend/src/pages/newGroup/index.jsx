import React, { useState, useEffect } from 'react';
import { useAuth } from '@hooks';
import { useApi } from '@config';
import PageTitle from '@common/pageTitle';
import ContactCard from '@common/cards/contactCard';
import Container from '@UI/container';
import FirstStep from './firstStep';
import SecondStep from './secondStep';
import styles from '@styles/new-group.module.css';

const NewGroup = () => {
  const [contacts, setContacts] = useState([]);
  const [group, setGroup] = useState({
    img_url: '',
    name: '',
    members: [{ user_id: 1 }, { user_id: 3 }]
  });
  const [file, setFile] = useState(null);
  const [steps, setSteps] = useState(1);
  const { user } = useAuth();
  const { get, post } = useApi();
  const getContacts = async () => {
    try {
      const response = await get(`/contacts/all/${user.id}`);
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const contactList =
    contacts.length &&
    contacts.map((contact) => <ContactCard key={contact.phone_number} {...contact} />);

  const handleSteps = () => {
    setSteps((prev) => prev === 1 && steps + 1);
  };
  const handleSubmit = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('icon_url', file);
    formData.append('name', group.name);
    formData.append('user_id', user.id);
    group.members.forEach((member) => {
      formData.append('members[]', member.user_id);
    });
    try {
      const response = await post('/groups', formData);
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getContacts();
    return () => setContacts([]);
  }, []);

  return (
    <>
      <div className={styles['new-group-page']}>
        <PageTitle title='Add group participants' back='/' />
        <Container>
          {steps === 1 && (
            <FirstStep
              contactList={contactList}
              group={group}
              setGroup={setGroup}
            />
          )}
          {steps === 2 && (
            <SecondStep
              file={file}
              setFile={setFile}
              group={group}
              setGroup={setGroup}
            />
          )}
          {steps === 1 && (
            <span
              data-testid='arrow-forward'
              data-icon='arrow-forward'
              className={styles['next-button']}
              onClick={handleSteps}
            >
              <svg
                viewBox='0 0 30 30'
                height='30'
                width='30'
                preserveAspectRatio='xMidYMid meet'
                version='1.1'
                x='0px'
                y='0px'
                enableBackground='new 0 0 30 30'
                xmlSpace='preserve'
              >
                <path
                  fill='currentColor'
                  d='M15,7l-1.4,1.4l5.6,5.6H7v2h12.2l-5.6,5.6L15,23l8-8L15,7z'
                ></path>
              </svg>
            </span>
          )}

          {steps === 2 && group.name.length > 0 && (
            <span
              data-testid='arrow-forward'
              data-icon='arrow-forward'
              className={styles['next-button']}
              onClick={handleSubmit}
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
                  d='M8,17.1l-5.2-5.2l-1.7,1.7l6.9,7L22.9,5.7L21.2,4L8,17.1z'
                ></path>
              </svg>
            </span>
          )}
        </Container>
      </div>
    </>
  );
};
export default NewGroup;
