import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '@hooks';
import { useApi } from '@config';

export const AboutContext = createContext({
  about: { id: null, about: '' },
  loading: false,
  handleChange: () => {},
  handleUpdate: () => {}
});

const AboutProvider = ({ children }) => {
  const [about, setAbout] = useState({ id: null, about: '' });
  const { user } = useAuth();
  const { get, patch, loading } = useApi();

  const getAbout = async () => {
    try {
      const response = await get(`/abouts/${user.id}`);
      setAbout(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateAbout = async (cb) => {
    const body = {
      about: about.about
    };
    try {
      const response = await patch(`/abouts/${about.id}`, body);
      setAbout(response.data);
      cb(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setAbout((prev) => ({ ...prev, about: event.target.value }));
  };

  useEffect(() => {
    getAbout();
  }, []);

  const values = {
    about,
    loading,
    handleChange: handleChange,
    handleUpdate: updateAbout
  };
  return (
    <AboutContext.Provider value={values}>{children}</AboutContext.Provider>
  );
};
export default AboutProvider;
