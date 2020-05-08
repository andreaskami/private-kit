import React from 'react'
import { View, Image, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'

import Swiper from './ReactNativeSwiper'
import Intro1 from './Intro1'
import Intro2 from './Intro2'
import Intro3 from './Intro3'
import welcome1 from '../../assets/images/welcome1.png'
import { styles as commonStyles } from './styles'
import { SetStoreData } from '../../helpers/General'

export const OnboardingSlider = props => {
  const swiperRef = React.useRef('')

  const back = () => swiperRef.current.scrollBy(-1)
  const next = () => swiperRef.current.scrollBy(1)
  const finish = async () => {
    await SetStoreData('ONBOARDING_COMPLETE', 1)

    setTimeout(() => props.navigation.navigate('HomeScreen'))
  }

  const pages = [Intro1, Intro2, Intro3].map((Page, index) => (
    <View key={'page-' + index}>
      <Page navigation={props.navigation} back={back} next={next} finish={finish} />
    </View>
  ))

  return (
    <View style={commonStyles.mainContainer}>
      <Image source={welcome1} style={commonStyles.logo} />

      <Swiper
        showsButtons={false}
        activeDotColor='#665EFF'
        showsPagination={false}
        ref={swiperRef}
        loop={false}>
        {pages}
      </Swiper>
    </View>
  )
}

OnboardingSlider.propTypes = {
  navigation: PropTypes.object.isRequired
}
