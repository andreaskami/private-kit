import React from 'react';
import colors from '../../app/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

const steps = ['demographics', 'medical', 'travel', 'symptoms', 'exposure'];
export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = React.useState(0);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.button}>Previous</Text>
        <Text style={styles.button}>Next</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE,
  },
  button: {
    color: colors.WHITE,
    backgroundColor: colors.DODGER_BLUE,
  },
});
