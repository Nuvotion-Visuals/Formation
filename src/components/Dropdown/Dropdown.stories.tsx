import React from 'react'
import styled, { css } from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Dropdown } from './Dropdown'
import { Box } from '../../internal'

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = args => 
  <Box>
    <Dropdown {...args} />
  </Box>

export const Options = Template.bind({})
Options.args = {
  icon: 'ellipsis-vertical',
  iconPrefix: 'fas',
  circle: true,
  items: [
    {
      icon: 'heart',
      title: 'Save',
      onClick: () => {}
    },
    {
      icon: 'paper-plane',
      title: 'Send',
      onClick: () => {}
    },
    {
      icon: 'plus',
      iconPrefix: 'fas',
      title: 'Add',
      onClick: () => {}
    }
  ]
}

const StyledBox = styled(Box)<{ position: string }>`
  position: relative;
  width: 100%;
  height: calc(100vh - 2rem);

  ${props => {
    switch (props.position) {
      case 'topLeft':
        return css`
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        `
      case 'topRight':
        return css`
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        `
      case 'bottomLeft':
        return css`
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
        `
      case 'bottomRight':
        return css`
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        `
      default:
        return ''
    }
  }}
`

const CornerTemplate: ComponentStory<typeof Dropdown> = (args: any) => 
  <StyledBox position={args.position}>
    <Dropdown {...args} />
  </StyledBox>

export const TopLeft = CornerTemplate.bind({})
TopLeft.args = {
  ...Options.args,
  position: 'topLeft'
}

export const TopRight = CornerTemplate.bind({})
TopRight.args = {
  ...Options.args,
  position: 'topRight'
}

export const BottomLeft = CornerTemplate.bind({})
BottomLeft.args = {
  ...Options.args,
  position: 'bottomLeft'
}

export const BottomRight = CornerTemplate.bind({})
BottomRight.args = {
  ...Options.args,
  position: 'bottomRight'
}
