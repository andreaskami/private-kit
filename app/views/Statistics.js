import React, { useState, useEffect, useMemo } from 'react'
import {
  SafeAreaView,
  ScrollView,
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
import { VictoryBar, VictoryAxis, VictoryChart } from 'victory-native'
import PropTypes from 'prop-types'

import { getLatestStatistics } from '../services/httpClient'

const width = Dimensions.get('window').width

export const StatisticsScreen = ({ navigation }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const chartData = useMemo(() => {
    if (!data.length) return []

    return data
      .map(record => ({
        date: record.fields.date,
        cases: parseInt(record.fields.dailyCases),
        deaths: parseInt(record.fields.dailyDeaths),
        totalDeaths: parseInt(record.fields.totalDeaths),
        tests: parseInt(record.fields.dailyTests),
        totalCases: parseInt(record.fields.totalCases)
      }))
      .filter(record =>
        Object.values(record).find(recordValue => recordValue !== undefined && recordValue !== null)
      )
  }, [data])

  const latestUpdate = useMemo(() => {
    if (chartData.length === 0) return null

    return chartData[chartData.length - 1]
  }, [chartData])

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

  console.log({ chartData })
  console.log({ latestUpdate })
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
                <View style={[styles.row, styles.latestUpdateText]}>
                  <Text>{languages.t('label.latest_update')}: </Text>
                  <Text style={styles.value}>{latestUpdate.date}</Text>
                </View>
                <View style={styles.statisticsSummary}>
                  <View style={styles.statisticsSummaryField}>
                    <View style={styles.row}>
                      <Text>{languages.t('label.new_cases')}: </Text>
                      <Text style={styles.value}>+{latestUpdate.cases}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text>{languages.t('label.total_cases')}: </Text>
                      <Text style={styles.value}>{latestUpdate.totalCases}</Text>
                    </View>
                  </View>
                  <View style={styles.statisticsSummaryField}>
                    <View style={styles.row}>
                      <Text>{languages.t('label.new_deaths')}: </Text>
                      <Text style={styles.value}>{latestUpdate.deaths}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text>{languages.t('label.total_deaths')}: </Text>
                      <Text style={styles.value}>{latestUpdate.totalDeaths}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            <ScrollView>
              <Text style={styles.chartName}>
                {languages.t('label.daily_infections_chart_title')}
              </Text>

              <VictoryChart width={width} height={200} domainPadding={10}>
                <VictoryAxis
                  fixLabelOverlap
                  style={{ tickLabels: { padding: 10, fontSize: 12 } }}
                />
                <VictoryAxis dependentAxis domain={[0, 50]} />
                <VictoryBar data={chartData} x='date' y='cases' />
              </VictoryChart>

              <Text style={styles.chartName}>{languages.t('label.daily_deaths_chart_title')}</Text>

              <VictoryChart width={width} height={200} domainPadding={10}>
                <VictoryAxis
                  fixLabelOverlap
                  style={{ tickLabels: { padding: 10, fontSize: 12 } }}
                />
                <VictoryAxis tickValues={[0, 1, 2]} dependentAxis domain={[0, 2]} />
                <VictoryBar data={chartData} x='date' y='deaths' />
              </VictoryChart>

              <Text style={styles.chartName}>{languages.t('label.daily_tests_chart_title')}</Text>

              <VictoryChart width={width} height={200} domainPadding={10}>
                <VictoryAxis
                  fixLabelOverlap
                  style={{ tickLabels: { padding: 10, fontSize: 12 } }}
                />
                <VictoryAxis dependentAxis domain={[0, 3000]} />
                <VictoryBar data={chartData} x='date' y='tests' />
              </VictoryChart>
            </ScrollView>
          </>
        )}
        {loading && (
          <View style={styles.loadingIndicator}>
            <Text>{languages.t('label.loading_data')}</Text>
          </View>
        )}
        {!loading && data.length === 0 && (
          <View>
            <Text>{languages.t('label.no_data_or_error')}</Text>
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
    fontSize: 20,
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
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    fontWeight: 'bold'
  },
  chartName: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'center'
  },
  statisticsSummary: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statisticsSummaryField: {
    marginRight: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10
  },
  latestUpdateText: { alignSelf: 'center', marginTop: 10, marginBottom: 10 }
})
