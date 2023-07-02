import { useContext } from 'react';
import { AboutContext } from '@context/AboutContext';

export const useAbout = () => useContext(AboutContext);
