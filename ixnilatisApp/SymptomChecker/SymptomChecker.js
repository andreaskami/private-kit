import React from 'react';
import colors from '../../app/constants/colors';
import { StyleSheet, View } from 'react-native';
import Form from './Form';
import Results from './Results';
import Header from '../layout/Header';
import languages from '../../app/locales/languages';

export default function SymptomChecker(props) {
  const [results, setResults] = React.useState(null);

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        title={languages.t('label.SYMPTOM_CHECKER')}
      />
      {results === null ? <Form /> : <Results results={results} />}
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
});
