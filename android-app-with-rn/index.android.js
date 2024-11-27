import React, { useEffect, useRef } from "react";
import { AppRegistry, BackHandler, StyleSheet } from "react-native";
import { CompletionDetails } from "./src/CompletionDetails";
import { ConfirmationScreen } from "./src/ConfirmationScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DatadogProvider,
  InternalLog,
  SdkVerbosity,
} from "@datadog/mobile-react-native";
import { DdRumReactNavigationTracking } from "@datadog/mobile-react-navigation";

const Stack = createNativeStackNavigator();

const config = {
  trackResources: true,
  trackErrors: true,
  trackInteractions: true,
};
InternalLog.verbosity = SdkVerbosity.DEBUG;

const RNApp = () => {
  useEffect(() => {
    /**
     * In here we can put fake values. The only goal of this call
     * is to empty the buffer of RUM events.
     */
    DatadogProvider.initialize({
      clientToken: "pub2277a2906c90bb5433036c6abb10642f",
      env: "test",
      applicationId: "b9e1e5ed-e9f5-4cf9-a2fc-8e50b95a1454",
      longTaskThresholdMs: 100,
      verbosity: SdkVerbosity.DEBUG,
    });

    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("back pressed!");
    });
  }, []);
  const navigationRef = useRef(null);

  return (
    <DatadogProvider configuration={config}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          DdRumReactNavigationTracking.startTrackingViews(
            navigationRef.current
          );
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="CompletionDetails"
            component={CompletionDetails}
          />
          <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DatadogProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

// Module name
AppRegistry.registerComponent("RNApp", () => RNApp);
