import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import languages from '../../app/locales/languages';
import PreviousNextButtons from './PreviousNextButtons';

export default function Medical(props) {
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.medical')}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {languages.t('label.medical_condition_question')}
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.condition}>
            {languages.t('label.medical_condition_cardiovascular')}
          </Text>
          <Text style={styles.condition}>
            {languages.t('label.medical_condition_diabetes')}
          </Text>
          <Text style={styles.condition}>
            {languages.t('label.medical_condition_lung')}
          </Text>
          <Text style={styles.condition}>
            {languages.t('label.medical_condition_respiratory')}
          </Text>
          <Text style={styles.condition}>
            {languages.t('label.medical_condition_cancer')}
          </Text>
          <Text style={styles.condition}>
            {languages.t('label.medical_condition_immunodeficiency')}
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 20 }}>
            {props.data.hasMedicalCondition
              ? languages.t('label.yes')
              : languages.t('label.no')}
          </Text>
          <Switch
            value={props.data.hasMedicalCondition}
            onValueChange={() =>
              props.dispatch({
                hasMedicalCondition: !props.data.hasMedicalCondition,
              })
            }
          />
        </View>
      </View>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={false}
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
  inputContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {},
  condition: {
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});
