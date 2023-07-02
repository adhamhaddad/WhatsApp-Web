import React from 'react';
import { useChat, useTheme } from '@hooks';
import Card from '@UI/card';
import LoadingSpinner from '@common/loading';
import styles from '@styles/userChat.module.css';

const UserChat = ({ handleCurrentChat }) => {
  const { chats, loading } = useChat();
  const { theme } = useTheme();

  const chatList =
    chats.length > 0 &&
    chats.map((chat) => (
      <Card key={chat.id} {...chat} handleCurrentChat={handleCurrentChat} />
    ));
  return (
    <div className={`${styles['user-chat']} ${styles[theme.palette.type]}`}>
      {loading && <LoadingSpinner />}
      {!loading && !chatList && (
        <p style={{ color: '#000' }}>No chats found.</p>
      )}
      {!loading && chatList && (
        <ul className={styles['chat-list']}>{chatList}</ul>
      )}
    </div>
  );
};
export default UserChat;
