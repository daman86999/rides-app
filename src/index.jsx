import { React } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import Auth0Provider from './auth/Auth0Provider';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://59665017c5814c2ca1c87e169f3f83fe@o1323413.ingest.sentry.io/6581168',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export const sendDataToSentry = ({ name, message, extra, tags }) => {
  const error = new Error();
  error.message = message;
  error.name = name;
  if (!tags) tags = {};

  Sentry.captureException(error, {
    tags,
    extra,
  });
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

reportWebVitals();
