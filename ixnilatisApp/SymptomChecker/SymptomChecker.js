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

export default function SymptomChecker(props) {
  const [results, setResults] = React.useState(sampleResult);
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
      // unique_identification: 'unknown',
      // lat: '0.00',
      // long: '0.00',
    };
    setLoading(true);
    const languages = await getLanguages();
    const userLang = languages[0].split('-')[0]; // ['en-US' will become 'en']
    checkSymptoms(request, userLang)
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
        <Results results={results} />
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

const sampleResult = {
  html:
    '<h1><b>Your travel history and symptoms are indicative of a respiratory virus, which may be COVID-19.</b></h1> <p style="text-align: center; padding-left: 10px"> <br/> <p class="text-center"><strong>According to official instructions you should act as follows:</strong></p> <ul style="text-align: left;float: left;padding-left: 10%;"> <li> Contact your general practitioner who will arrange your further examination and treatment.* </li> <li>Remain in quarantine for two weeks.  </li> <li>The COVID19 Emergency Response Line (1420) should be called only in case of emergency.</li> <li>Inform those you have been in close contact with to monitor their health, stay home if possible, and to fill out this self-assessment questionnaire for further instructions if necessary </li> </ul> </p>',
  suggest: 'CASE4',
  text:
    'Your travel history and symptoms are indicative of a respiratory virus, which may be COVID-19. |   |  According to official instructions you should act as follows: |  Contact your general practitioner who will arrange your further examination and treatment.* |  Remain in quarantine for two weeks. |  The COVID19 Emergency Response Line (1420) should be called only in case of emergency. |  Inform those you have been in close contact with to monitor their health, stay home if possible, and to fill out this self-assessment questionnaire for further instructions if necessary',
  textArray: {
    instructions: [
      'Contact your general practitioner who will arrange your further examination and treatment.*',
      'Remain in quarantine for two weeks.',
      'The COVID19 Emergency Response Line (1420) should be called only in case of emergency.',
      'Inform those you have been in close contact with to monitor their health, stay home if possible, and to fill out this self-assessment questionnaire for further instructions if necessary',
    ],
    prompt: 'According to official instructions you should act as follows:',
    result: '',
    title:
      'Your travel history and symptoms are indicative of a respiratory virus, which may be COVID-19.',
  },
};
