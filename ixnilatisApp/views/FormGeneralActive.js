import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  View,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler
} from 'react-native'

import { GetStoreData, SetStoreData } from '../../app/helpers/General'
import colors from '../../app/constants/colors'
import { WebView } from 'react-native-webview'
import Button from '../../app/components/Button'
import backArrow from '../../app/assets/images/backArrow.png'
import { formatDate, formatDateTime } from '../dateUtils'
import { getFormCount, maxFormCount } from '../formLimitations'
import languages from '../../app/locales/languages'

const width = Dimensions.get('window').width

class FormGeneral extends Component {
  state = {
    name: '',
    dateBirth: '',
    address: '',
    reason: '',
    reasonOther: '',
    date: '',
    formCount: 0
  }
  backToMain = () => {
    this.props.navigation.navigate('LocationTrackingScreen', {})
  }

  handleBackPress = () => {
    this.backToMain()
    return true
  }

  componentDidMount = () => {
    GetStoreData('FORMGENERAL', false).then(
      state =>
        state &&
        this.setState({
          ...state,
          dateBirth: new Date(state.dateBirth),
          date: new Date(state.date)
        })
    )
    getFormCount().then(formCount => this.setState({ formCount }))

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backArrowTouchable} onPress={() => this.backToMain()}>
            <Image style={styles.backArrow} source={backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {languages.t('label.FORMGENERAL_ACTIVE')}
            <Text style={{ fontSize: 14 }}>
              {' '}
              ({this.state.formCount}/{maxFormCount})
            </Text>
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.label}>{languages.t('label.FORMGENERAL_NAME')}</Text>
          <Text style={styles.input}>{this.state.name}</Text>
          <Text style={styles.label}>{languages.t('label.FORMGENERAL_DATEBIRTH')}</Text>
          <Text style={styles.input}>
            {this.state.dateBirth ? formatDate(this.state.dateBirth) : '-'}
          </Text>
          <Text style={styles.label}>{languages.t('label.FORMGENERAL_IDENTIFICATION')}</Text>
          <Text style={styles.input}>{this.state.identification}</Text>
          <Text style={styles.label}>{languages.t('label.FORMGENERAL_ADDRESS')}</Text>
          <Text style={styles.input}>{this.state.address}</Text>
          <Text style={styles.label}>{languages.t('label.FORMGENERAL_REASON')}</Text>
          <Text style={{ padding: 10 }}>
            {this.state.reason && languages.t('label.FORMGENERAL_REASON_' + this.state.reason)}
          </Text>
          {this.state.reason == 8 && <Text style={styles.input}>{this.state.reasonOther}</Text>}
          <Text style={styles.label}>{languages.t('label.FORMGENERAL_DATE')}</Text>
          <Text style={styles.input}>
            {this.state.date ? formatDateTime(this.state.date) : '-'}
          </Text>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE
  },
  submit: {
    width: '60%',
    borderRadius: 10,
    padding: 10,
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#665eff'
  },
  submitText: {
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199,0.6)'
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
  input: {
    height: 50,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 20
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 26,
    fontFamily: 'OpenSans-Bold',
    top: 21,
    width: '70%'
  },
  picker: {}
})

export default FormGeneral
