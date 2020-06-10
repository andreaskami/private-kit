import React from 'react'
import colors from '../../constants/colors'
import { StyleSheet, View, ScrollView } from 'react-native'
import Demographics from './Demographics'
import Medical from './Medical'
import Travel from './Travel'
import Symptoms from './Symptoms'
import Exposure from './Exposure'
import Confirmation from './Confirmation'

const steps = ['demographics', 'medical', 'travel', 'symptoms', 'exposure', 'confirmation']

function formReducer (state, action) {
  return {
    ...state,
    ...action
  }
}

export default function Form (props) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [data, dispatch] = React.useReducer(formReducer, {
    age: null,
    gender: null,
    postalCode: null,
    hasMedicalCondition: false,
    hasTravelled: false,
    travelCountry: null,
    symptoms: new Set([]),
    hasBeenExposed: false,
    isReal: false
  })

  function nextStep () {
    setCurrentStep(curr => (curr + 1 < steps.length ? curr + 1 : curr))
  }
  function previousStep () {
    setCurrentStep(curr => (curr - 1 >= 0 ? curr - 1 : curr))
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        {steps[currentStep] === 'demographics' && (
          <Demographics nextStep={nextStep} data={data} dispatch={dispatch} />
        )}
        {steps[currentStep] === 'medical' && (
          <Medical
            nextStep={nextStep}
            previousStep={previousStep}
            data={data}
            dispatch={dispatch}
          />
        )}
        {steps[currentStep] === 'travel' && (
          <Travel nextStep={nextStep} previousStep={previousStep} data={data} dispatch={dispatch} />
        )}
        {steps[currentStep] === 'symptoms' && (
          <Symptoms
            nextStep={nextStep}
            previousStep={previousStep}
            data={data}
            dispatch={dispatch}
          />
        )}
        {steps[currentStep] === 'exposure' && (
          <Exposure
            nextStep={nextStep}
            previousStep={previousStep}
            data={data}
            dispatch={dispatch}
          />
        )}
        {steps[currentStep] === 'confirmation' && (
          <Confirmation
            nextStep={() => props.onSubmit(data)}
            previousStep={previousStep}
            data={data}
            dispatch={dispatch}
            isLoading={props.isLoading}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE
  }
})
