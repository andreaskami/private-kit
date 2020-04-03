import React from 'react';
import {
  AppState,
  Linking,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import VersionNumber from 'react-native-version-number';
import { getLanguages } from 'react-native-i18n';

export default class IxnilatisVersionChecker extends React.Component {
  state = {
    message: null,
    url: null,
  };

  getLatestVersion = lang => {
    const langSafe = new Set(['gr', 'en']).has(lang) ? lang : 'en';
    return fetch(
      `http://covid-19.rise.org.cy/version/current_${langSafe}.json`,
    ).then(r => r.json());
  };

  checkVersion = async () => {
    if (AppState.currentState === 'background') {
      return;
    }

    const languages = await getLanguages();
    const userLang = languages[0].split('-')[0]; // ['en-US' will become 'en']

    this.getLatestVersion(userLang)
      .then(response => {
        if (response.version !== VersionNumber.appVersion) {
          this.setState({ message: response.message, url: response.url });
        }
      })
      .catch(e => console.log(e));
  };
  componentDidMount() {
    this.checkVersion();
    AppState.addEventListener('change', this.checkVersion);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.checkVersion);
  }
  render() {
    return this.state.message !== null ? (
      <SafeAreaView>
        <Text style={styles.message}>{this.state.message}</Text>
        <Text
          style={styles.url}
          onPress={() => Linking.openURL(this.state.url)}>
          {this.state.url}
        </Text>
      </SafeAreaView>
    ) : (
      this.props.children
    );
  }
}

const styles = StyleSheet.create({
  message: { textAlign: 'center', fontSize: 18, margin: 15 },
  url: {
    textAlign: 'center',
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
