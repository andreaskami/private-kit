import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';

import colors from '../constants/colors';
import backArrow from './../assets/images/backArrow.png';
import languages from '../locales/languages';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
} from 'victory-native';
import { getLatestStatistics } from '../../ixnilatisApp/httpClient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const NotificationScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const latestUpdate = useMemo(() => {
    if (data.length === 0) return null;

    return data[data.length - 1];
  }, [data]);

  useEffect(() => {
    fetchStatistics();

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const fetchStatistics = async () => {
    try {
      const res = await getLatestStatistics().then(r => r.json());
      setData(res.records);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const backToMain = () => {
    navigation.navigate('LocationTrackingScreen', {});
  };

  const handleBackPress = () => {
    navigation.navigate('LocationTrackingScreen', {});
  };

  console.log(latestUpdate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrowTouchable}
          onPress={backToMain}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {languages.t('label.statistics')}
        </Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.pageTitle}>
          {languages.t('label.statistics_title')}
        </Text>

        {!loading && data.length > 0 && (
          <>
            {latestUpdate && (
              <View style={styles.latestUpdateContainer}>
                <View style={styles.row}>
                  <Text>{languages.t('label.latest_update')}: </Text>
                  <Text style={styles.value}>{latestUpdate.fields.date}</Text>
                </View>
                <View>
                  <View style={styles.row}>
                    <Text>{languages.t('label.new_cases')}: </Text>
                    <Text style={styles.value}>
                      +{latestUpdate.fields.newCases}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>{languages.t('label.total_cases')}: </Text>
                    <Text style={styles.value}>
                      {latestUpdate.fields.totalCases}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            <View style={styles.historicDataContainer}>
              <Text style={styles.historicDataTitle}>
                {languages.t('label.historic_data')}
              </Text>
              <View style={[styles.row]}>
                <Text style={{ minWidth: 120 }}>
                  {languages.t('label.date')}
                </Text>
                <Text style={{ minWidth: 120 }}>
                  {languages.t('label.new_cases')}
                </Text>
                <Text>{languages.t('label.total_cases')}</Text>
              </View>
              <ScrollView>
                {data.map(historicRecord => (
                  <View key={historicRecord.id} style={[styles.row]}>
                    <Text style={[styles.value, { minWidth: 120 }]}>
                      {latestUpdate.fields.date}
                    </Text>
                    <Text style={[styles.value, { minWidth: 120 }]}>
                      +{latestUpdate.fields.newCases}
                    </Text>
                    <Text style={styles.value}>
                      {latestUpdate.fields.totalCases}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}
        {loading && (
          <View style={styles.loadingIndicator}>
            <Text>Loading data...</Text>
          </View>
        )}
        {!loading && data.length === 0 && (
          <View>
            <Text>No data found or an error occurred.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Container covers the entire screen
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE,
  },
  main: {
    flex: 1,
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginLeft: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199,0.6)',
    alignItems: 'center',
  },
  backArrowTouchable: {
    width: 60,
    height: 60,
    paddingTop: 21,
    paddingLeft: 20,
  },
  backArrow: {
    height: 18,
    width: 18.48,
  },
  loadingIndicator: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  latestUpdateContainer: {
    padding: 20,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeaders: {
    justifyContent: 'space-between',
  },
  value: {
    fontWeight: 'bold',
  },
  historicDataContainer: {
    flex: 1,
    margin: 20,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
  },
  historicDataTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  historicRecord: {
    justifyContent: 'space-between',
    textAlign: 'left',
  },
});

export default NotificationScreen;
