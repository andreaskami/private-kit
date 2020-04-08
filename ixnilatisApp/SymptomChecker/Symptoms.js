import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import languages from '../../app/locales/languages';
import PreviousNextButtons from './PreviousNextButtons';
import Symptom from './Symptom';

export default function Symptoms(props) {
  function toggleSymptom(id) {
    let symptoms = new Set(props.data.symptoms);
    symptoms.has(id) ? symptoms.delete(id) : symptoms.add(id);

    //Remove others if none
    if (symptoms.has('none_of_the_above')) {
      symptoms = new Set(['none_of_the_above']);
    }
    props.dispatch({ symptoms });
  }
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.symptoms')}</Text>

      <Text style={styles.label}>{languages.t('label.symptoms_question')}</Text>
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

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={props.data.symptoms.size == 0}
        previousCallback={props.previousStep}
        previousDisabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22,
  },
  label: {},
});
