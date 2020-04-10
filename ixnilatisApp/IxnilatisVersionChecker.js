import React, { useState, useLayoutEffect } from 'react';
import {
  AppState,
  Linking,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import VersionNumber from 'react-native-version-number';
import { getLanguages } from 'react-native-i18n';

export const IxnilatisVersionChecker = ({ children }) => {
  const [downloadNewVersion, setDownloadNewVersion] = useState();

  useLayoutEffect(() => {
    checkVersion();
    AppState.addEventListener('change', checkVersion);

    return () => AppState.removeEventListener('change', checkVersion);
  }, []);

  const getLatestVersion = lang => {
    const langSafe = new Set(['gr', 'en']).has(lang) ? lang : 'en';
    return fetch(
      `http://covid-19.rise.org.cy/version/current_${langSafe}.json`,
    ).then(r => r.json());
  };

  const checkVersion = async () => {
    if (AppState.currentState === 'background') {
      return;
    }

    const languages = await getLanguages();
    const userLang = languages[0].split('-')[0]; // ['en-US' will become 'en']

    try {
      const { version, message, url } =
        (await getLatestVersion(userLang)) || {};
      if (!version) {
        console.log('Version not received');
        return;
      }

      if (version !== VersionNumber.appVersion) {
        setDownloadNewVersion({
          message,
          url,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {downloadNewVersion && (
        <SafeAreaView>
          <Text style={styles.message}>{downloadNewVersion.message}</Text>
          <Text
            style={styles.url}
            onPress={() => Linking.openURL(downloadNewVersion.url)}>
            {downloadNewVersion.url}
          </Text>
        </SafeAreaView>
      )}
      {!downloadNewVersion && children}
    </>
  );
};

const styles = StyleSheet.create({
  message: { textAlign: 'center', fontSize: 18, margin: 15 },
  url: {
    textAlign: 'center',
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
