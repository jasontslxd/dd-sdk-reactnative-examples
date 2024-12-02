import React, {useState} from 'react';
import {TextInput, View, Text, Button} from 'react-native';
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
            const response = await fetch('http://172.26.32.1:8000/route?sides=6&rolls=3');
            const json = await response.json();
            setApiResponse(json);
            setHeaders(response.headers);
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
