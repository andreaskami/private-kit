import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Results(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.header}>{props.results.title}</Text>

        <Text style={styles.result}>{props.results.result.trim()}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{props.results.prompt}</Text>
          <View style={styles.inputContainer}>
            {props.results.instructions.map((instruction, index) => (
              <Text key={index} style={styles.condition}>
                {`${index + 1}. `}
                {instruction}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  contentContainer: {
    height: '100%',
  },
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  result: {
    marginTop: '10%',
    marginBottom: '8%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#EFEFEF',
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
