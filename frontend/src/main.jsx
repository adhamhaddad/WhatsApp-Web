import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, ThemeContextProvider } from '@context';
import App from './App.jsx';
import '@styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
