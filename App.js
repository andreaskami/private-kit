import React from 'react'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { Entry } from './app/Entry'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar barStyle='dark-content' />
      <MenuProvider>
        <Entry />
      </MenuProvider>
    </ApplicationProvider>
  </>
)

export default App
