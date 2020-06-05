import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Drawer, DrawerItem, DrawerGroup, IndexPath } from '@ui-kitten/components'

// Because of BUG with UI Kitten mappings needed to be created,
// Read more: https://github.com/akveo/react-native-ui-kitten/issues/1130
const sectionToRowMapping = {
  3: 3,
  4: 5,
  5: 7
}

const indexToSectionMapping = {
  3: {
    row: 0,
    section: 3
  },
  4: {
    row: 1,
    section: 3
  },
  5: {
    row: 0,
    section: 4
  },
  6: {
    row: 1,
    section: 4
  },
  7: {
    row: 0,
    section: 5
  },
  8: {
    row: 1,
    section: 5
  },
  9: {
    row: 2,
    section: 5
  }
}

export const DrawerContent = ({ navigation, state }) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(state.index))

  useEffect(() => {
    setSelectedIndex(() => {
      if (indexToSectionMapping[state.index]) {
        return { ...indexToSectionMapping[state.index] }
      }
      return new IndexPath(state.index)
    })
  }, [state.index])

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => {
        const calculatedIndex = index.section
          ? sectionToRowMapping[index.section] + index.row
          : index.row
        navigation.navigate(state.routeNames[calculatedIndex])
      }}>
      <DrawerItem title='Home' />
      <DrawerItem title='View recent locations' />
      <DrawerItem title='Symptoms Checker' />

      <DrawerGroup title='News'>
        <DrawerItem title='Twitter' />
        <DrawerItem title='Statistics' />
      </DrawerGroup>

      <DrawerGroup title='Data'>
        <DrawerItem title='Import' />
        <DrawerItem title='Export' />
      </DrawerGroup>

      <DrawerGroup title='Legal'>
        <DrawerItem title='Privacy' />
        <DrawerItem title='Licenses' />
        <DrawerItem title='Acknowledgements' />
      </DrawerGroup>
    </Drawer>
  )
}

DrawerContent.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object.isRequired
}
