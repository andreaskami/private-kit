import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import backArrow from '../../app/assets/images/backArrow.png';
import useBackpress from './useBackpress';

export default function Header(props) {
  useBackpress(props.navigation.goBack);
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backArrowTouchable}
        onPress={props.navigation.goBack}>
        <Image style={styles.backArrow} source={backArrow} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199,0.6)',
    alignItems: 'center',
  },
  backArrowTouchable: {
    width: 60,
    height: 60,
    paddingTop: 21,
    paddingLeft: 20,
  },
  backArrow: {
    height: 18,
    width: 18.48,
  },
});
