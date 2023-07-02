import CryptoJS from 'crypto-js';

export const encryptedMessage = (message, encryptionKey) =>
  CryptoJS.AES.encrypt(message, encryptionKey).toString();

export const decryptedMessage = (encryptedMessage, encryptionKey) =>
  CryptoJS.AES.decrypt(encryptedMessage, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );
