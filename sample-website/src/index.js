import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// uncomment this to load the Datadog RUM script

// import { datadogRum } from '@datadog/browser-rum';
// datadogRum.init({
//     applicationId: 'applicationIdHere',
//     clientToken: 'clientTokenHere',
//     // `site` refers to the Datadog site parameter of your organization
//     // see https://docs.datadoghq.com/getting_started/site/
//     site: 'datadoghq.com',
//     service: 'website-test',
//     env: '<ENV_NAME>',
//     // Specify a version number to identify the deployed version of your application in Datadog
//     // version: '1.0.0',
//     sessionSampleRate: 100,
//     sessionReplaySampleRate: 100,
//     defaultPrivacyLevel: 'mask-user-input',
// });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
