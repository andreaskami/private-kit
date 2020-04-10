import React from 'react';
import colors from '../../app/constants/colors';
import { StyleSheet, View } from 'react-native';
import Form from './Form';
import Results from './Results';
import Header from '../layout/Header';
import languages from '../../app/locales/languages';
import { getLanguages } from 'react-native-i18n';
import { checkSymptoms } from '../httpClient';
import { showMessage } from 'react-native-flash-message';
import { getUniqueId } from 'react-native-device-info';

function removeLineBreaks(string) {
  return string.replace(/(\r\n|\n|\r|\s+)/gm, ' ');
}
function cleanResponse(response) {
  return {
    textArray: {
      title: removeLineBreaks(response.textArray.title),
      result: removeLineBreaks(response.textArray.result),
      prompt: removeLineBreaks(response.textArray.prompt),
      instructions: response.textArray.instructions.map(removeLineBreaks),
    },
  };
}
export default function SymptomChecker(props) {
  const [results, setResults] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  async function submitForm(data) {
    const request = {
      unique_identification: getUniqueId(),
      age: data.age,
      gender: data.gender,
      zipcode: data.postalCode,
      country: data.country,
      flight_country: data.travelCountry,
      vulnerable_group: data.hasMedicalCondition,
      malaise: data.symptoms.has('malaise') ? 1 : 0,
      fever: data.symptoms.has('fever') ? 1 : 0,
      cough: data.symptoms.has('cough') ? 1 : 0,
      myalgia: data.symptoms.has('myalgia') ? 1 : 0,
      loss_of_taste: data.symptoms.has('loss_of_taste') ? 1 : 0,
      loss_of_smell: data.symptoms.has('loss_of_smell') ? 1 : 0,
      breathing_difficulties: data.symptoms.has('breathing_difficulties')
        ? 1
        : 0,
      other_symptom: data.symptoms.has('other') ? 1 : 0,
      flight_recently: data.hasTravelled ? 1 : 0,
      covid_19_contact: data.hasBeenExposed ? 1 : 0,
      chest_pain: data.symptoms.has('chest_pain') ? 1 : 0,
      nothing: data.symptoms.has('none_of_the_above') ? 1 : 0,
    };
    setLoading(true);
    const languages = await getLanguages();
    const userLang = languages[0].split('-')[0];
    checkSymptoms(request, userLang)
      .then(cleanResponse)
      .then(setResults)
      .catch(err =>
        showMessage({
          message: err,
          type: 'danger',
        }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        title={languages.t('label.SYMPTOM_CHECKER')}
        isLoading={isLoading}
      />
      {results === null ? (
        <Form onSubmit={submitForm} />
      ) : (
        <Results results={results.textArray} />
      )}
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
