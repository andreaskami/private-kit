import React, { useState } from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Layout, Button } from '@ui-kitten/components'
import { PERMISSIONS, RESULTS, request, requestNotifications } from 'react-native-permissions'

import { Intro } from './Intro'

import { SetStoreData } from '../../helpers/General'
import languages from '../../locales/languages'
import { AskForPermissions } from './AskForPermissions'
import { Logo } from '../../components/Logo'

const btnText = [
  'Get Started',
  'Next',
  'Next',
  'Enable Location',
  'Allow Notifications',
  'Finish setup'
]

const totalSteps = 6

const locationPermission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

export const Onboarding = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [permissions, setPermissions] = useState({
    location: null,
    notifications: null
  })

  const askForLocationPermission = async () => {
    const status = await request(locationPermission)

    return status === RESULTS.GRANTED
  }

  const askForNotificationPermission = async () => {
    const { status } = await requestNotifications(['alert', 'sound', 'badge'])

    return status === RESULTS.GRANTED
  }

  const next = async () => {
    if (currentStep <= 2) {
      setCurrentStep(prevStep => prevStep + 1)
    }

    if (currentStep === 3) {
      const permissionGranted = await askForLocationPermission()
      setPermissions(prevPermissions => ({
        ...prevPermissions,
        location: permissionGranted
      }))

      setCurrentStep(prevStep => prevStep + 1)
    }
    if (currentStep === 4) {
      const permissionGranted = await askForNotificationPermission()
      setPermissions(prevPermissions => ({
        ...prevPermissions,
        notifications: permissionGranted
      }))

      setCurrentStep(prevStep => prevStep + 1)
    }

    if (currentStep === totalSteps - 1) {
      return finish()
    }
  }

  const finish = async () => {
    await SetStoreData('ONBOARDING_COMPLETE', true)
    await SetStoreData('LOGGING', Boolean(permissions.location))

    navigation.navigate('HomeScreen')
  }

  return (
    <Root>
      <Logo />

      {currentStep <= 2 && <Intro currentStep={currentStep} />}
      {currentStep > 2 && <AskForPermissions currentStep={currentStep} permissions={permissions} />}

      <Button onPress={next} style={styles.btn}>
        {btnText[currentStep]}
      </Button>
    </Root>
  )
}

Onboarding.propTypes = {
  navigation: PropTypes.object.isRequired
}

const Root = styled(Layout)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

const styles = {
  btn: {
    alignSelf: 'center',
    width: '70%',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20
  }
}
