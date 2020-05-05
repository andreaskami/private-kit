import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'

import languages from '../../locales/languages'
import PreviousNextButtons from './PreviousNextButtons'
import Symptom from './Symptom'

export default function Symptoms (props) {
  function toggleSymptom (id) {
    let symptoms = new Set(props.data.symptoms)

    if (id === 'none_of_the_above' && symptoms.has(id)) {
      symptoms = new Set([])
    } else if (id === 'none_of_the_above' && !symptoms.has(id)) {
      symptoms = new Set(['none_of_the_above'])
    } else {
      // eslint-disable-next-line
      symptoms.has(id) ? symptoms.delete(id) : symptoms.add(id)
    }

    props.dispatch({ symptoms })
  }
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.symptoms')}</Text>

      <Text style={styles.question}>{languages.t('label.symptoms_question')}</Text>

      <View style={styles.symptomsContainer}>
        <ScrollView>
          <Symptom
            title={languages.t('label.symptom_fever')}
            id='fever'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_malaise')}
            id='malaise'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_myalgia')}
            id='myalgia'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_cough')}
            id='cough'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_breathing_difficulties')}
            id='breathing_difficulties'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_chest_pain')}
            id='chest_pain'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_loss_of_taste')}
            id='loss_of_taste'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_loss_of_smell')}
            id='loss_of_smell'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_other')}
            id='other'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={props.data.symptoms.has('none_of_the_above')}
          />
          <Symptom
            title={languages.t('label.symptom_none_of_the_above')}
            id='none_of_the_above'
            onChange={toggleSymptom}
            symptoms={props.data.symptoms}
            disabled={false}
          />
        </ScrollView>
      </View>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={props.data.symptoms.size === 0}
        previousCallback={props.previousStep}
        previousDisabled={false}
      />
    </View>
  )
}

Symptoms.propTypes = {
  data: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
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
  symptomsContainer: {
    flex: 0,
    maxHeight: 260,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  }
})
