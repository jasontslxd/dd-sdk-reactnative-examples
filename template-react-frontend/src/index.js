import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { datadogRum } from '@datadog/browser-rum';

const root = ReactDOM.createRoot(document.getElementById('root'));

datadogRum.init({
  applicationId: process.env.REACT_APP_DATADOG_APPLICATION_ID,
  clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
  site: process.env.REACT_APP_DATADOG_SITE,
  service: process.env.REACT_APP_DATADOG_SERVICE,
  env: process.env.REACT_APP_DATADOG_ENV,
  
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  allowedTracingUrls: [
    "http://localhost:3000",
    "http://localhost:4000",
    // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
    // /^https:\/\/[^\/]+\.my-api-domain\.com/,
    // You can also use a function for advanced matching:
    // (url) => url.startsWith("https://api.example.com")
  ],
  sessionSampleRate:  100,
  sessionReplaySampleRate: 100,
  defaultPrivacyLevel: 'mask-user-input',
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  // plugins: [reactPlugin({ router: true })],
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
