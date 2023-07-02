import React, { createContext, useState, useEffect } from 'react';
import { useApi } from '@config';
import { useAuth } from '@hooks';

export const ChatContext = createContext({
  chats: [],
  loading: false,
  handleDeleteChat: () => {},
  handleUpdateChat: () => {}
});

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const { get, patch, deleteFunc, loading } = useApi();
  const { user } = useAuth();

  const getChats = async () => {
    try {
      const response = await get(`/chats/all/${user.id}`);
      setChats(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateChat = async (id) => {
    try {
      const response = await patch(`chats/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteChat = async (id) => {
    try {
      const response = await deleteFunc(`chats/${id}`);
      setChats((prev) => prev.filter((chat) => chat.id !== response.data.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const values = {
    chats,
    loading,
    handleDeleteChat: deleteChat,
    handleUpdateChat: updateChat
  };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};
export default ChatProvider;
