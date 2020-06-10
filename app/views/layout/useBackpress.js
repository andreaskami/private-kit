import React from 'react'
import { BackHandler } from 'react-native'
export default function useBackpress (callback) {
  function handler () {
    callback()
    return true
  }
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler)
    }
  })
}
