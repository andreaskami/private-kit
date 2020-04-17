/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import Entry from './app/Entry';
import { VersionChecker } from './ixnilatisApp/VersionChecker';

const App: () => React$Node = () => {
  return (
    <VersionChecker>
      <MenuProvider>
        <Entry />
      </MenuProvider>
    </VersionChecker>
  );
};

export default App;
