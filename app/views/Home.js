import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  BackHandler
} from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import colors from '../constants/colors'
import LocationServices from '../services/LocationService'
import BroadcastingServices from '../services/BroadcastingService'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { getVersion } from 'react-native-device-info'
import PropTypes from 'prop-types'

import exportImage from './../assets/images/export.png'
import newsImage from './../assets/images/newspaper.png'
import kebabIcon from './../assets/images/kebabIcon.png'
import pkLogo from './../assets/images/PKLogo.png'

import logo1 from './../assets/images/logo1.png'
import logo2 from './../assets/images/logo2.png'
import logo3 from './../assets/images/logo3.png'

import { GetStoreData, SetStoreData } from '../helpers/General'
import { useNetInfo } from '@react-native-community/netinfo'

import languages from '../locales/languages'

const width = Dimensions.get('window').width

const Home = ({ navigation }) => {
  const [isLogging, setIsLogging] = useState(false)
  const netInfo = useNetInfo()

  const handleBackPress = () => {
    BackHandler.exitApp() // works best when the goBack is async
    return true
  }

  useEffect(() => {
    onMount()

    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    GetStoreData('PARTICIPATE')
      .then(isParticipating => {
        if (isParticipating === 'true') {
          setIsLogging(true)
          willParticipate()
        } else {
          setIsLogging(false)
        }
      })
      .catch(error => console.log(error))

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
  })

  const onMount = async () => {
    const onBoardingValue = await GetStoreData('ONBOARDING_COMPLETE')
    if (!onBoardingValue || !+onBoardingValue) {
      navigation.navigate('OnboardingScreen')
    }
  }

  const exportData = () => {
    navigation.navigate('ExportScreen', {})
  }

  const importData = () => {
    navigation.navigate('ImportScreen', {})
  }

  const overlap = () => {
    navigation.navigate('OverlapScreen', {})
  }

  const willParticipate = () => {
    SetStoreData('PARTICIPATE', 'true').then(() => {
      LocationServices.start()
      // BroadcastingServices.start();
    })

    // Check and see if they actually authorized in the system dialog.
    // If not, stop services and set the state to !isLogging
    // Fixes tripleblindmarket/private-kit#129
    BackgroundGeolocation.checkStatus(({ authorization }) => {
      if (authorization === BackgroundGeolocation.AUTHORIZED) {
        setIsLogging(true)
      } else if (authorization === BackgroundGeolocation.NOT_AUTHORIZED) {
        LocationServices.stop(navigation)
        BroadcastingServices.stop(navigation)
        setIsLogging(false)
      }
    })
  }

  const news = () => {
    navigation.navigate('NewsScreen', {})
  }

  const licenses = () => {
    navigation.navigate('LicensesScreen', {})
  }

  const privacy = () => {
    navigation.navigate('PrivacyScreen', {})
  }

  const acknowledgement = () => {
    navigation.navigate('AckScreen', {})
  }

  const statistics = () => {
    navigation.navigate('StatisticsScreen', {})
  }

  const setOptOut = () => {
    LocationServices.stop(navigation)
    BroadcastingServices.stop(navigation)
    setIsLogging(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        {/* A modal menu. Currently only used for license info */}
        <Menu
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            zIndex: 10
          }}>
          <MenuTrigger style={{ marginTop: 14 }}>
            <Image
              source={kebabIcon}
              style={{
                width: 15,
                height: 28,
                padding: 14
              }}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => {
                statistics()
              }}>
              <Text style={styles.menuOptionText}>Statistics</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                licenses()
              }}>
              <Text style={styles.menuOptionText}>Licenses</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                privacy()
              }}>
              <Text style={styles.menuOptionText}>Privacy</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                acknowledgement()
              }}>
              <Text style={styles.menuOptionText}>Acknowledgements</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <View style={styles.buttonsAndLogoView}>
          {isLogging ? (
            <>
              <Image
                source={pkLogo}
                style={{
                  width: 132,
                  height: 164.4,
                  alignSelf: 'center',
                  marginTop: 12
                }}
              />
              <TouchableOpacity
                onPress={() => setOptOut()}
                style={styles.stopLoggingButtonTouchable}>
                <Text style={styles.stopLoggingButtonText}>
                  {languages.t('label.stop_logging')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => overlap()}
                style={styles.startLoggingButtonTouchable}>
                <Text style={styles.startLoggingButtonText}>{languages.t('label.overlap')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={pkLogo}
                style={{
                  width: 132,
                  height: 164.4,
                  alignSelf: 'center',
                  marginTop: 12,
                  opacity: 0.3
                }}
              />
              <TouchableOpacity
                onPress={() => willParticipate()}
                style={styles.startLoggingButtonTouchable}>
                <Text style={styles.startLoggingButtonText}>
                  {languages.t('label.start_logging')}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {isLogging ? (
            <Text style={styles.sectionDescription}>{languages.t('label.logging_message')}</Text>
          ) : (
            <Text style={styles.sectionDescription}>
              {languages.t('label.not_logging_message')}
            </Text>
          )}
        </View>

        <View style={styles.actionButtonsView}>
          <TouchableOpacity
            onPress={() => {
              if (!netInfo.isInternetReachable) {
                Alert.alert(
                  'Warning',
                  'An internet connection is required before accessing this feature',
                  [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
                )
                return
              }
              navigation.navigate('SymptomCheckerScreen', {})
            }}
            style={styles.actionButtonsTouchable}>
            <Text style={styles.actionButtonHead}>&#x1F50D;</Text>
            <Text style={styles.actionButtonText}>{languages.t('label.SYMPTOM_CHECKER')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MovementDeclarationScreen', {})}
            style={styles.actionButtonsTouchable}>
            <Text style={styles.actionButtonHead}>&#9997;</Text>
            <Text style={styles.actionButtonText}>{languages.t('label.FORMGENERAL_NEW')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={news} style={styles.actionButtonsTouchable}>
            <Image style={styles.actionButtonImage} source={newsImage} resizeMode='contain' />
            <Text style={styles.actionButtonText}>{languages.t('label.news')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtonsView}>
          <TouchableOpacity onPress={importData} style={styles.actionButtonsTouchable}>
            <Image style={styles.actionButtonImage} source={exportImage} resizeMode='contain' />
            <Text style={styles.actionButtonText}>{languages.t('label.import')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={exportData} style={styles.actionButtonsTouchable}>
            <Image
              style={[styles.actionButtonImage, { transform: [{ rotate: '180deg' }] }]}
              source={exportImage}
              resizeMode='contain'
            />
            <Text style={styles.actionButtonText}>{languages.t('label.export')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.rowContainer}>
            <Image source={logo1} style={styles.infoCardLogo} />
            <Image source={logo2} style={styles.infoCardLogo} />
            <Image source={logo3} style={styles.infoCardLogo} />
          </View>
          <Text style={[styles.sectionDescription, { textAlign: 'center', paddingTop: 15 }]}>
            {languages.t('label.url_info')}{' '}
          </Text>
          <Text
            style={[
              styles.sectionDescriptionLow,
              { color: 'blue', textAlign: 'center', marginTop: 0 }
            ]}
            onPress={() => Linking.openURL(languages.t('label.private_kit_url'))}>
            {languages.t('label.private_kit_url')}
          </Text>
          <Text style={{ textAlign: 'center' }}>{getVersion()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Container covers the entire screen
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE
  },
  rowContainer: {
    flexDirection: 'row'
  },
  infoCardLogo: {
    alignSelf: 'center',
    marginTop: '10%',
    width: 100,
    height: 50,
    resizeMode: 'contain'
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 38,
    padding: 0,
    fontFamily: 'OpenSans-Bold'
  },
  subHeaderTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 5
  },
  main: {
    alignItems: 'center',
    width: '100%'
  },
  buttonsAndLogoView: {
    flex: 6,
    justifyContent: 'space-around'
  },
  actionButtonsView: {
    width: width * 0.7866,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
    alignItems: 'center',
    marginTop: 20
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingBottom: 10,
    justifyContent: 'flex-end'
  },
  sectionDescription: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'OpenSans-Regular',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    // IX
    textAlign: 'center',
    marginBottom: 2
  },
  sectionDescriptionLow: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'OpenSans-Regular',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    // IX
    textAlign: 'center',
    marginBottom: 5
  },
  startLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#665eff',
    height: 52,
    alignSelf: 'center',
    width: width * 0.7866,
    marginTop: 30,
    justifyContent: 'center',
    marginBottom: 20
  },
  startLoggingButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  stopLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#fd4a4a',
    height: 52,
    alignSelf: 'center',
    width: width * 0.7866,
    marginTop: 30,
    justifyContent: 'center'
  },
  stopLoggingButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  actionButtonsTouchable: {
    height: 76,
    borderRadius: 8,
    backgroundColor: '#454f63',
    width: width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10
  },
  actionButtonImage: {
    height: 21.6,
    width: 32.2
  },
  actionButtonText: {
    opacity: 0.56,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 6
  },
  menuOptionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    padding: 10
  }
})

Home.propTypes = {
  navigation: PropTypes.object
}

export { Home }
