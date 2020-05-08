import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Button,
  Linking
} from 'react-native'

import colors from '../constants/colors'
import backArrow from './../assets/images/backArrow.png'
import {
  EmptyFilePathError,
  InvalidFileExtensionError,
  NoRecentLocationsError,
  importTakeoutData
} from '../helpers/GoogleTakeOutAutoImport'
import languages from './../locales/languages'
import { pickFile } from '../helpers/General'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const makeImportResults = (label = '', error = false) => ({
  error,
  label
})

export const ImportScreen = ({ navigation }) => {
  const [importResults, _setImportResults] = useState(makeImportResults())
  const setImportResults = (...args) => _setImportResults(makeImportResults(...args))

  const backToMain = () => {
    navigation.navigate('HomeScreen', {})
  }

  const handleBackPress = () => {
    navigation.navigate('HomeScreen', {})
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
  }, [])

  const chooseDataFile = async () => {
    try {
      // reset info message
      setImportResults()

      const filePath = await pickFile()

      const newLocations = await importTakeoutData(filePath)

      if (newLocations.length) {
        setImportResults('Recent locations has been successfully imported!')
      } else {
        setImportResults('Provided Takeout file has already been imported.')
      }
    } catch (err) {
      if (err instanceof NoRecentLocationsError) {
        setImportResults("Takeout doesn't have any recent locations.", true)
      } else if (err instanceof InvalidFileExtensionError) {
        setImportResults(
          'Provided file format is not supported. \nSupported formats: ".zip".',
          true
        )
      } else if (err instanceof EmptyFilePathError) {
        /**
         * If the imported file is opened from other than Google Drive folder,
         * filepath is returned as null. Leaving a message to ensure import file
         * is located on Google Drive.
         */
        setImportResults(
          'Could not open the file. \nPlease, make sure the file is opened from Google Drive',
          true
        )
      } else {
        console.log('[ERROR] Failed to import locations', err)
        setImportResults('Something went wrong while importing your data.', true)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrowTouchable} onPress={backToMain}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{languages.t('label.import.title')}</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.subHeaderTitle}>
          <Text style={styles.sectionDescription}>
            {languages.t('label.import.google.instructions_first')}
          </Text>
          <Text style={styles.sectionDescription}>
            {languages.t('label.import.google.instructions_second')}
          </Text>
          <Text style={styles.sectionDescription}>
            {languages.t('label.import.google.instructions_detailed')}
          </Text>
        </View>
        <View style={styles.web}>
          <Button
            title='Visit Google Takeout'
            onPress={() =>
              Linking.openURL('https://takeout.google.com/settings/takeout/custom/location_history')
            }
            style={{ marginTop: 24 }}
          />

          <Text style={styles.andThen}>And then</Text>

          <Button title='Import locations' onPress={chooseDataFile} style={{ marginTop: 24 }} />

          {importResults.label ? (
            <Text
              style={{
                ...styles.importResults,
                ...(importResults && importResults.error ? styles.importResultsError : {})
              }}>
              {importResults.label}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Container covers the entire screen
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE
  },
  subHeaderTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 5
  },
  web: {
    flex: 1,
    width: '100%'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  },

  headerContainer: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199,0.6)',
    alignItems: 'center'
  },
  backArrowTouchable: {
    width: 60,
    height: 60,
    paddingTop: 21,
    paddingLeft: 20
  },
  backArrow: {
    height: 18,
    width: 18.48
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold'
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'center',
    marginTop: 12,
    fontFamily: 'OpenSans-Regular'
  },
  importResults: {
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
    color: colors.VIOLET
  },
  importResultsError: {
    color: colors.RED,
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    borderColor: colors.RED
  },
  andThen: {
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5
  }
})
export default ImportScreen
