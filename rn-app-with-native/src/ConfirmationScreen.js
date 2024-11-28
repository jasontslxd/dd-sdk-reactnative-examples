import React, {useState} from 'react';
import {Text, Button, NativeModules} from 'react-native';

export const ConfirmationScreen = () => {
  const [apiResponse, setApiRespnose] = useState('');

  const callNativeApi = () => {
    NativeModules.CustomView.callApiFromNative()
      .then((response) => {
        setApiRespnose(response);
      })
      .catch((error) => {
        setApiRespnose(error);
      });
  };

  return (
    <>
      <Text>This is a confirmation screen</Text>

      {apiResponse && <Text>api response: {JSON.stringify(apiResponse)}</Text>}

      <Button
        title="Start native screen"
        onPress={() => NativeModules.CustomView.startView()}
      />
      <Button 
        title="Call api using native method"
        onPress={() => callNativeApi()}
      />
    </>
  );
};
