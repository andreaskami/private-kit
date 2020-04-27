import React, { useMemo } from 'react'
import { Picker, StyleSheet, Text, TextInput, ScrollView, View } from 'react-native'
import languages from '../../locales/languages'
import PreviousNextButtons from './PreviousNextButtons'
import countries from '../../constants/countries.json'

export default function Demographics (props) {
  const { age, postalCode } = props.data

  const invalidAge = useMemo(() => {
    if (age === undefined || age === null) return false

    return [age < 0, age > 100, isNaN(age)].some(Boolean)
  }, [age])

  const invalidPostalCode = useMemo(() => {
    if (postalCode === undefined || postalCode === null) return false

    return [
      postalCode <= 0,
      postalCode > 9999,
      isNaN(postalCode),
      postalCode.toString().length !== 4
    ].some(Boolean)
  }, [postalCode])

  const formValid = useMemo(
    () => [!invalidAge, !invalidPostalCode, age !== null, postalCode !== null].every(Boolean),
    [invalidAge, invalidPostalCode]
  )

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.root}>
      <Text style={styles.header}>{languages.t('label.demographics')}</Text>

      <View style={styles.inputContainer}>
        <Text>{languages.t('label.age')} *</Text>
        <TextInput
          value={age}
          onChangeText={age => props.dispatch({ age })}
          style={styles.input}
          keyboardType='number-pad'
        />
        {invalidAge && <Text style={{ color: 'red' }}>Age needs to be between 0 - 100</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text>{languages.t('label.gender')}</Text>
        <Picker
          selectedValue={props.data.gender}
          onValueChange={gender => props.dispatch({ gender })}
          style={styles.input}>
          <Picker.Item label='' value='' />
          <Picker.Item label={languages.t('label.male')} value='male' />
          <Picker.Item label={languages.t('label.female')} value='female' />
          <Picker.Item label={languages.t('label.prefer_not_to_say')} value='nosay' />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text>{languages.t('label.postal_code')} *</Text>
        <TextInput
          value={postalCode}
          onChangeText={postalCode => props.dispatch({ postalCode })}
          style={styles.input}
          keyboardType='number-pad'
        />
        {invalidPostalCode && (
          <Text style={{ color: 'red' }}>Postal code needs to be between 0001 - 9999</Text>
        )}
      </View>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={!formValid}
        previousCallback={() => true}
        previousDisabled
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 4,
    color: '#000'
  }
})
