import { React } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Auth0Provider from './auth/Auth0Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

reportWebVitals();
