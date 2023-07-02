import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '@hooks';
import { useApi } from '@config';

export const UserContext = createContext({
  user: { id: null, name: '' },
  loading: false,
  handleChange: () => {},
  handleUpdate: () => {},
  handleDelete: () => {}
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, name: '' });
  const { get, patch, loading } = useApi();
  const authCtx = useAuth();

  const getUser = async () => {
    try {
      const response = await get(`/users/${authCtx.user.id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (cb) => {
    const body = {
      name: user.name
    };
    try {
      const response = await patch(`/users/${user.id}`, body);
      setUser(response.data);
      cb(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (cb) => {
    try {
      const response = await patch(`/users/${user.id}`);
      setUser(response.data);
      cb(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, name: event.target.value }));
  };

  useEffect(() => {
    getUser();
  }, []);

  const values = {
    user,
    loading,
    handleChange: handleChange,
    handleUpdate: updateUser,
    handleDelete: deleteUser
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
export default UserProvider;
