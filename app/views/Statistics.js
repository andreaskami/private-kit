import React, { useState, useEffect, useMemo } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from 'react-native'

import colors from '../constants/colors'
import backArrow from './../assets/images/backArrow.png'
import languages from '../locales/languages'
import { VictoryBar, VictoryAxis, VictoryChart, VictoryZoomContainer } from 'victory-native'
import PropTypes from 'prop-types'

import { getLatestStatistics } from '../services/httpClient'

const width = Dimensions.get('window').width

export const StatisticsScreen = ({ navigation }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const latestUpdate = useMemo(() => {
    if (data.length === 0) return null

    return data[data.length - 1]
  }, [data])

  const chartData = useMemo(() => {
    if (!data.length) return

    return data.map(record => ({
      date: record.fields.date,
      cases: parseInt(record.fields.newCases)
    }))
  }, [data])

  useEffect(() => {
    fetchStatistics()

    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
  }, [])

  const fetchStatistics = async () => {
    try {
      const res = await getLatestStatistics().then(r => r.json())
      setData(res.records.filter(record => Object.values(record.fields).length > 0))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const backToMain = () => {
    navigation.navigate('HomeScreen', {})
  }

  const handleBackPress = () => {
    navigation.navigate('HomeScreen', {})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrowTouchable} onPress={backToMain}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{languages.t('label.statistics')}</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.pageTitle}>{languages.t('label.statistics_title')}</Text>

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
                    <Text style={styles.value}>+{latestUpdate.fields.newCases}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text>{languages.t('label.total_cases')}: </Text>
                    <Text style={styles.value}>{latestUpdate.fields.totalCases}</Text>
                  </View>
                </View>
              </View>
            )}

            <VictoryChart
              width={width}
              domainPadding={10}
              containerComponent={<VictoryZoomContainer />}>
              <VictoryAxis fixLabelOverlap style={{ tickLabels: { padding: 10, fontSize: 12 } }} />
              <VictoryAxis dependentAxis />
              <VictoryBar data={chartData} x='date' y='cases' />
            </VictoryChart>
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
  )
}

StatisticsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE
  },
  main: {
    flex: 1,
    width: '100%'
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold'
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginLeft: 20,
    marginTop: 20
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199,0.6)',
    alignItems: 'center'
  },
  backArrowTouchable: {
    width: 60,
    height: 60,
    paddingTop: 21,
    paddingLeft: 20
  },
  backArrow: {
    height: 18,
    width: 18.48
  },
  loadingIndicator: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  latestUpdateContainer: {
    padding: 20
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  value: {
    fontWeight: 'bold'
  }
})
