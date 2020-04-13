import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import languages from '../../app/locales/languages';

const width = Dimensions.get('window').width;

function CheckerButton(props) {
  return (
    <View style={styles.actionButtonsView}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('SymptomCheckerScreen', {})}
        style={styles.actionButtonsTouchable}>
        <Text style={styles.actionButtonHead}>&#x1F50D;</Text>
        <Text style={styles.actionButtonText}>
          {languages.t('label.SYMPTOM_CHECKER')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonsView: {
    width: width * 0.7866,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 35,
  },
  actionButtonsTouchable: {
    height: 76,
    borderRadius: 8,
    backgroundColor: '#454f63',
    width: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    opacity: 0.56,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 3,
  },
  actionButtonHead: {
    opacity: 1,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default CheckerButton;
