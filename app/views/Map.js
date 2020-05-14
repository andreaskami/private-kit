import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Linking,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import moment from 'moment'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import colors from '../constants/colors'
import { GetStoreData } from '../helpers/General'
import greenMarker from '../assets/images/user-green.png'
import backArrow from '../assets/images/backArrow.png'
import languages from '../locales/languages'

const width = Dimensions.get('window').width

const INITIAL_REGION = {
  latitude: 35.185,
  longitude: 33.382,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}

function MapScreen () {
  const [markers, setMarkers] = useState([])
  const [allLocations, setAllLocations] = useState([])
  const [showingLast, setShowingLast] = useState(0)
  const [period, setPeriod] = useState('All day')

  const [initialRegion, setInitialRegion] = useState(INITIAL_REGION)
  const { navigate } = useNavigation()
  const mapView = useRef()

  const filterByPeriod = useCallback(
    timestamp => {
      const timestampHour = moment(timestamp).format('HH')

      if (period === 'All day') return true

      let timestampPeriod
      if (timestampHour === 0 || timestampHour < 12) {
        timestampPeriod = 'Morning'
      } else if (timestampHour < 19) {
        timestampPeriod = 'Afternoon'
      } else {
        timestampPeriod = 'Evening'
      }

      return timestampPeriod === period
    },
    [period]
  )

  const populateMarkers = useCallback(async locationArray => {
    const markersTemp = []
    const previousMarkers = {}
    for (var i = 0; i < locationArray.length - 1; i += 1) {
      const coord = locationArray[i]
      const lat = coord.latitude
      const long = coord.longitude
      const key = String(lat) + '|' + String(long)
      if (key in previousMarkers) {
        previousMarkers[key] += 1
      } else {
        previousMarkers[key] = 0
        const marker = {
          coordinate: {
            latitude: lat,
            longitude: long
          },
          key: i + 1,
          time: coord.time
        }
        markersTemp.push(marker)
      }
    }
    setMarkers(markersTemp)
  }, [])

  const getInitialState = useCallback(() => {
    try {
      GetStoreData('LOCATION_DATA').then(locationArrayString => {
        const locationArray = JSON.parse(locationArrayString)

        if (locationArray !== null) {
          const { latitude, longitude } = locationArray.slice(-1)[0]

          if (mapView.current) {
            mapView.current.animateCamera({ center: { latitude, longitude } })
          }

          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.010922,
            longitudeDelta: 0.020421
          })
          setAllLocations(locationArray)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  function backToMain () {
    navigate('HomeScreen', {})
  }

  function handleBackPress () {
    navigate('HomeScreen', {})
    return true
  }

  useFocusEffect(getInitialState)

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return function cleanup () {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  })

  useEffect(() => {
    const date = moment()
      .subtract(showingLast, 'd')
      .format('D')

    const filteredLocations = allLocations.filter(
      marker => moment(marker.time).format('D') === date && filterByPeriod(marker.time)
    )

    populateMarkers(filteredLocations)
  }, [showingLast, period, allLocations, filterByPeriod, populateMarkers])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrowTouchable} onPress={backToMain}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{languages.t('label.overlap_title')}</Text>
      </View>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text>History</Text>
          <Menu>
            <MenuTrigger style={{ marginLeft: 14 }}>
              <Text style={{ backgroundColor: '#EFEFEF', padding: 5 }}>
                {showingLast === 0
                  ? languages.t('label.today')
                  : `${showingLast} ${
                      showingLast === 1 ? languages.t('label.day') : languages.t('label.days')
                    } ${languages.t('label.ago')}`}
              </Text>
            </MenuTrigger>
            <MenuOptions>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
                <MenuOption
                  style={num === showingLast ? styles.menuOptionSelected : null}
                  key={num}
                  onSelect={() => setShowingLast(num)}>
                  <Text style={styles.menuOptionText}>
                    {num === 0
                      ? languages.t('label.today')
                      : `${num} ${
                          num === 1 ? languages.t('label.day') : languages.t('label.days')
                        } ${languages.t('label.ago')}`}
                  </Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text>Period</Text>
          <Menu>
            <MenuTrigger style={{ marginLeft: 14 }}>
              <Text style={{ backgroundColor: '#EFEFEF', padding: 5 }}>{period}</Text>
            </MenuTrigger>
            <MenuOptions>
              {[
                languages.t('label.period_all_day'),
                languages.t('label.period_morning'),
                languages.t('label.period_afternoon'),
                languages.t('label.period_evening')
              ].map(selectedPeriod => (
                <MenuOption
                  style={selectedPeriod === period ? styles.menuOptionSelected : null}
                  key={selectedPeriod}
                  onSelect={() => setPeriod(selectedPeriod)}>
                  <Text style={styles.menuOptionText}>{selectedPeriod}</Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            tracksViewChanges={false}
            image={greenMarker}
          />
        ))}
      </MapView>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.sectionDescription}>{languages.t('label.overlap_para_1')}</Text>
        </View>
        <View>
          <Text
            style={[styles.sectionFooter]}
            onPress={() => Linking.openURL(languages.t('private_kit_url'))}>
            {languages.t('label.nCoV2019_url_info')}{' '}
          </Text>
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
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold'
  },
  subHeaderTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 5
  },
  main: {
    textAlignVertical: 'top',
    padding: 15,
    width: '100%'
  },
  map: {
    height: '60%',
    width: '100%'
  },
  buttonTouchable: {
    borderRadius: 12,
    backgroundColor: '#665eff',
    height: 52,
    alignSelf: 'center',
    width: width * 0.7866,
    marginTop: 15,
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  mainText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
    textAlignVertical: 'center',
    padding: 20
  },
  smallText: {
    fontSize: 10,
    lineHeight: 24,
    fontWeight: '400',
    textAlignVertical: 'center',
    padding: 20
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
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular'
  },
  sectionFooter: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color: 'blue'
  },
  menuOptionSelected: {
    backgroundColor: '#EFEFEF'
  },
  menuOptionText: {
    fontFamily: 'OpenSans-Regular'
  }
})

export { MapScreen }
