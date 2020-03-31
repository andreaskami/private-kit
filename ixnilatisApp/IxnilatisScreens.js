import React from 'react';
import FormWork from './views/FormWork';
import FormGeneralNew from './views/FormGeneralNew';
import FormGeneralActive from './views/FormGeneralActive';

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
  ];
}
