import React from 'react'
import { Picker, StyleSheet, Switch, Text, View } from 'react-native'
import languages from '../../app/locales/languages'
import PreviousNextButtons from './PreviousNextButtons'
import countries from '../countries'

export default function Travel (props) {
  console.log(props.data.travelCountry)
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.travel')}</Text>

      <Text style={styles.question}>{languages.t('label.travel_question')}</Text>
      <View style={styles.switchContainer}>
        <Text style={{ fontSize: 18, marginRight: 5 }}>
          {props.data.hasTravelled ? languages.t('label.yes') : languages.t('label.no')}
        </Text>
        <Switch
          value={props.data.hasTravelled}
          onValueChange={() =>
            props.dispatch({
              hasTravelled: !props.data.hasTravelled
            })
          }
        />
      </View>

      {props.data.hasTravelled && (
        <View style={styles.inputContainer}>
          <Text style={styles.question}>{languages.t('label.travel_question_country')}</Text>
          <Picker
            style={styles.input}
            selectedValue={props.data.travelCountry}
            onValueChange={travelCountry => props.dispatch({ travelCountry })}>
            <Picker.Item label='' value='' />
            {countries.map((country, index) => (
              <Picker.Item
                key={index}
                label={`${country.name} (${country.nativeName})`}
                value={country.alpha2Code}
              />
            ))}
          </Picker>
        </View>
      )}

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={props.data.hasTravelled && !props.data.travelCountry}
        previousCallback={props.previousStep}
        previousDisabled={false}
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
  inputContainer: {
    paddingLeft: 10
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
