import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react'
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  View,
  Picker,
  Text,
  TextInput,
  Linking,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import SendSMS from 'react-native-sms'
import PropTypes from 'prop-types'

import { GetStoreData, SetStoreData } from '../helpers/General'
import colors from '../constants/colors'
import backArrow from '../../app/assets/images/backArrow.png'

import { invalidPostalCode, invalidIdentification } from '../helpers/formLimitations'
import languages from '../locales/languages'

export const FormGeneral = ({ navigation }) => {
  const [identification, setIdentification] = useState(null)
  const [reason, setReason] = useState(3)
  const [postalCode, setPostalCode] = useState(null)

  const postalCodeIsInvalid = useMemo(() => invalidPostalCode(postalCode), [postalCode])

  const identificationNumberIsInvalid = useMemo(() => invalidIdentification(identification), [
    identification
  ])

  const formValid = useMemo(
    () =>
      [
        !identificationNumberIsInvalid,
        !postalCodeIsInvalid,
        postalCode !== null,
        identification !== null
      ].every(Boolean),
    [identificationNumberIsInvalid, postalCodeIsInvalid, identification, postalCode]
  )

  const backToMain = () => {
    navigation.navigate('HomeScreen', {})
  }

  const handleBackPress = () => {
    backToMain()
    return true
  }

  useEffect(() => {
    GetStoreData('FORMGENERAL', false).then(state => console.log('formState'))
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
  }, [handleBackPress])

  useLayoutEffect(() => {
    GetStoreData('DECLARATION_FIELDS').then(data => {
      const parsedData = JSON.parse(data)
      setPostalCode(parsedData.postalCode)
      setIdentification(parsedData.identification)
    })
  }, [])

  const submitForm = async () => {
    // SendSMS.send(
    //   {
    //     body: 'The default body of the SMS!',
    //     recipients: ['0123456789', '9876543210'],
    //     successTypes: ['sent', 'queued'],
    //     allowAndroidSendWithoutReadPermission: true
    //   },
    //   (completed, cancelled, error) => {
    //     console.log(
    //       'SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error
    //     )
    //   }
    // )
    Linking.openURL(`sms:+8998?&body=${reason}%20${identification}%20${postalCode}`)
    SetStoreData('DECLARATION_FIELDS', { postalCode, identification })
    // go back to main
    // show alert ?
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrowTouchable} onPress={backToMain}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{languages.t('label.FORMGENERAL_NEW')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.label}>{languages.t('label.FORMGENERAL_IDENTIFICATION')}</Text>
        <TextInput onChangeText={setIdentification} value={identification} style={styles.input} />
        {identificationNumberIsInvalid && (
          <Text style={{ color: 'red' }}>Up to 10 characters, no special characters allowed</Text>
        )}

        <Text style={styles.label}>{languages.t('label.FORMGENERAL_REASON')}</Text>
        <Picker
          onValueChange={setReason}
          selectedValue={reason}
          itemStyle={styles.pickerItem}
          style={styles.picker}>
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_1')} value={1} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_2')} value={2} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_3')} value={3} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_4')} value={4} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_5')} value={5} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_6')} value={6} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_7')} value={7} />
          <Picker.Item label={languages.t('label.FORMGENERAL_REASON_8')} value={8} />
        </Picker>

        <Text style={styles.label}>Postal code</Text>
        <TextInput
          onChangeText={setPostalCode}
          value={postalCode}
          style={styles.input}
          keyboardType='number-pad'
        />
        {postalCodeIsInvalid && (
          <Text style={{ color: 'red' }}>Postal code needs to be between 0001 and 9999</Text>
        )}

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.submit, !formValid ? styles.disabledButton : null]}
            onPress={submitForm}
            disabled={!formValid}>
            <Text style={styles.submitText}>{languages.t('label.FORMWORK_SUBMIT')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

FormGeneral.propTypes = {
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    marginBottom: 10
  },
  main: {
    padding: 20
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    color: colors.PRIMARY_TEXT,
    backgroundColor: colors.WHITE,
    padding: 20
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
  disabledButton: {
    opacity: 0.5
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
    borderWidth: 0.5,
    borderRadius: 4,
    color: '#000',
    height: 40
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 26,
    fontFamily: 'OpenSans-Bold',
    top: 21,
    width: '70%'
  },
  pickerItem: {
    fontSize: 13
  }
})

export default FormGeneral
