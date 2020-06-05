import React from 'react'

import FlashMessage from 'react-native-flash-message'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { HomeScreen } from './views/Home/Home'
import NewsScreen from './views/News'
import ExportScreen from './views/Export'
import ImportScreen from './views/Import'
import { MapScreen } from './views/Map'
import LicencesScreen from './views/Licenses'
import { StatisticsScreen } from './views/Statistics'
import { Onboarding } from './views/Onboarding/Onboarding'
import { Acknowledgements } from './views/Acknowledgements'
import { Privacy } from './views/Privacy'
import SymptomChecker from './views/SymptomChecker/SymptomChecker'
import { DrawerContent } from './DrawerContent'

const Drawer = createDrawerNavigator()

const Pages = [
  { name: 'HomeScreen', component: HomeScreen, hasHeader: false },
  { name: 'MapScreen', component: MapScreen, hasHeader: false },
  { name: 'SymptomCheckerScreen', component: SymptomChecker, hasHeader: false },
  // group 1
  { name: 'NewsScreen', component: NewsScreen, hasHeader: false },
  { name: 'StatisticsScreen', component: StatisticsScreen, hasHeader: false },
  // group 2
  { name: 'ImportScreen', component: ImportScreen, hasHeader: false },
  { name: 'ExportScreen', component: ExportScreen, hasHeader: false },
  // group 3
  { name: 'PrivacyScreen', component: Privacy, hasHeader: false },
  { name: 'LicensesScreen', component: LicencesScreen, hasHeader: false },
  { name: 'AckScreen', component: Acknowledgements, hasHeader: false },
  // routes not shown in drawer go here
  { name: 'OnboardingScreen', component: Onboarding, hasHeader: false }
]

const initialRouteName = 'Home'

export const Entry = () => {
  const pages = Pages.map(page => (
    <Drawer.Screen
      key={page.name}
      name={page.name}
      component={page.component}
      options={{ headerShown: page.hasHeader }}
    />
  ))

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Drawer.Navigator
          initialRouteName={initialRouteName}
          drawerContent={props => <DrawerContent {...props} />}>
          {pages}
        </Drawer.Navigator>

        {/* <FlashMessage
          ref={ref => {
            this.top = ref
          }}
        /> */}
      </SafeAreaView>
    </NavigationContainer>
  )
}
