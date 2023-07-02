import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '@hooks';
import { useApi } from '@config';

export const ProfileContext = createContext({
  profile: { id: null, image_url: null },
  loading: false,
  handleUpload: () => {},
  handleDelete: () => {}
});

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({ id: null, image_url: null });
  const { user } = useAuth();
  const { get, post, patch, deleteFunc, loading } = useApi();

  const getProfilePicture = async () => {
    try {
      const response = await get(`/profile-pictures/${user.id}`);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfilePicture = async (data, cb) => {
    if (!data.file) {
      return;
    }
    const formData = new FormData();
    formData.append('image_url', data.file);
    try {
      if (profile.image_url === null) {
        formData.append('user_id', user.id);

        const response = await post('/profile-pictures', formData);
        setProfile(response.data);
      }
      if (profile.image_url !== null) {
        const response = await patch(`/profile-pictures/${user.id}`, formData);
        setProfile(response.data);
      }
      cb(null);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProfilePicture = async () => {
    try {
      const response = await deleteFunc(`/profile-pictures/${user.id}`);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  const values = {
    profile,
    loading,
    handleUpload: handleProfilePicture,
    handleDelete: deleteProfilePicture
  };
  return (
    <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>
  );
};
export default ProfileProvider;
