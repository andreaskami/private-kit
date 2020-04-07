import React from 'react';
import FormWork from './views/FormWork';
import FormGeneralNew from './views/FormGeneralNew';
import FormGeneralActive from './views/FormGeneralActive';
import Privacy from './views/Privacy';
<<<<<<< HEAD
import Acknowledgement from './views/Acknowledgement';
import SymptomChecker from './SymptomChecker/SymptomChecker';
=======
import { Acknowledgements } from './views/Acknowledgements';
>>>>>>> develop

export function getIxnilatisScreens(Stack) {
  return [
    <Stack.Screen
      key='FormWorkScreen'
      name='FormWorkScreen'
      component={FormWork}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key='FormGeneralNewScreen'
      name='FormGeneralNewScreen'
      component={FormGeneralNew}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key='FormGeneralActiveScreen'
      name='FormGeneralActiveScreen'
      component={FormGeneralActive}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key='PrivacyScreen'
      name='PrivacyScreen'
      component={Privacy}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key='AckScreen'
      name='AckScreen'
      component={Acknowledgements}
      options={{ headerShown: false }}
    />,
    <Stack.Screen
      key='SymptomCheckerScreen'
      name='SymptomCheckerScreen'
      component={SymptomChecker}
      options={{ headerShown: false }}
    />,
  ];
}
