import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { SettingContextProvider } from './contexts/settingsContext/SettingsContextProvider';
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SettingContextProvider>
  </React.StrictMode>
);
