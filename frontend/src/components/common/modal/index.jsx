import React from 'react';
import ReactDOM from 'react-dom';
import styles from '@styles/modal.module.css';

const Backdrop = ({ onClick }) => {
  return <div className={styles['backdrop']} onClick={onClick}></div>;
};
const Overlay = ({ children }) => {
  return (
    <div className={styles['overlay']}>
      {children}
    </div>
  );
};
const Modal = ({ children, onClick }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById('overlay')
      )}
      {ReactDOM.createPortal(
        <Overlay children={children} />,
        document.getElementById('overlay')
      )}
    </>
  );
};
export default Modal;
