import React from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import languages from '../../app/locales/languages';

export default function Demographics() {
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.demographics')}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.age')}</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.gender')}</Text>
        <Picker style={styles.input}>
          <Picker.Item label='' value='' />
          <Picker.Item label='Male' value='male' />
          <Picker.Item label='Female' value='female' />
          <Picker.Item label='Prefer not to say' value='nosay' />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.postal_code')}</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{languages.t('label.country')}</Text>
        <Picker style={styles.input}>
          <Picker.Item label='' value='' />
          <Picker.Item label='Cyprus' value='cy' />
          <Picker.Item label='Greece' value='gr' />
        </Picker>
      </View>
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
  },
  input: {
    borderWidth: 1,
    width: '50%',
  },
  label: {
    width: '50%',
  },
});
