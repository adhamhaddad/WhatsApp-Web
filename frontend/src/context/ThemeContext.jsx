import React, { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const lightTheme = createTheme({
  palette: {
    type: 'light',
    main: {
      leftSide: {
        background: '#F0F2F5'
      },
      rightSide: {
        background: '#FFF',
        color: '#41525D',
        logo: {
          background: '#DAF7F3',
          imgColor: '#FFF'
        }
      }
    },
    header: {
      color: '#54656F',
      background: '#F0F2F5',
      options: {
        background: '#F0F2F5',
        hover: '#D9DBDE'
      }
    },
    pageTitle: {
      background: '#008069'
    },
    profilePage: {
      background: '#F0F2F5',
      color: '#000'
    },
    settingsPage: {
      hoverColor: '#FFF',
      borderColor: '#FFF',
      color: '#111B21',
      icon: {
        color: '#8696A0'
      }
    },
    themePage: {
      titleColor: '#111B21',
      labelColor: '#6F7A81',
      background: '#FFF',
      buttons: {
        okButtonBackground: '#00a884',
        okButtonColor: '#FFF',
        okButtonHover: '#06CF9C',
        cancelButton: '#FFF',
        cancelButtonHover: '#06CF9C'
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    main: {
      leftSide: {
        background: '#FFF'
      },
      rightSide: {
        background: '#FFF',
        color: '',
        logo: {
          background: '#364147',
          imgColor: '#DFF3ED'
        }
      }
    },
    header: {
      color: '#FFF',
      background: '#202C33',
      options: {
        background: '#233138',
        hover: '#374248'
      }
    },
    pageTitle: {
      background: '#202C33'
    },
    profilePage: {
      background: '#111B21',
      color: '#FFF'
    },
    settingsPage: {
      hoverColor: '#202C33',
      borderColor: '#303D45',
      color: '#FFF',
      icon: {
        color: '#8696A0'
      }
    },
    themePage: {
      titleColor: '#FFF',
      labelColor: '#FFF',
      background: '#3B4A54',
      buttons: {
        okButton: '#00a884',
        okButtonHover: '#06CF9C',
        cancelButton: '#3B4A54',
        cancelButtonHover: '#06CF9C'
      }
    }
  }
});
export const ThemeContext = createContext({
  theme: '',
  handleTheme: () => {}
});
const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleChange = (e) => {
    console.log(e);
    setTheme(e);
    localStorage.setItem('theme', e);
  };
  const values = {
    theme: theme === 'dark' ? darkTheme : lightTheme,
    handleTheme: handleChange
  };
  return (
    <ThemeContext.Provider value={values}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
