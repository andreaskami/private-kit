import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function Symptom(props) {
  return (
    <View style={styles.switchContainer}>
      <Switch
        disabled={props.disabled}
        value={props.symptoms.has(props.id)}
        onValueChange={() => props.onChange(props.id)}
      />
      <Text onPress={() => props.onChange(props.id)} style={{ fontSize: 20 }}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});
