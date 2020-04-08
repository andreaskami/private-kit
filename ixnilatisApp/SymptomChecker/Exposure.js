import React from 'react';
import { Modal, StyleSheet, Switch, Text, View } from 'react-native';
import languages from '../../app/locales/languages';
import PreviousNextButtons from './PreviousNextButtons';
import CloseContactDefinition from './CloseContactDefinition';
import colors from '../../app/constants/colors';

export default function Exposure(props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <View>
      <Text style={styles.header}>{languages.t('label.exposure')}</Text>

      <CloseContactDefinition />

      <Text style={styles.label}>{languages.t('label.exposure_question')}</Text>

      <View style={styles.switchContainer}>
        <Text style={{ fontSize: 20 }}>
          {props.data.hasTravelled
            ? languages.t('label.yes')
            : languages.t('label.no')}
        </Text>
        <Switch
          value={props.data.hasTravelled}
          onValueChange={() =>
            props.dispatch({
              hasTravelled: !props.data.hasTravelled,
            })
          }
        />
      </View>

      <PreviousNextButtons
        nextCallback={props.nextStep}
        nextDisabled={props.data.symptoms.size == 0}
        previousCallback={props.previousStep}
        previousDisabled={false}
      />

      {showModal && (
        <Modal>
          <Text onPress={() => setShowModal(show => !show)}>Shalala</Text>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22,
  },
  label: {
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    marginTop: 10,
    width: '50%',
    textAlign: 'center',
    borderRadius: 12,
    padding: 10,
    color: colors.WHITE,
    backgroundColor: colors.RED,
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
