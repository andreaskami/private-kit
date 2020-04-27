import React from 'react'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import Entry from './app/Entry'

const App = () => (
  <>
    <StatusBar barStyle='dark-content' />
    <MenuProvider>
      <Entry />
    </MenuProvider>
  </>
)

export default App
