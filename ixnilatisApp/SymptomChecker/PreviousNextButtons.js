import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import languages from '../../app/locales/languages'
import colors from '../../app/constants/colors'

export default function PreviousNextButtons (props) {
  return (
    <View style={styles.buttonContainer}>
      <Text
        onPress={!props.previousDisabled ? props.previousCallback : () => null}
        style={props.previousDisabled ? styles.disabledButton : styles.button}>
        {languages.t('label.back')}
      </Text>
      <Text
        onPress={!props.nextDisabled ? props.nextCallback : () => null}
        style={props.nextDisabled ? styles.disabledButton : styles.button}>
        {languages.t('label.next')}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    height: 40,
    width: '30%',
    textAlign: 'center',
    borderRadius: 12,
    padding: 10,
    color: colors.WHITE,
    backgroundColor: colors.DODGER_BLUE
  },
  disabledButton: {
    height: 40,
    width: '30%',
    textAlign: 'center',
    borderRadius: 12,
    padding: 10,
    color: colors.WHITE,
    backgroundColor: colors.SILVER
  }
})
