import React from 'react'
import { View, Text, Dimensions, Image, Linking, TouchableOpacity, StyleSheet } from 'react-native'
import languages from '../../locales/languages'
import PropTypes from 'prop-types'

import logo1 from './../../assets/images/logo1.png'
import logo2 from './../../assets/images/logo2.png'
import logo3 from './../../assets/images/logo3.png'
import { SetStoreData } from '../../helpers/General'

const width = Dimensions.get('window').width

const Intro3 = props => (
  <View style={styles.mainContainer}>
    <View style={styles.infoCard}>
      <Text style={styles.infoCardHeadText}>{languages.t('label.intro3_title1')}</Text>
      <Text style={styles.infoCardBodyText}>{languages.t('label.intro3_para1')}</Text>
      <View style={styles.rowContainer}>
        <Image source={logo1} style={styles.infoCardLogo} />
        <Image source={logo2} style={styles.infoCardLogo} />
        <Image source={logo3} style={styles.infoCardLogo} />
      </View>

      <Text
        style={(styles.sectionDescription, { color: 'blue', textAlign: 'center' })}
        onPress={() => Linking.openURL('http://covid-19.rise.org.cy')}
        style={{
          ...styles.infoCardBodyText,
          fontFamily: 'OpenSans-Bold',
          opacity: 1,
          marginTop: 12
        }}>
        {languages.t('label.url_info')} {languages.t('label.private_kit_url')}
      </Text>
    </View>

    <View style={styles.navigationDotsView}>
      <TouchableOpacity onPress={() => props.swipe(-2)} style={styles.inactiveIndicator} />

      <TouchableOpacity onPress={() => props.swipe(-1)} style={styles.inactiveIndicator} />
      <View style={styles.activeIndicator} />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => props.swipe(-1)} style={styles.secondaryButtonTouchable}>
        <Text style={styles.secondaryButtonText}>{languages.t('label.back')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          SetStoreData('ONBOARDING_COMPLETE', true)
          props.navigation.navigate('HomeScreen')
        }}
        style={styles.primaryButtonTouchable}>
        <Text style={styles.primaryButtonText}>{languages.t('label.start')}</Text>
      </TouchableOpacity>
    </View>

    {/* <TouchableOpacity><Text style={{marginTop:12,fontFamily:'OpenSans-SemiBold',alignSelf:'center',color:'#665eff'}}>Skip this</Text></TouchableOpacity> */}
  </View>
)

Intro3.propTypes = {
  swipe: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  sectionDescription: {
    marginTop: '9%'
  },
  infoCard: {
    width: width * 0.7866,
    backgroundColor: '#3497fc',
    height: '70%',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: '9%',
    justifyContent: 'center'
  },
  infoCardImage: {
    alignSelf: 'center',
    width: width * 0.5,
    height: width * 0.5,
    margin: '16%'
  },
  infoCardHeadText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    lineHeight: 55,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  infoCardBodyText: {
    opacity: 0.8,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    maxWidth: '84%',
    alignSelf: 'center',
    marginTop: 20
  },
  infoCardLogo: {
    alignSelf: 'center',
    marginTop: '10%',
    flex: 1,
    width: 65,
    height: 40,
    resizeMode: 'contain'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  navigationDotsView: {
    flexDirection: 'row',
    left: width * 0.445,
    marginTop: 30
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 13,
    backgroundColor: '#665EFF',
    opacity: 1,
    marginRight: 8
  },
  inactiveIndicator: {
    width: 8,
    height: 8,
    opacity: 0.32,
    borderRadius: 13,
    backgroundColor: '#78849e',
    marginRight: 8
  },
  primaryButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#3497fc',
    height: 52,
    alignSelf: 'center',
    width: width * 0.38,
    marginTop: 30,
    justifyContent: 'center'
  },
  primaryButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.7866,
    alignSelf: 'center'
  },
  secondaryButtonTouchable: {
    borderRadius: 12,
    backgroundColor: 'rgba(120, 132, 158, 0.16)',
    height: 52,
    alignSelf: 'center',
    width: width * 0.38,
    marginTop: 30,
    justifyContent: 'center'
  },
  secondaryButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#454f63'
  }
})

export default Intro3