import React from 'react'
import { Text } from 'react-native'
import { getVersion } from 'react-native-device-info'

export default function Version () {
  return <Text style={{ textAlign: 'center' }}>{getVersion()}</Text>
}
