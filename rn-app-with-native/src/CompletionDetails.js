import React, {useState} from 'react';
import {TextInput, View, Text, Button, Platform} from 'react-native';
import {
  blockJavascriptThread,
  blockNativeMainThread,
} from 'react-native-performance-limiter';

export const CompletionDetails = ({navigation}) => {
  const [apiResponse, setApiResponse] = useState('');
  const [headers, setHeaders] = useState({});

  return (
    <View>
      <Text>Tell us more about your day</Text>
      {apiResponse && <Text>api response: {JSON.stringify(apiResponse)}</Text>}
      {headers && <Text>headers: {JSON.stringify(headers)}</Text>}
      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 2,
          padding: 2,
          marginVertical: 20,
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate('ConfirmationScreen');
        }}
        title="Go to next screen"
      />
      <Button
        onPress={() => {
          navigation.navigate('WebviewScreen');
        }}
        title="Go to webview screen"
      />
      <Button
        onPress={() => {
          blockJavascriptThread(1000);
        }}
        title="JS long task"
      />
      <Button
        onPress={() => {
          blockNativeMainThread(1000);
        }}
        title="Native long task"
      />

      <Button
        onPress={async () => {
          try {
            // Use 10.0.2.2 for Android emulator, localhost for iOS simulator
            const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
            const response = await fetch(`${baseUrl}/test`);
            const json = await response.json();
            setApiResponse(json);
            setHeaders(response.headers);
            console.log(`server responded with headers: ${JSON.stringify(response.headers)}`)
          }
          catch (e) {
            console.error(e)
          }
        }}
        title="Make HTTP request"
      />
    </View>
  );
};
