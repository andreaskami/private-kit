import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import languages from '../../app/locales/languages'
import PreviousNextButtons from './PreviousNextButtons'

export default function Confirmation (props) {
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.confirmation')}</Text>

      <Text style={styles.question}>{languages.t('label.confirmation_question')}</Text>
      <View style={styles.switchContainer}>
        <Text style={{ fontSize: 18, marginRight: 5 }}>
          {props.data.isReal ? languages.t('label.yes') : languages.t('label.no')}
        </Text>
        <Switch
          value={props.data.isReal}
          onValueChange={() =>
            props.dispatch({
              isReal: !props.data.isReal
            })
          }
        />
      </View>

      <Text style={[styles.question, { marginBottom: 30, color: 'red' }]}>
        {languages.t('label.confirmation_question2')}
      </Text>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={props.isLoading}
        previousCallback={props.previousStep}
        previousDisabled={props.isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22
  },
  question: {
    marginTop: 10,
    textAlign: 'center'
  },
  switchContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
})
