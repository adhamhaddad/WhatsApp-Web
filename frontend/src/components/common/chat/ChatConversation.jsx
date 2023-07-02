import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import { useAuth, useTheme } from '@hooks';
import MessageCard from '@common/cards/messageCard';
import LoadingSpinner from '@common/loading';
import styles from '@styles/chat-conversation.module.css';

const ChatConversation = ({ conversation_id, socket }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const { get, loading } = useApi();
  const { theme } = useTheme();

  const getMessages = async () => {
    try {
      const response = await get(`/messages/${conversation_id}`);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const messageList =
    messages.length > 0 &&
    messages.map((message) => <MessageCard key={message.id} {...message} />);

  useEffect(() => {
    if (conversation_id) {
      setMessages([]);
      getMessages();
    } else {
      setMessages([]);
    }

    // Socket
    const handleMessage = (data) => {
      if (
        data.action === 'CREATE' &&
        data.data.conversation_id === conversation_id
      ) {
        setMessages((prev) => [...prev, data.data]);
      }
      if (
        data.action === 'UPDATE' &&
        data.data.conversation_id === conversation_id
      ) {
        setMessages((prev) =>
          prev.filter((message) =>
            message.id === data.data.id ? { ...message, ...data.data } : message
          )
        );
      }
      if (
        data.action === 'DELETE' &&
        data.data.conversation_id === conversation_id
      ) {
        setMessages((prev) =>
          prev.filter((message) => message.id !== data.data.id)
        );
      }
    };

    socket.on('messages', handleMessage);

    return () => {
      socket.off('messages', handleMessage);
    };
  }, [conversation_id]);
  return (
    <div
      className={`${styles['chat-conversation']} ${styles[theme.palette.type]}`}
    >
      {!conversation_id && <p>Chat is empty.</p>}
      {loading && <LoadingSpinner />}
      {!loading && <ul>{messageList && messageList}</ul>}
    </div>
  );
};
export default ChatConversation;
