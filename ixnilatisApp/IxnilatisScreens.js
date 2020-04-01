import React from 'react';
import FormWork from './views/FormWork';
import FormGeneralNew from './views/FormGeneralNew';
import FormGeneralActive from './views/FormGeneralActive';
import Privacy from './views/Privacy';
import Acknowledgement from './views/Acknowledgement';

export function getIxnilatisScreens(Stack) {
  return [
    <Stack.Screen
      key="FormWorkScreen"
      name="FormWorkScreen"
      component={FormWork}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key="FormGeneralNewScreen"
      name="FormGeneralNewScreen"
      component={FormGeneralNew}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key="FormGeneralActiveScreen"
      name="FormGeneralActiveScreen"
      component={FormGeneralActive}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key="PrivacyScreen"
      name="PrivacyScreen"
      component={Privacy}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key="AckScreen"
      name="AckScreen"
      component={Acknowledgement}
      options={{ headerShown: false }}
    />,
  ];
}