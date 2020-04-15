import React from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import languages from '../../app/locales/languages';
import PreviousNextButtons from './PreviousNextButtons';
import countries from '../countries';

export default function Demographics(props) {
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.demographics')}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.age')} *</Text>
        <TextInput
          value={props.data.age}
          onChangeText={age => props.dispatch({ age })}
          style={styles.input}
          keyboardType='number-pad'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.gender')}</Text>
        <Picker
          selectedValue={props.data.gender}
          onValueChange={gender => props.dispatch({ gender })}
          style={styles.input}>
          <Picker.Item label='' value='' />
          <Picker.Item label={languages.t('label.male')} value='male' />
          <Picker.Item label={languages.t('label.female')} value='female' />
          <Picker.Item
            label={languages.t('label.prefer_not_to_say')}
            value='nosay'
          />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.postal_code')} *</Text>
        <TextInput
          value={props.data.postalCode}
          onChangeText={postalCode => props.dispatch({ postalCode })}
          style={styles.input}
          keyboardType='number-pad'
        />
      </View>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={props.data.age === '' || props.data.postalCode === ''}
        previousCallback={() => true}
        previousDisabled
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
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    borderWidth: 1,
  },
  label: {},
});
