import React, { useState, useEffect } from 'react'

import FlashMessage from 'react-native-flash-message'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from './views/Home'
import NewsScreen from './views/News'
import ExportScreen from './views/Export'
import ImportScreen from './views/Import'
import OverlapScreen from './views/Overlap'
import LicencesScreen from './views/Licenses'
import { StatisticsScreen } from './views/Statistics'
import { OnboardingSlider } from './views/Onboarding/Slider'
import FormWork from './views/FormWork'
import FormGeneralNew from './views/FormGeneralNew'
import { Acknowledgements } from './views/Acknowledgements'
import { Privacy } from './views/Privacy'
import SymptomChecker from './views/SymptomChecker/SymptomChecker'
import { GetStoreData } from './helpers/General'

const Stack = createStackNavigator()

const Pages = [
  { name: 'Slider', component: OnboardingSlider, hasHeader: false },
  { name: 'HomeScreen', component: Home, hasHeader: false },
  { name: 'OnboardingScreen', component: OnboardingSlider, hasHeader: false },
  { name: 'NewsScreen', component: NewsScreen, hasHeader: false },
  { name: 'ExportScreen', component: ExportScreen, hasHeader: false },
  { name: 'ImportScreen', component: ImportScreen, hasHeader: false },
  { name: 'LicensesScreen', component: LicencesScreen, hasHeader: false },
  { name: 'StatisticsScreen', component: StatisticsScreen, hasHeader: false },
  { name: 'OverlapScreen', component: OverlapScreen, hasHeader: false },
  { name: 'FormWorkScreen', component: FormWork, hasHeader: false },
  { name: 'FormGeneralNewScreen', component: FormGeneralNew, hasHeader: false },
  { name: 'PrivacyScreen', component: Privacy, hasHeader: false },
  { name: 'AckScreen', component: Acknowledgements, hasHeader: false },
  { name: 'SymptomCheckerScreen', component: SymptomChecker, hasHeader: false }
]

export const Entry = () => {
  const [isOnboard, setIsOnboard] = useState(false)

  const pages = Pages.map(page => (
    <Stack.Screen
      key={page.name}
      name={page.name}
      component={page.component}
      options={{ headerShown: page.hasHeader }}
    />
  ))

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
        <Stack.Navigator initialRouteName={isOnboard ? 'OnboardingScreen' : 'HomeScreen'}>
          {pages}
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
