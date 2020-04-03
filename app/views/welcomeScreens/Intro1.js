import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import welcome1 from './../../assets/images/welcome1.png';
import languages from './../../locales/languages';
import logo1 from './../../assets/images/logo1.png';
import logo2 from './../../assets/images/logo2.png';
import logo3 from './../../assets/images/logo3.png';

const width = Dimensions.get('window').width;

const Intro1 = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoCard}>
        <Image source={welcome1} style={styles.infoCardImage} />
        <Text style={styles.infoCardHeadText}>
          {languages.t('label.private_kit')}
        </Text>
        <Text style={styles.infoCardBodyText}>
          {languages.t('label.intro1_para1')}
        </Text>
        <View style={styles.rowContainer}>
          <Image source={logo3} style={styles.infoCardLogo} />
        </View>
      </View>
      <View style={styles.navigationDotsView}>
        <View style={styles.activeIndicator} />
        <TouchableOpacity
          onPress={() => props.swipe(1)}
          style={styles.inactiveIndicator}
        />
        <TouchableOpacity
          onPress={() => props.swipe(2)}
          style={styles.inactiveIndicator}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.swipe(1)}
        style={styles.primaryButtonTouchable}>
        <Text style={styles.primaryButtonText}>
          {languages.t('label.next')}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity><Text style={{marginTop:12,fontFamily:'OpenSans-SemiBold',alignSelf:'center',color:'#665eff'}}>Skip this</Text></TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoCard: {
    width: width * 0.7866,
    backgroundColor: '#3497fc',
    height: '70%',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: '9%',
  },
  infoCardImage: {
    alignSelf: 'center',
    width: width * 0.5,
    height: width * 0.5,
    marginTop: '16%',
  },
  infoCardLogo: {
    alignSelf: 'center',
    marginTop: '1%',
    flex: 1,
    width: 85,
    height: 60,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  infoCardHeadText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 40,
    lineHeight: 55,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
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
    marginTop: 20,
  },
  navigationDotsView: {
    flexDirection: 'row',
    left: width * 0.445,
    marginTop: 30,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 13,
    backgroundColor: '#665EFF',
    opacity: 1,
    marginRight: 8,
  },
  inactiveIndicator: {
    width: 8,
    height: 8,
    opacity: 0.32,
    borderRadius: 13,
    backgroundColor: '#78849e',
    marginRight: 8,
  },
  primaryButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#3497fc',
    height: 52,
    alignSelf: 'center',
    width: width * 0.7866,
    marginTop: 30,
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default Intro1;
