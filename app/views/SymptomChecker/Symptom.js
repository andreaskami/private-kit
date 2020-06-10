import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default function Symptom (props) {
  return (
    <View style={styles.switchContainer}>
      <Switch
        disabled={props.disabled}
        value={props.symptoms.has(props.id)}
        onValueChange={() => props.onChange(props.id)}
      />
      <Text onPress={() => props.onChange(props.id)} style={{ fontSize: 18, marginLeft: 5 }}>
        {props.title}
      </Text>
    </View>
  )
}

Symptom.propTypes = {
  disabled: PropTypes.bool.isRequired,
  symptoms: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  switchContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10
  }
})
