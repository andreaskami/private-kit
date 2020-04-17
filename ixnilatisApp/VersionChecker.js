import React, { useState, useLayoutEffect } from 'react';
import {
  AppState,
  Linking,
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import { getVersion } from 'react-native-device-info';
import { getLanguages } from 'react-native-i18n';
import { getLatestVersion } from './httpClient';

export const VersionChecker = ({ children }) => {
  const [downloadNewVersion, setDownloadNewVersion] = useState();

  useLayoutEffect(() => {
    if (Platform.OS !== 'ios') {
      checkVersion();
      AppState.addEventListener('change', checkVersion);
    }

    return () => AppState.removeEventListener('change', checkVersion);
  }, []);

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

      if (version !== getVersion()) {
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
