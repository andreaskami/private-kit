import React from 'react'
import { View, ScrollView, SafeAreaView, Text, Image, Linking } from 'react-native'
import PropTypes from 'prop-types'

import languages from './../../locales/languages'
import logo1 from './../../assets/images/logo1.png'
import logo2 from './../../assets/images/logo2.png'
import logo3 from './../../assets/images/logo3.png'
import Button from '../../components/Button'

import { styles as commonStyles } from './styles'

const Intro3 = props => (
  <SafeAreaView>
    <ScrollView contentContainerStyle={[commonStyles.content]}>
      <View>
        <Text style={[commonStyles.section, commonStyles.text, commonStyles.header]}>
          {languages.t('label.intro3_title1')}
        </Text>
        <Text style={[commonStyles.section, commonStyles.text]}>
          {languages.t('label.intro3_para1')}
        </Text>

        <View style={commonStyles.rowImages}>
          {[logo1, logo2, logo3].map((el, index) => (
            <Image key={index} source={el} style={[commonStyles.section, commonStyles.image]} />
          ))}
        </View>

        <View
          style={commonStyles.section}
          onPress={() => Linking.openURL('http://covid-19.rise.org.cy')}>
          <Text style={[commonStyles.text, commonStyles.resetTextLineHeight]}>
            {languages.t('label.url_info')}
          </Text>
          <Text
            style={[commonStyles.text, commonStyles.resetTextLineHeight, commonStyles.underline]}>
            {languages.t('label.private_kit_url')}
          </Text>
        </View>

        <View style={[commonStyles.section, commonStyles.navigationDotsView]}>
          <View style={[commonStyles.indicator, commonStyles.inactiveIndicator]} />
          <View style={[commonStyles.indicator, commonStyles.inactiveIndicator]} />
          <View style={[commonStyles.indicator, commonStyles.activeIndicator]} />
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
            onPress={() => props.finish()}
            title={languages.t('label.start')}
          />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
)

Intro3.propTypes = {
  back: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired
}

export default Intro3
