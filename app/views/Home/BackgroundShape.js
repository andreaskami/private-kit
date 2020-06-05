import React from 'react'
import styled from 'styled-components/native'

export const BackgroundShape = () => {
  return (
    <Root>
      <Circle size={400}>
        <Circle size={300}>
          <Circle size={200}>
            <Circle size={100} />
          </Circle>
        </Circle>
      </Circle>
    </Root>
  )
}

const Root = styled.View`
  position: absolute;
  top: 10%;
`

const Circle = styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-width: 1px;
  border-color: #e6e6ff;
  background-color: transparent;
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
