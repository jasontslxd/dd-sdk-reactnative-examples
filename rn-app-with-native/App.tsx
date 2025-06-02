import React, {useEffect, useRef} from 'react';
import {CompletionDetails} from './src/CompletionDetails';
import {ConfirmationScreen} from './src/ConfirmationScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
  PropagatorType,
  SdkVerbosity,
} from '@datadog/mobile-react-native';
import {DdRumReactNavigationTracking} from '@datadog/mobile-react-navigation';
import {applicationId, clientToken, environment} from './credentials.json';
import { WebviewScreen } from './src/WebviewScreen';

const Stack = createNativeStackNavigator();

const datadogConfiguration = new DdSdkReactNativeConfiguration(
  clientToken,
  environment,
  applicationId,
  true,
  true,
  true
);

datadogConfiguration.site = "US1"
datadogConfiguration.nativeCrashReportEnabled = true
datadogConfiguration.sessionSamplingRate = 100
datadogConfiguration.resourceTracingSamplingRate = 100
datadogConfiguration.firstPartyHosts = [{
  match: "10.0.2.2",
  propagatorTypes: [
    PropagatorType.TRACECONTEXT,
    PropagatorType.DATADOG
  ]
}]
datadogConfiguration.serviceName = "rn-app-with-native"
datadogConfiguration.verbosity = SdkVerbosity.DEBUG

const RNApp = () => {
  useEffect(() => {
    const initializeDatadog = async () => {
      await DdSdkReactNative.initialize(datadogConfiguration);
      DdSdkReactNative.setUser({
        id: '123',
        name: 'Test user',
        email: 'test@test.com',
        type: 'premium'
      });
    };

    initializeDatadog();
  }, []);

  const navigationRef = useRef(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(
          navigationRef.current,
        );
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name="CompletionDetails"
          component={CompletionDetails}
        />
        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
        />
        <Stack.Screen
          name="WebviewScreen"
          component={WebviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Module name
export default RNApp;
