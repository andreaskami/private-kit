import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import languages from '../../app/locales/languages';
import colors from '../../app/constants/colors';

export default function Exposure() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <View>
      <Text style={styles.button} onPress={() => setShowModal(show => !show)}>
        {languages.t('label.close_contact_definition')}
      </Text>

      {showModal && (
        <Modal transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.header}>
                {languages.t('label.close_contact_definition')}
              </Text>
              <ScrollView>
                <Text>{languages.t('label.close_contact_definition_1')}</Text>
                <Text>{languages.t('label.close_contact_definition_2')}</Text>
                <Text>{languages.t('label.close_contact_definition_3')}</Text>
                <Text>{languages.t('label.close_contact_definition_4')}</Text>
                <Text>{languages.t('label.close_contact_definition_5')}</Text>
                <Text>{languages.t('label.close_contact_definition_6')}</Text>
                <Text>{languages.t('label.close_contact_definition_7')}</Text>
              </ScrollView>
              <Text
                style={{
                  ...styles.button,
                  backgroundColor: colors.DODGER_BLUE,
                }}
                onPress={() => setShowModal(show => !show)}>
                Close
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
