import React from 'react'
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import languages from './../../locales/languages'
import logo1 from './../../assets/images/logo1.png'
import logo2 from './../../assets/images/logo2.png'
import logo3 from './../../assets/images/logo3.png'
import Button from '../../components/Button'

import { styles as commonStyles } from './styles'

const Intro1 = props => (
  <SafeAreaView>
    <ScrollView style={[commonStyles.content]}>
      <Text style={[commonStyles.section, commonStyles.text]}>
        {languages.t('label.intro1_para1')}
      </Text>

      <View style={commonStyles.rowImages}>
        {[logo1, logo2, logo3].map((el, index) => (
          <Image key={index} source={el} style={[commonStyles.section, commonStyles.image]} />
        ))}
      </View>

      <View style={[commonStyles.section, commonStyles.navigationDotsView]}>
        <View style={[commonStyles.indicator, commonStyles.activeIndicator]} />
        <View style={[commonStyles.indicator, commonStyles.inactiveIndicator]} />
        <View style={[commonStyles.indicator, commonStyles.inactiveIndicator]} />
      </View>

      <View style={[commonStyles.section, commonStyles.rowButtons]}>
        <Button onPress={() => props.next()} title={languages.t('label.next')} />
      </View>
    </ScrollView>
  </SafeAreaView>
)

Intro1.propTypes = {
  next: PropTypes.func.isRequired
}

export default Intro1
