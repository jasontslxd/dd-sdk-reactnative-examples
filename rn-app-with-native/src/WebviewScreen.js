import React from 'react';
import { WebView } from 'react-native-webview';

export const WebviewScreen = () => {
    return (
        <WebView source={{ uri: 'http://httpbin.org' }} />
    )
}
