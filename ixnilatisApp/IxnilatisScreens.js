import React from 'react'
import FormWork from './views/FormWork'
import FormGeneralNew from './views/FormGeneralNew'
import FormGeneralActive from './views/FormGeneralActive'
import { Acknowledgements } from './views/Acknowledgements'
import { Privacy } from './views/Privacy'
import SymptomChecker from './SymptomChecker/SymptomChecker'

export function getIxnilatisScreens (Stack) {
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
    />
  ]
}
