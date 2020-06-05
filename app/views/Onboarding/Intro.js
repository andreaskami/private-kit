import React from 'react'
import PropTypes from 'prop-types'

import languages from '../../locales/languages'
import styled from 'styled-components/native'
import { Text } from '@ui-kitten/components'

export const Intro = ({ currentStep }) => (
  <Root>
    {currentStep === 0 && (
      <Intro1>
        <Text category='h2'>Ensuring privacy</Text>
        <Text category='h6'>Assuring public health</Text>
      </Intro1>
    )}
    {currentStep === 1 && (
      <Intro2>
        <Text category='h5'>
          CovTracer can privately save the places you visit and store them on your phone.
        </Text>
        <Byline category='p2'>Your can help you remember where you have been.</Byline>
      </Intro2>
    )}
    {currentStep === 2 && (
      <Intro3>
        <Text category='h5'>
          You can choose whether to share this data with your Healthcare Authority, if you test
          positive for COVID-19.
        </Text>
        <Byline category='p2'>You are in control of your data.</Byline>
      </Intro3>
    )}
  </Root>
)

Intro.propTypes = {
  currentStep: PropTypes.number.isRequired
}

const Root = styled.View`
  align-items: center;
`

const Intro1 = styled.View`
  display: flex;
  align-items: center;
`
const Intro2 = styled.View`
  text-align: left;
`
const Intro3 = styled(Intro2)``

const Byline = styled(Text)`
  margin-top: 10px;
`
