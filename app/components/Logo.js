import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'

import welcome1 from '../assets/images/logo.png'

export const Logo = props => <Root source={welcome1} {...props} />

const Root = styled(Image)`
  align-self: center;
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  resize-mode: contain;
`
