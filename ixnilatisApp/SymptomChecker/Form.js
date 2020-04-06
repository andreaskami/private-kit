import React from 'react';
import colors from '../../app/constants/colors';
import { StyleSheet, Text, View } from 'react-native';
import Demographics from './Demographics';
import Medical from './Medical';
import Travel from './Travel';
import Symptoms from './Symptoms';
import Exposure from './Exposure';

const steps = ['demographics', 'medical', 'travel', 'symptoms', 'exposure'];

export default function Form() {
  const [currentStep, setCurrentStep] = React.useState(0);

  function nextStep() {
    setCurrentStep(curr => (curr + 1 < steps.length ? curr + 1 : curr));
  }
  function previousStep() {
    setCurrentStep(curr => (curr - 1 >= 0 ? curr - 1 : curr));
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {steps[currentStep] == 'demographics' && <Demographics />}
        {steps[currentStep] == 'medical' && <Medical />}
        {steps[currentStep] == 'travel' && <Travel />}
        {steps[currentStep] == 'symptoms' && <Symptoms />}
        {steps[currentStep] == 'exposure' && <Exposure />}
      </View>
      <View style={styles.buttonContainer}>
        <Text onPress={previousStep} style={styles.button}>
          Previous
        </Text>
        <Text onPress={nextStep} style={styles.button}>
          Next
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    height: '80%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    height: '30%',
    width: '30%',
    textAlign: 'center',
    borderRadius: 12,
    padding: 10,
    color: colors.WHITE,
    backgroundColor: colors.DODGER_BLUE,
  },
});
