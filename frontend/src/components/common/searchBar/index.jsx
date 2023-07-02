import React, { useState, useEffect } from 'react';
import { useTheme } from '@hooks';
import styles from '@styles/searchBar.module.css';

const SearchBar = ({ filtered, handleFilter }) => {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();

  const handleQuery = (event) => {
    setQuery(setQuery(event.target.value));
  };
  const handleSearch = () => {};

  useEffect(() => {}, []);
  return (
    <div className={`${styles['search-box']} ${styles[theme.palette.type]}`}>
      <div className={styles['search-bar']}>
        <span>
          <svg
            viewBox='0 0 24 24'
            height='24'
            width='24'
            x='0px'
            y='0px'
            enableBackground='new 0 0 24 24'
            xmlSpace='preserve'
          >
            <path
              fill='currentColor'
              d='M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z'
            ></path>
          </svg>
        </span>
        <input
          type='search'
          placeholder='Search or start new chat'
          value={query}
          onChange={handleQuery}
        />
      </div>

      <span
        className={`${styles['sort']} ${filtered ? styles['sorted'] : null}`}
        onClick={handleFilter}
      >
        <svg
          viewBox='0 0 24 24'
          height='20'
          width='20'
          preserveAspectRatio='xMidYMid meet'
          version='1.1'
          x='0px'
          y='0px'
          enableBackground='new 0 0 24 24'
          xmlSpace='preserve'
        >
          <path
            fill='currentColor'
            d='M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z'
          ></path>
        </svg>
      </span>
    </div>
  );
};
export default SearchBar;
