import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Results(props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>{props.results.title}</Text>

        <Text style={styles.result}>{props.results.result}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{props.results.prompt}</Text>
          <View style={styles.inputContainer}>
            {props.results.instructions.map((instruction, index) => (
              <Text key={index} style={styles.condition}>
                {instruction}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    height: '80%',
  },
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22,
  },
  result: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {},
  condition: {
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});
