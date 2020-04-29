import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from './views/Home'
import { Welcome } from './views/Welcome'
import NewsScreen from './views/News'
import ExportScreen from './views/Export'
import ImportScreen from './views/Import'
import OverlapScreen from './views/Overlap'
import LicencesScreen from './views/Licenses'
import { StatisticsScreen } from './views/Statistics'
import { OnboardingSlider } from './views/Onboarding/Slider'
import { GetStoreData } from './helpers/General'
import FlashMessage from 'react-native-flash-message'
import { SafeAreaView } from 'react-native'
import FormWork from './views/FormWork'
import FormGeneralNew from './views/FormGeneralNew'
import FormGeneralActive from './views/FormGeneralActive'
import { Acknowledgements } from './views/Acknowledgements'
import { Privacy } from './views/Privacy'
import SymptomChecker from './views/SymptomChecker/SymptomChecker'

const Stack = createStackNavigator()

export const Entry = () => {
  const [isOnboard, setIsOnboard] = useState(false)

  useEffect(() => {
    GetStoreData('ONBOARDING_COMPLETE')
      .then(onboardingState => {
        setIsOnboard(onboardingState)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName='InitialScreen'>
          {isOnboard ? (
            <Stack.Screen name='InitialScreen' component={Home} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen
              name='InitialScreen'
              component={OnboardingSlider}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name='Slider'
            component={OnboardingSlider}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='WelcomeScreen' component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreen' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='NewsScreen' component={NewsScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name='ExportScreen'
            component={ExportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ImportScreen'
            component={ImportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LicensesScreen'
            component={LicencesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='StatisticsScreen'
            component={StatisticsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='OverlapScreen'
            component={OverlapScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            key='FormWorkScreen'
            name='FormWorkScreen'
            component={FormWork}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            key='FormGeneralNewScreen'
            name='FormGeneralNewScreen'
            component={FormGeneralNew}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            key='FormGeneralActiveScreen'
            name='FormGeneralActiveScreen'
            component={FormGeneralActive}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            key='PrivacyScreen'
            name='PrivacyScreen'
            component={Privacy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            key='AckScreen'
            name='AckScreen'
            component={Acknowledgements}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            key='SymptomCheckerScreen'
            name='SymptomCheckerScreen'
            component={SymptomChecker}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <FlashMessage
          ref={ref => {
            this.top = ref
          }}
        />
      </SafeAreaView>
    </NavigationContainer>
  )
}
