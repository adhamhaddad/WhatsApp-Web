import React, { useState } from 'react';
import { useTheme } from '@hooks';
import Header from '@common/header';
import SearchBar from '@common/searchBar';
import UserChat from '@common/userChat';
import styles from '@styles/home.module.css';

const Home = ({ handleCurrentChat }) => {
  const [filtered, setFiltered] = useState(false);
  const { theme } = useTheme();

  const handleFilter = () => {
    setFiltered((prev) => !prev);
  };

  return (
    <div className={`${styles['home']} ${styles[theme.palette.type]}`}>
      <Header />
      <SearchBar filtered={filtered} handleFilter={handleFilter} />
      <UserChat handleCurrentChat={handleCurrentChat} />
    </div>
  );
};
export default Home;
