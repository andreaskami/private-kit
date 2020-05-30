import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import languages from '../../locales/languages'
import styled from 'styled-components/native'
import { Button, Layout, Text, Icon } from '@ui-kitten/components'

export const AskForPermissions = ({ currentStep, permissions }) => (
  <Root>
    {currentStep === 3 && (
      <View>
        <Text category='h5'>To remember where you go, your phone needs to save your location.</Text>
        <Byline category='p2'>
          Don’t worry, information never leaves your device unless you explicitly decide to share.
        </Byline>
        <PermissionMatrix>
          <Permission>
            <Text>Location Access</Text>
            {permissions.location !== null && (
              <StyledIcon
                name={permissions.location ? 'checkmark-circle-outline' : 'close-circle-outline'}
                fill={permissions.location ? '#06d6a0' : '#ef476f'}
              />
            )}
            {permissions.location === null && <PermissionPlaceholder />}
          </Permission>
          <Permission>
            <Text>Allow Notifications</Text>
            <PermissionPlaceholder />
          </Permission>
        </PermissionMatrix>
      </View>
    )}
    {currentStep === 4 && (
      <View>
        <Text category='h5'>To remember where you go, your phone needs to save your location.</Text>
        <Byline category='p2'>
          Don’t worry, information never leaves your device unless you explicitly decide to share.
        </Byline>
        <PermissionMatrix>
          <Permission>
            <Text>Location Access</Text>

            <StyledIcon
              name={permissions.location ? 'checkmark-circle-outline' : 'close-circle-outline'}
              fill={permissions.location ? '#06d6a0' : '#ef476f'}
            />
          </Permission>
          <Permission>
            <Text>Allow Notifications</Text>
            {permissions.notifications !== null && (
              <StyledIcon
                name={
                  permissions.notifications ? 'checkmark-circle-outline' : 'close-circle-outline'
                }
                fill={permissions.notifications ? '#06d6a0' : '#ef476f'}
              />
            )}
            {permissions.notifications === null && <PermissionPlaceholder />}
          </Permission>
        </PermissionMatrix>
      </View>
    )}
    {currentStep === 5 && (
      <View>
        <Text category='h5'>All finished</Text>
        <Byline category='p2'>Remember, you can always update your preferences later.</Byline>
        <PermissionMatrix>
          <Permission>
            <Text>Location Access</Text>

            <StyledIcon
              name={permissions.location ? 'checkmark-circle-outline' : 'close-circle-outline'}
              fill={permissions.location ? '#06d6a0' : '#ef476f'}
            />
          </Permission>
          <Permission>
            <Text>Allow Notifications</Text>

            <StyledIcon
              name={permissions.notifications ? 'checkmark-circle-outline' : 'close-circle-outline'}
              fill={permissions.notifications ? '#06d6a0' : '#ef476f'}
            />
          </Permission>
        </PermissionMatrix>
      </View>
    )}
  </Root>
)

AskForPermissions.propTypes = {
  currentStep: PropTypes.number.isRequired,
  permissions: PropTypes.object.isRequired
}

const Root = styled.View`
  align-items: center;
`

const Byline = styled(Text)`
  margin-top: 10px;
`

const PermissionMatrix = styled.View`
  margin-top: 20px;
`
const Permission = styled.View`
  border-top-width: 0.5px;
  border-top-color: #e2dbdb;
  border-bottom-width: 0.5px;
  border-bottom-color: #e2dbdb;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  width: 24;
  height: 24;
`

const PermissionPlaceholder = styled.View`
  width: 24px;
  height: 24px;
  background-color: #e2dbdb;
  border-radius: 50px;
`
