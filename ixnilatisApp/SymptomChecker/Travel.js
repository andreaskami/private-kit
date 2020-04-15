import React from 'react';
import { Picker, StyleSheet, Switch, Text, View } from 'react-native';
import languages from '../../app/locales/languages';
import PreviousNextButtons from './PreviousNextButtons';
import countries from '../countries';

export default function Travel(props) {
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.travel')}</Text>

      <Text style={styles.label}>{languages.t('label.travel_question')}</Text>
      <View style={styles.switchContainer}>
        <Text style={{ fontSize: 20 }}>
          {props.data.hasTravelled
            ? languages.t('label.yes')
            : languages.t('label.no')}
        </Text>
        <Switch
          value={props.data.hasTravelled}
          onValueChange={() =>
            props.dispatch({
              hasTravelled: !props.data.hasTravelled,
            })
          }
        />
      </View>

      {props.data.hasTravelled && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {languages.t('label.travel_question_country')}
          </Text>
          <Picker
            style={styles.input}
            selectedValue={props.data.travelCountry}
            onValueChange={travelCountry => props.dispatch({ travelCountry })}>
            <Picker.Item label='' value='' />
            {countries.map((country, index) => (
              <Picker.Item
                key={index}
                label={`${country.name} (${country.nativeName})`}
                value={country}
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
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22,
  },
  inputContainer: {
    paddingLeft: 10,
  },
  label: {
    marginTop: 10,
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
