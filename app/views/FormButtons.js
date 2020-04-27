import React from 'react'
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import languages from '../locales/languages'
import { hasFormsLeft, getWaitTimeLeft } from '../helpers/formLimitations'

const width = Dimensions.get('window').width

export const FormButtons = ({ navigation }) => {
  const newForm = async () => {
    const hasForms = await hasFormsLeft()
    if (!hasForms) {
      Alert.alert(
        languages.t('label.FORMGENERAL_COUNTLIMIT_TITLE'),
        languages.t('label.FORMGENERAL_COUNTLIMIT_MESSAGE')
      )
      return
    }

    const timeLeft = await getWaitTimeLeft()
    if (timeLeft > 0) {
      Alert.alert(
        languages.t('label.FORMGENERAL_TIMELIMIT_TITLE'),
        languages.t('label.FORMGENERAL_TIMELIMIT_MESSAGE', {
          minutes: timeLeft
        })
      )
      return
    }

    navigation.navigate('FormGeneralNewScreen', {})
  }

  return (
    <View style={styles.actionButtonsView}>
      {false && (
        <TouchableOpacity
          onPress={() => navigation.navigate('FormWorkScreen', {})}
          style={styles.actionButtonsTouchable}>
          <Text style={styles.actionButtonHead}>{languages.t('label.FORM_A')}</Text>
          <Text style={styles.actionButtonText}>{languages.t('label.FORMWORK')}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={newForm} style={styles.actionButtonsTouchable}>
        <Text style={styles.actionButtonHead}>&#9997;</Text>
        <Text style={styles.actionButtonText}>{languages.t('label.FORMGENERAL_NEW')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('FormGeneralActiveScreen', {})}
        style={styles.actionButtonsTouchable}>
        <Text style={styles.actionButtonHead}>&#128196;</Text>
        <Text style={styles.actionButtonText}>{languages.t('label.FORMGENERAL_ACTIVE')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButtonsView: {
    width: width * 0.7866,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35
  },
  actionButtonsTouchable: {
    height: 76,
    borderRadius: 8,
    backgroundColor: '#454f63',
    width: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: 3
  },
  actionButtonHead: {
    opacity: 1,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 3
  }
})
