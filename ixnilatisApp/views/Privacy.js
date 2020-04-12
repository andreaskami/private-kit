import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Linking,
} from 'react-native';

import colors from '../../app/constants/colors';
import backArrow from '../../app/assets/images/backArrow.png';
import languages from '../../app/locales/languages';

export const Privacy = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const backToMain = () => {
    navigation.navigate('LocationTrackingScreen', {});
  };

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
        <Text style={styles.headerTitle}>{languages.t('label.privacy')}</Text>
      </View>

      <ScrollView style={styles.main}>
        <Text style={styles.sectionDescription}>
          {languages.t('label.privacy_placeholder')}
        </Text>
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
    padding: 0,
    width: '96%',
    alignSelf: 'center',
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
    fontFamily: 'OpenSans-Regular',
  },
});
