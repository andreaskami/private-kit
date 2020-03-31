import React from 'react';
import { AppState, Linking, StyleSheet, Text, View } from 'react-native';
import VersionNumber from 'react-native-version-number';

export default class IxnilatisVersionChecker extends React.Component {
  state = {
    message: null,
    url: null,
  };

  getLatestVersion = () => {
    return Promise.resolve({
      version: '1.0.1',
      message:
        'CovTracer has a new version! Please download it from the link below',
      url: 'http://covid-19.rise.org.cy',
    });
    //return fetch('http://covid-19.rise.org.cy/version/').then(r => r.json());
  };

  checkVersion = async () => {
    if (AppState.currentState === 'background') {
      return;
    }

    this.getLatestVersion()
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
      <View>
        <Text style={styles.message}>{this.state.message}</Text>
        <Text
          style={styles.url}
          onPress={() => Linking.openURL(this.state.url)}>
          {this.state.url}
        </Text>
      </View>
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
