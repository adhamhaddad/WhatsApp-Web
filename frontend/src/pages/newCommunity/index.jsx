import React from 'react';
import PageTitle from '@common/pageTitle';
import styles from '@styles/new-community.module.css';

const NewCommunity = () => {
  return (
    <div className={styles['new-community-page']}>
      <PageTitle title='New community' back='/communities' />
      <div className={styles['new-community-view']}>
        <form className={styles['community-form']}>
          <div className={styles['add-image']}></div>
          <input type='text' placeholder='Community name' />
          <textarea
            cols='30'
            rows='10'
            placeholder="What's this community for? It's helpful to add rules for your members."
          ></textarea>
        </form>
      </div>
    </div>
  );
};
export default NewCommunity;
