import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@hooks';
import styles from '@styles/page-title.module.css';

const PageTitle = ({ title, back }) => {
  const { theme } = useTheme();
  return (
    <div
      className={styles['page-title']}
      style={{ backgroundColor: theme.palette.pageTitle.background }}
    >
      <h1>
        <span>
          <Link to={back} exact='true'>
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              preserveAspectRatio='xMidYMid meet'
              version='1.1'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z'
              ></path>
            </svg>
          </Link>
          {title}
        </span>
      </h1>
    </div>
  );
};
export default PageTitle;
