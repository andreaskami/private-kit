import React from 'react'
import { View, ScrollView, SafeAreaView, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import languages from './../../locales/languages'
import logo1 from './../../assets/images/logo1.png'
import logo2 from './../../assets/images/logo2.png'
import logo3 from './../../assets/images/logo3.png'
import Button from '../../components/Button'

import { styles as commonStyles } from './styles'

const Intro2 = props => (
  <SafeAreaView>
    <ScrollView contentContainerStyle={[commonStyles.content]}>
      <View>
        <Text style={[commonStyles.section, commonStyles.text, commonStyles.header]}>
          {languages.t('label.intro2_title1')}
        </Text>
        <Text style={[commonStyles.section, commonStyles.text]}>
          {languages.t('label.intro2_para1')}
        </Text>
        <Text style={[commonStyles.section, commonStyles.text, commonStyles.header]}>
          {languages.t('label.intro2_title2')}
        </Text>
        <Text style={[commonStyles.section, commonStyles.text]}>
          {languages.t('label.intro2_para2')}
        </Text>

        <View style={commonStyles.rowImages}>
          {[logo1, logo2, logo3].map((el, index) => (
            <Image key={index} source={el} style={[commonStyles.section, commonStyles.image]} />
          ))}
        </View>

        <View style={[commonStyles.section, commonStyles.navigationDotsView]}>
          <View style={[commonStyles.indicator, commonStyles.inactiveIndicator]} />
          <View style={[commonStyles.indicator, commonStyles.activeIndicator]} />
          <View style={[commonStyles.indicator, commonStyles.inactiveIndicator]} />
        </View>

        <View style={[commonStyles.section, commonStyles.rowButtons]}>
          <Button
            style={commonStyles.button}
            bgColor='rgba(120, 132, 158, 1)'
            onPress={() => props.back()}
            title={languages.t('label.back')}
          />
          <Button
            style={commonStyles.button}
            onPress={() => props.next()}
            title={languages.t('label.next')}
          />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
)

Intro2.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}

export default Intro2
