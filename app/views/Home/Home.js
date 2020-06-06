import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  BackHandler
} from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import colors from '../../constants/colors'
import LocationServices from '../../services/LocationService'
import BroadcastingServices from '../../services/BroadcastingService'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import { getVersion } from 'react-native-device-info'
import PropTypes from 'prop-types'
import { PERMISSIONS, RESULTS, check, request, openSettings } from 'react-native-permissions'

import exportImage from './../../assets/images/export.png'
import newsImage from './../../assets/images/newspaper.png'
import kebabIcon from './../../assets/images/kebabIcon.png'
import pkLogo from './../../assets/images/PKLogo.png'

import thirdPartyLogo1 from './../../assets/images/logo1.png'
import thirdPartyLogo2 from './../../assets/images/logo2.png'
import thirdPartyLogo3 from './../../assets/images/logo3.png'

import { GetStoreData, SetStoreData } from '../../helpers/General'
import { useNetInfo } from '@react-native-community/netinfo'

import languages from '../../locales/languages'

import styled from 'styled-components/native'
import { Layout, Text, Button, Icon } from '@ui-kitten/components'
import { Logo } from '../../components/Logo'
import { BackgroundShape } from './BackgroundShape'

const width = Dimensions.get('window').width

export const HomeScreen = ({ navigation }) => {
  const netInfo = useNetInfo()
  // const [isLogging, setIsLogging] = useState()

  useEffect(() => {}, [])

  const handleSymptomsTap = () => {
    if (!netInfo.isInternetReachable) {
      Alert.alert(
        languages.t('label.alert.title.warning'),
        languages.t('label.alert.no_internet_connection'),
        [{ text: 'OK' }]
      )
      return
    }
    navigation.navigate('SymptomCheckerScreen')
  }

  const handleRecentLocationsTap = () => {
    navigation.navigate('MapScreen')
  }

  return (
    <Root>
      <BackgroundShape />
      <Header>
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <MenuTriggerIcon name='menu-outline' fill='#3366ff' />
        </TouchableOpacity>
      </Header>
      <Body>
        <AppLogo />
        <Subtitle>
          CovTracer is privately saving the places you visit and storing them on your phone.
        </Subtitle>
      </Body>
      <Footer>
        <Actions>
          <SymptomsButton onPress={handleSymptomsTap}>
            <SymptomsButtonText>Do you feel unwell today?</SymptomsButtonText>
          </SymptomsButton>
          <ViewRecentLocationsButton onPress={handleRecentLocationsTap}>
            <ViewRecentLocationsButtonText>View recent locations</ViewRecentLocationsButtonText>
          </ViewRecentLocationsButton>
        </Actions>

        <LogosContainer>
          <PartyLogo source={thirdPartyLogo1} />
          <PartyLogo source={thirdPartyLogo2} />
          <PartyLogo source={thirdPartyLogo3} />
        </LogosContainer>
      </Footer>
    </Root>
  )
}

const Root = styled(Layout)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

const Header = styled.View`
  width: 100%;
  position: relative;
`

const Body = styled.View``

const Footer = styled.View`
  display: flex;
  align-items: center;
  max-height: 150px;
`

const Actions = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogosContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
`

const Subtitle = styled(Text)`
  text-align: center;
  font-size: 16px;
`

const AppLogo = styled(Logo)`
  width: 132px;
  height: 164px;
`
const PartyLogo = styled.Image`
  align-self: center;
  margin-top: 10%;
  width: 100px;
  height: 50px;
  resize-mode: contain;
`

const SymptomsButton = styled.TouchableOpacity``

const SymptomsButtonText = styled(Text)`
  font-size: 16px;
  color: #3366ff;
`
const ViewRecentLocationsButton = styled.TouchableOpacity`
  margin-top: 10px;
`

const ViewRecentLocationsButtonText = styled(Text)`
  font-size: 12px;
  color: #bdbdbd;
`

const MenuTriggerIcon = styled(Icon)`
  position: absolute;
  left: 0;
  width: 32px;
  height: 32px;
`

HomeScreen.propTypes = {
  navigation: PropTypes.object
}

// const Home = ({ navigation }) => {
//   const [isLogging, setIsLogging] = useState(false)
//   const netInfo = useNetInfo()

//   const handleBackPress = () => {
//     BackHandler.exitApp() // works best when the goBack is async
//     return true
//   }

//   const locationPermission = useMemo(() => {
//     if (Platform.OS === 'ios') {
//       return PERMISSIONS.IOS.LOCATION_ALWAYS
//     } else {
//       return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//     }
//   }, [])

//   const checkCurrentState = useCallback(async () => {
//     // If user has location enabled & permissions, start logging
//     const isParticipating = await GetStoreData('PARTICIPATE', false)

//     if (isParticipating) {
//       check(locationPermission)
//         .then(result => {
//           console.log(`Permission: ${result}`)
//           switch (result) {
//             case RESULTS.GRANTED:
//               LocationServices.start()
//               return
//             case RESULTS.UNAVAILABLE:
//             case RESULTS.BLOCKED:
//               console.log('NO LOCATION')
//               LocationServices.stop()
//           }
//         })
//         .catch(error => {
//           console.log('error checking location: ' + error)
//         })
//     } else {
//       LocationServices.stop()
//     }
//   }, [locationPermission])

//   const requestLocationPermission = async () => {
//     const status = await request(locationPermission)

//     return status === RESULTS.GRANTED
//   }

//   useEffect(() => {
//     onMount()
//     checkCurrentState()
//     BackHandler.addEventListener('hardwareBackPress', handleBackPress)

//     GetStoreData('PARTICIPATE')
//       .then(isParticipating => {
//         if (isParticipating === 'true') {
//           setIsLogging(true)
//           willParticipate()
//         } else {
//           setIsLogging(false)
//         }
//       })
//       .catch(error => console.log(error))

//     return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
//   })

//   const onMount = async () => {
//     const onBoardingValue = await GetStoreData('ONBOARDING_COMPLETE', false)

//     if (!onBoardingValue) {
//       navigation.navigate('OnboardingScreen')
//     }
//   }

//   const exportData = () => {
//     navigation.navigate('ExportScreen', {})
//   }

//   const importData = () => {
//     navigation.navigate('ImportScreen', {})
//   }

//   const mapLocations = () => {
//     navigation.navigate('MapScreen', {})
//   }

//   const willParticipate = async () => {
//     await checkCurrentState()
//     await SetStoreData('PARTICIPATE', 'true')

//     BackgroundGeolocation.checkStatus(async ({ authorization }) => {
//       console.log({ authorization: authorization === BackgroundGeolocation.AUTHORIZED })
//       console.log({ authCode: authorization })
//       if (authorization === BackgroundGeolocation.AUTHORIZED) {
//         LocationServices.start()
//         setIsLogging(true)
//       } else if (authorization === 99 || authorization === BackgroundGeolocation.NOT_AUTHORIZED) {
//         // code 99 = authorization is not determined (ios)
//         const permissionGranted = await requestLocationPermission()
//         if (permissionGranted) {
//           LocationServices.start()
//           setIsLogging(true)
//         } else {
//           Alert.alert(languages.t('label.ACCESS1'), languages.t('label.ACCESS3'), [
//             {
//               text: languages.t('label.yes'),
//               onPress: () => BackgroundGeolocation.showAppSettings()
//             },
//             {
//               text: languages.t('label.no'),
//               onPress: () => console.log('No Pressed'),
//               style: 'cancel'
//             }
//           ])
//         }
//       }
//     })
//   }

//   const news = () => {
//     navigation.navigate('NewsScreen', {})
//   }

//   const licenses = () => {
//     navigation.navigate('LicensesScreen', {})
//   }

//   const privacy = () => {
//     navigation.navigate('PrivacyScreen', {})
//   }

//   const acknowledgement = () => {
//     navigation.navigate('AckScreen', {})
//   }

//   const statistics = () => {
//     navigation.navigate('StatisticsScreen', {})
//   }

//   const setOptOut = () => {
//     LocationServices.stop()
//     setIsLogging(false)
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.main}>
//         {/* A modal menu. Currently only used for license info */}
//         <Menu
//           style={{
//             position: 'absolute',
//             alignSelf: 'flex-end',
//             zIndex: 10
//           }}>
//           <MenuTrigger style={{ marginTop: 14 }}>
//             <Image
//               source={kebabIcon}
//               style={{
//                 width: 15,
//                 height: 28,
//                 padding: 14
//               }}
//             />
//           </MenuTrigger>
//           <MenuOptions>
//             <MenuOption
//               onSelect={() => {
//                 statistics()
//               }}>
//               <Text style={styles.menuOptionText}>{languages.t('label.statistics')}</Text>
//             </MenuOption>
//             <MenuOption
//               onSelect={() => {
//                 licenses()
//               }}>
//               <Text style={styles.menuOptionText}>{languages.t('label.Licenses')}</Text>
//             </MenuOption>
//             <MenuOption
//               onSelect={() => {
//                 privacy()
//               }}>
//               <Text style={styles.menuOptionText}>{languages.t('label.privacy')}</Text>
//             </MenuOption>
//             <MenuOption
//               onSelect={() => {
//                 acknowledgement()
//               }}>
//               <Text style={styles.menuOptionText}>{languages.t('label.Acknowledgements')}</Text>
//             </MenuOption>
//           </MenuOptions>
//         </Menu>

//         <View style={styles.buttonsAndLogoView}>
//           {isLogging ? (
//             <>
//               <Image
//                 source={pkLogo}
//                 style={{
//                   width: 132,
//                   height: 164.4,
//                   alignSelf: 'center',
//                   marginTop: 12
//                 }}
//               />
//               <TouchableOpacity
//                 onPress={() => setOptOut()}
//                 style={styles.stopLoggingButtonTouchable}>
//                 <Text style={styles.stopLoggingButtonText}>
//                   {languages.t('label.stop_logging')}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={mapLocations} style={styles.startLoggingButtonTouchable}>
//                 <Text style={styles.startLoggingButtonText}>{languages.t('label.overlap')}</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <Image
//                 source={pkLogo}
//                 style={{
//                   width: 132,
//                   height: 164.4,
//                   alignSelf: 'center',
//                   marginTop: 12,
//                   opacity: 0.3
//                 }}
//               />
//               <TouchableOpacity
//                 onPress={() => willParticipate()}
//                 style={styles.startLoggingButtonTouchable}>
//                 <Text style={styles.startLoggingButtonText}>
//                   {languages.t('label.start_logging')}
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {isLogging ? (
//             <Text style={styles.sectionDescription}>{languages.t('label.logging_message')}</Text>
//           ) : (
//             <Text style={styles.sectionDescription}>
//               {languages.t('label.not_logging_message')}
//             </Text>
//           )}
//         </View>

//         <View style={styles.actionButtonsView}>
//           <TouchableOpacity
//             onPress={() => {
//               if (!netInfo.isInternetReachable) {
//                 Alert.alert(
//                   languages.t('label.alert.title.warning'),
//                   languages.t('label.alert.no_internet_connection'),
//                   [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
//                 )
//                 return
//               }
//               navigation.navigate('SymptomCheckerScreen', {})
//             }}
//             style={styles.actionButtonsTouchable}>
//             <Text style={styles.actionButtonHead}>&#x1F50D;</Text>
//             <Text style={styles.actionButtonText}>{languages.t('label.SYMPTOM_CHECKER')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={news} style={styles.actionButtonsTouchable}>
//             <Image style={styles.actionButtonImage} source={newsImage} resizeMode='contain' />
//             <Text style={styles.actionButtonText}>{languages.t('label.news')}</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.actionButtonsView}>
//           <TouchableOpacity onPress={importData} style={styles.actionButtonsTouchable}>
//             <Image style={styles.actionButtonImage} source={exportImage} resizeMode='contain' />
//             <Text style={styles.actionButtonText}>{languages.t('label.import.button_text')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={exportData} style={styles.actionButtonsTouchable}>
//             <Image
//               style={[styles.actionButtonImage, { transform: [{ rotate: '180deg' }] }]}
//               source={exportImage}
//               resizeMode='contain'
//             />
//             <Text style={styles.actionButtonText}>{languages.t('label.export')}</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.footer}>
//           <View style={styles.rowContainer}>
//             <Image source={logo1} style={styles.infoCardLogo} />
//             <Image source={logo2} style={styles.infoCardLogo} />
//             <Image source={logo3} style={styles.infoCardLogo} />
//           </View>
//           <Text style={[styles.sectionDescription, { textAlign: 'center', paddingTop: 15 }]}>
//             {languages.t('label.url_info')}{' '}
//           </Text>
//           <Text
//             style={[
//               styles.sectionDescriptionLow,
//               { color: 'blue', textAlign: 'center', marginTop: 0 }
//             ]}
//             onPress={() => Linking.openURL(languages.t('label.private_kit_url'))}>
//             {languages.t('label.private_kit_url')}
//           </Text>
//           <Text style={{ textAlign: 'center' }}>{getVersion()}</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   // Container covers the entire screen
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: colors.PRIMARY_TEXT,
//     backgroundColor: colors.WHITE
//   },
//   rowContainer: {
//     flexDirection: 'row'
//   },
//   infoCardLogo: {
//     alignSelf: 'center',
//     marginTop: '10%',
//     width: 100,
//     height: 50,
//     resizeMode: 'contain'
//   },
//   headerTitle: {
//     textAlign: 'center',
//     fontSize: 38,
//     padding: 0,
//     fontFamily: 'OpenSans-Bold'
//   },
//   subHeaderTitle: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 22,
//     padding: 5
//   },
//   main: {
//     alignItems: 'center',
//     width: '100%'
//   },
//   buttonsAndLogoView: {
//     flex: 6,
//     justifyContent: 'space-around'
//   },
//   actionButtonsView: {
//     width: width * 0.7866,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flex: 2,
//     alignItems: 'center',
//     marginTop: 20
//   },
//   footer: {
//     textAlign: 'center',
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingBottom: 10,
//     justifyContent: 'flex-end'
//   },
//   sectionDescription: {
//     fontSize: 12,
//     lineHeight: 15,
//     fontFamily: 'OpenSans-Regular',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 10,
//     // IX
//     textAlign: 'center',
//     marginBottom: 2
//   },
//   sectionDescriptionLow: {
//     fontSize: 12,
//     lineHeight: 15,
//     fontFamily: 'OpenSans-Regular',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 0,
//     // IX
//     textAlign: 'center',
//     marginBottom: 5
//   },
//   startLoggingButtonTouchable: {
//     borderRadius: 12,
//     backgroundColor: '#665eff',
//     height: 52,
//     alignSelf: 'center',
//     width: width * 0.7866,
//     marginTop: 30,
//     justifyContent: 'center',
//     marginBottom: 20
//   },
//   startLoggingButtonText: {
//     fontFamily: 'OpenSans-Bold',
//     fontSize: 14,
//     lineHeight: 19,
//     letterSpacing: 0,
//     textAlign: 'center',
//     color: '#ffffff'
//   },
//   stopLoggingButtonTouchable: {
//     borderRadius: 12,
//     backgroundColor: '#fd4a4a',
//     height: 52,
//     alignSelf: 'center',
//     width: width * 0.7866,
//     marginTop: 30,
//     justifyContent: 'center'
//   },
//   stopLoggingButtonText: {
//     fontFamily: 'OpenSans-Bold',
//     fontSize: 14,
//     lineHeight: 19,
//     letterSpacing: 0,
//     textAlign: 'center',
//     color: '#ffffff'
//   },
//   actionButtonsTouchable: {
//     height: 76,
//     borderRadius: 8,
//     backgroundColor: '#454f63',
//     width: width * 0.23,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//     marginLeft: 10
//   },
//   actionButtonImage: {
//     height: 21.6,
//     width: 32.2
//   },
//   actionButtonText: {
//     opacity: 0.56,
//     fontFamily: 'OpenSans-Bold',
//     fontSize: 10,
//     lineHeight: 17,
//     letterSpacing: 0,
//     textAlign: 'center',
//     color: '#ffffff',
//     marginTop: 6
//   },
//   menuOptionText: {
//     fontFamily: 'OpenSans-Regular',
//     fontSize: 14,
//     padding: 10
//   }
// })
