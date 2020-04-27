import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import languages from '../../app/locales/languages'
import PreviousNextButtons from './PreviousNextButtons'

export default function Medical (props) {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{languages.t('label.medical')}</Text>

      <View>
        <Text style={styles.question}>{languages.t('label.medical_condition_question')}</Text>
      </View>
      <View style={styles.conditionsContainer}>
        <View>
          <Text style={styles.condition}>
            * {languages.t('label.medical_condition_cardiovascular')}
          </Text>
          <Text style={styles.condition}>* {languages.t('label.medical_condition_diabetes')}</Text>
          <Text style={styles.condition}>* {languages.t('label.medical_condition_lung')}</Text>
          <Text style={styles.condition}>
            * {languages.t('label.medical_condition_respiratory')}
          </Text>
          <Text style={styles.condition}>* {languages.t('label.medical_condition_cancer')}</Text>
          <Text style={styles.condition}>
            * {languages.t('label.medical_condition_immunodeficiency')}
          </Text>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={{ fontSize: 18, marginRight: 5 }}>
          {props.data.hasMedicalCondition ? languages.t('label.yes') : languages.t('label.no')}
        </Text>
        <Switch
          value={props.data.hasMedicalCondition}
          onValueChange={() =>
            props.dispatch({
              hasMedicalCondition: !props.data.hasMedicalCondition
            })
          }
        />
      </View>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={false}
        previousCallback={props.previousStep}
        previousDisabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22
  },
  conditionsContainer: {
    marginTop: 20,
    padding: 10,
    flex: 0,
    alignItems: 'center',
    backgroundColor: '#efefef'
  },
  question: {
    marginTop: 10,
    textAlign: 'center'
  },
  condition: {
    marginBottom: 10,
    borderBottomWidth: 1
  },
  switchContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
})
