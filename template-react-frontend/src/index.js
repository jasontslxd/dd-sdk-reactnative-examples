import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { datadogRum } from '@datadog/browser-rum';

const root = ReactDOM.createRoot(document.getElementById('root'));

datadogRum.init({
  applicationId: 'ed9e8110-77f9-47d5-9e28-f3b4d54498ce',
  clientToken: 'pub06a01489e254a4c616661526e1017d34',
  site: 'datadoghq.com',
  service:'header_test',
  env: 'dev',
  
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  site: 'datadoghq.com',
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
