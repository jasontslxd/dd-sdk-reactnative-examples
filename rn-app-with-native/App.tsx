import React, {useEffect, useRef} from 'react';
import {CompletionDetails} from './src/CompletionDetails';
import {ConfirmationScreen} from './src/ConfirmationScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DatadogProvider,
  DdSdkReactNative,
  InternalLog,
  PropagatorType,
  SdkVerbosity,
} from '@datadog/mobile-react-native';
import {DdRumReactNavigationTracking} from '@datadog/mobile-react-navigation';
import {applicationId, clientToken, environment} from './credentials.json';
import { WebviewScreen } from './src/WebviewScreen';

const Stack = createNativeStackNavigator();

const config = {
  trackResources: true,
  trackErrors: true,
  trackInteractions: true,
  firstPartyHosts: [{
    match: "172.26.32.1",
    propagatorTypes: [
        PropagatorType.TRACECONTEXT,
        PropagatorType.DATADOG
    ]
  }]
};
InternalLog.verbosity = SdkVerbosity.DEBUG;

const RNApp = () => {
  useEffect(() => {
    DatadogProvider.initialize({
      clientToken,
      env: environment,
      applicationId,
      longTaskThresholdMs: 100,
      nativeInteractionTracking: true
    });

    DdSdkReactNative.setUser({
      id: '123',
      name: 'Test user',
      email: 'test@test.com',
      type: 'premium'
  });
  }, []);
  const navigationRef = useRef(null);

  return (
    <DatadogProvider configuration={config}>
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
    </DatadogProvider>
  );
};

// Module name
export default RNApp;
