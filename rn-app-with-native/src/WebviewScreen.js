import React from 'react';
import { WebView } from '@datadog/mobile-react-native-webview';
import {webApplicationId, webClientToken, environment} from '../credentials.json';


export const WebviewScreen = () => {
    const injectedJS = 
    `
        function initFunction() {
            window.DD_RUM.onReady(function() {
                window.DD_RUM.init({
                    clientToken: '${webClientToken}',
                    applicationId: '${webApplicationId}',
                    // site refers to the Datadog site parameter of your organization
                    // see https://docs.datadoghq.com/getting_started/site/
                    site: 'datadoghq.com',
                    service: 'website-test',
                    env: '${environment}',
                    version: '1.0.0',
                    sessionSampleRate: 100,
                    sessionReplaySampleRate: 100,
                    trackResources: true,
                    trackLongTasks: true,
                    trackUserInteractions: true,
                    enablePrivacyForActionName: true,
                });
            })
            window.alert('dd rum loaded')
        }

        var datadogSdk = document.createElement('script');
        datadogSdk.setAttribute('src', 'https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js');
        datadogSdk.onload = initFunction
        document.head.appendChild(datadogSdk);
    `

    return (
        <WebView 
            source={{ uri: 'http://192.168.56.1:8080' }} 
            allowedHosts={['192.168.56.1']}
            injectedJavaScriptBeforeContentLoaded={injectedJS}
        />
    )
}
