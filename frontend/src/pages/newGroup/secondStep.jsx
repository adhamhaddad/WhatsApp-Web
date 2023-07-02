import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from '@styles/secondStep.module.css';

const SecondStep = ({ group, setGroup, file, setFile }) => {
  const handleChange = (event) => {
    setGroup((prev) => ({ ...prev, name: event.target.value }));
  };
  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  return (
    <div className={styles['second-step']}>
      <div className={styles['profile-img']}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={styles['dropzone']}>
              <input {...getInputProps()} accept='image/*' />
              {file ? (
                <img src={URL.createObjectURL(file)} alt='ADD GROUP ICON' />
              ) : (
                <img src={group.img_url.url} alt='ADD GROUP ICON' />
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div className={styles['input']}>
        <input
          type='text'
          value={group.name}
          placeholder='Group Subject'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
export default SecondStep;
