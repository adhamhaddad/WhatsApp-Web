import { useContext } from 'react';
import { ProfileContext } from '@context/ProfileContext';

export const useProfile = () => useContext(ProfileContext);
