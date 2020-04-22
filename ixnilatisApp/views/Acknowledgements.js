import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';

import colors from '../../app/constants/colors';
import backArrow from '../../app/assets/images/backArrow.png';
import languages from '../../app/locales/languages';
import cyprusGovLogo from '../../app/assets/images/cyprus-gov-logo.png';
import europeanUnionLogo from '../../app/assets/images/european-union-logo.png';
import XMLogo from '../../app/assets/images/XMlogo.jpg';

const width = Dimensions.get('window').width;

export const Acknowledgements = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const backToMain = () => navigation.navigate('LocationTrackingScreen', {});

  const handleBackPress = () => {
    navigation.navigate('LocationTrackingScreen', {});
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrowTouchable}
          onPress={backToMain}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {languages.t('label.Acknowledgements')}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.acknowledgement}>
            <Image source={europeanUnionLogo} style={styles.logo} />
            <Text style={styles.sectionDescription}>
              {languages.t('label.europeanUnionFundingAcknowledgement')}
            </Text>
          </View>
          <View style={styles.acknowledgement}>
            <Image source={cyprusGovLogo} style={styles.logo} />
            <Text style={styles.sectionDescription}>
              {languages.t('label.cyprusGovFundingAcknowledgement')}
            </Text>
          </View>
          <View style={styles.acknowledgement}>
            <Image source={XMLogo} style={styles.logo} />
            <Text style={styles.sectionDescription}>
              {languages.t('label.xmFundingAcknowledgement')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    textAlignVertical: 'top',
    padding: 10,
    width: '96%',
    alignSelf: 'center',
  },
  acknowledgement: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 250,
  },
  logo: {
    width: 150,
    height: 100,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199,0.6)',
    alignItems: 'center',
  },
  backArrowTouchable: {
    width: 60,
    height: 60,
    paddingTop: 21,
    paddingLeft: 20,
  },
  backArrow: {
    height: 18,
    width: 18.48,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'justify',
    fontFamily: 'OpenSans-Regular',
  },
});
