import React, { Component } from 'react'

import FlashMessage from 'react-native-flash-message'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from './views/Home'
import NewsScreen from './views/News'
import ExportScreen from './views/Export'
import ImportScreen from './views/Import'
import { MapScreen } from './views/Map'
import LicencesScreen from './views/Licenses'
import { StatisticsScreen } from './views/Statistics'
import { OnboardingSlider } from './views/Onboarding/Slider'
import FormWork from './views/FormWork'
import { MovementDeclarationForm } from './views/MovementDeclarationForm'
import { Acknowledgements } from './views/Acknowledgements'
import { Privacy } from './views/Privacy'
import SymptomChecker from './views/SymptomChecker/SymptomChecker'

const Stack = createStackNavigator()

const Pages = [
  { name: 'HomeScreen', component: Home, hasHeader: false },
  { name: 'OnboardingScreen', component: OnboardingSlider, hasHeader: false },
  { name: 'NewsScreen', component: NewsScreen, hasHeader: false },
  { name: 'ExportScreen', component: ExportScreen, hasHeader: false },
  { name: 'ImportScreen', component: ImportScreen, hasHeader: false },
  { name: 'LicensesScreen', component: LicencesScreen, hasHeader: false },
  { name: 'StatisticsScreen', component: StatisticsScreen, hasHeader: false },
  { name: 'MapScreen', component: MapScreen, hasHeader: false },
  { name: 'FormWorkScreen', component: FormWork, hasHeader: false },
  { name: 'MovementDeclarationScreen', component: MovementDeclarationForm, hasHeader: false },
  { name: 'PrivacyScreen', component: Privacy, hasHeader: false },
  { name: 'AckScreen', component: Acknowledgements, hasHeader: false },
  { name: 'SymptomCheckerScreen', component: SymptomChecker, hasHeader: false }
]

export class Entry extends Component {
  pages

  constructor (props) {
    super(props)

    this.state = {
      initialRouteName: 'Home'
    }

    this.pages = Pages.map(page => (
      <Stack.Screen
        key={page.name}
        name={page.name}
        component={page.component}
        options={{ headerShown: page.hasHeader }}
      />
    ))
  }

  // TODO: Add rootStore for dynamic loading
  async componentDidMount () {
    // const value = await GetStoreData('ONBOARDING_COMPLETE')
    // console.log('ONBOARDING_COMPLETE', value)
  }

  render () {
    return (
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName={this.initialRouteName}>{this.pages}</Stack.Navigator>

          <FlashMessage
            ref={ref => {
              this.top = ref
            }}
          />
        </SafeAreaView>
      </NavigationContainer>
    )
  }
}
