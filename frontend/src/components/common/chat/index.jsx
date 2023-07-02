import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import ChatHeader from './ChatHeader';
import ChatConversation from './ChatConversation';
import ChatInput from './ChatInput';
import ChatInputImage from './ChatInputImage';
import styles from '@styles/chat.module.css';

const Chat = ({
  socket,
  id,
  conversation_id,
  user_id,
  first_name,
  last_name,
  name,
  image_url
}) => {
  const [chat, setChat] = useState({});
  const { get, loading } = useApi();
  const [message, setMessage] = useState({
    message: '',
    image_url: [],
    file_url: []
  });

  return (
    <div className={styles['chat']}>
      <ChatHeader
        id={id}
        user_id={user_id}
        image_url={image_url}
        first_name={first_name}
        last_name={last_name}
        name={name}
      />
      {message.image_url.length > 0 ? (
        <ChatInputImage
          message={message}
          setMessage={setMessage}
          conversation_id={conversation_id}
        />
      ) : (
        <>
          <ChatConversation conversation_id={conversation_id} socket={socket} />
          <ChatInput
            conversation_id={conversation_id}
            message={message}
            setMessage={setMessage}
          />
        </>
      )}
    </div>
  );
};
export default Chat;
