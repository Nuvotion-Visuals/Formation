import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Dropdown } from './Dropdown'
import { Box, Spacer } from '../../internal'

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = args => 
  <Box>
    <Dropdown {...args} />
    <Spacer />
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
      onClick: () => {},
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

const blendModes = [
  // Normal Blending Modes
  // The Blending Modes in this category do not have algorithms 
  // that blend pixels. Instead, the Opacity slider controls the blend between layers
  { name: 'Normal', value: 0 },
  { name: 'Dissolve', value: 19 },
  
  // Lighten Blending Modes
  // The Lighten Blending Modes will turn the Result colors brighter.
  { name: '', value: -1, disabled: true },
  { name: 'Lighten Modes', value: -1, disabled: true },
  { name: 'Add', value: 1},
  { name: 'Lighten', value: 7 },
  { name: 'Screen', value: 8 },
  { name: 'Color Dodge', value: 9 },
  { name: 'Linear Dodge', value: 10 },
  { name: 'Lighter Color', value: 21 },
  { name: 'Gamma Light', value: 40 },

  // Darken Blending Modes
  // Blending Modes in the Darken category will turn the Result colors darker.
  { name: '', value: -1, disabled: true },
  { name: 'Darken Modes', value: -1, disabled: true },
  { name: 'Subtract', value: 2 },
  { name: 'Darken', value: 4 },
  { name: 'Multiply', value: 3 },
  { name: 'Color Burn', value: 5 },
  { name: 'Linear Burn', value: 6 },
  { name: 'Darker Color', value: 20 },
  { name: 'Gamma Dark', value: 55 },
  { name: 'Shade', value: 56 },

  // Contrast Blending Modes
  // The Blending Modes in this category are a mixture between the Darken 
  // and the Lighten categories
  // Except for Hard Mix, 50% gray is a Neural Color for all the Blend Modes 
  // in this category.
  { name: '', value: -1, disabled: true },
  { name: 'Contrast Modes', value: -1, disabled: true },
  { name: 'Overlay', value: 11 },
  { name: 'Soft Light', value: 12 },
  { name: 'Hard Light', value: 13 },
  { name: 'Vivid Light', value: 14 },
  { name: 'Linear Light', value: 15 },
  { name: 'Pin Light', value: 16 },
  { name: 'Hard Mix', value: 22 },
  { name: 'Penumbra', value: 58 },
  { name: 'Super Light', value: 47 },
  { name: 'Hard Overlay', value: 44 },
  { name: 'Glow', value: 29 },
  { name: 'Reflect', value: 28 },

  // Inversion Blending Modes
  // The Inversion Blending Modes look for variations between 
  // the base and blend layers to create the blend.
  { name: '', value: -1, disabled: true },
  { name: 'Inversion Modes', value: -1, disabled: true },
  { name: 'Difference', value: 17 },
  { name: 'Exclusion', value: 18 },
  { name: 'Divide', value: 23 },
  { name: 'Arc Tangent', value: 54 },
  { name: 'Phoenix', value: 30 },
  { name: 'Gamma Illumination', value: 57 },
  { name: 'Bright', value: 45 },
  { name: 'Dark', value: 46 },
  { name: 'Negation', value: 32 },
  { name: 'Additive Subtractive', value: 53 },

  // Component Blending Modes
  // The Component Blending Modes use combinations of the 
  // primary color components (hue, saturation, and brightness) 
  // to create the blend.
  { name: '', value: -1, disabled: true },
  { name: 'Component Modes', value: -1, disabled: true },
  { name: 'Hue', value: 24 },
  { name: 'Saturation', value: 25 },
  { name: 'Color', value: 26 },
  { name: 'Luminosity', value: 27 },
  { name: 'Copy Red', value: 33 },
  { name: 'Copy Green', value: 34 },
  { name: 'Copy Blue', value: 35 },
  { name: 'Exclude Red', value: 41 },
  { name: 'Exclude Green', value: 42 }, 
  { name: 'Exclude Blue', value: 43 },
  { name: 'Color Erase', value: 60 },

  // Mix
  { name: '', value: -1, disabled: true },
  { name: 'Mix Modes', value: -1, disabled: true },
  { name: 'Average', value: 31 },
  { name: 'Interpolation', value: 36 },
  { name: 'Interpolation 2X', value: 37 },
  { name: 'Parallel', value: 59 },
 
  // Modulo
  // Modulo modes are a special class of blending modes which loop values 
  // when the value of the channel blend layer is less than the value of 
  // the channel in base layers. All modes in modulo modes retains the absolute 
  // of the remainder if the value is greater than the maximum value or 
  // the value is less than minimum value. Continuous modes assume if the 
  // calculated value before modulo operation is within the range between 
  // a odd number to even number, then values are inverted in the end result, 
  // so values are perceived to be wave-like.
  { name: '', value: -1, disabled: true },
  { name: 'Modulo Modes', value: -1, disabled: true },
  { name: 'Modulo', value: 51 },
  { name: 'Modulo Continuous', value: 52 },
  { name: 'Modulo Shift', value: 48 },
  { name: 'Divisive Modulo', value: 49 },
  { name: 'Divisive Modulo Continuous', value: 50 },
];

const BlendDropdownTemplate: ComponentStory<typeof Dropdown> = (initialArgs: any) => {
  const [activeBlend, setActiveBlend] = useState(initialArgs.text || 'Normal')

  return (
    <Box>
      <Dropdown
        {...initialArgs}
        items={initialArgs.items.map((item: any) => ({
          ...item,
          onClick: (item.text && !item.text.includes('Modes')) ? () => setActiveBlend(item.text) : null,
          active: item.text === activeBlend
        }))}
        text={activeBlend}
        searchPlaceholder='Search Blend Modes...'
      />
      <Spacer />
    </Box>
  )
}

export const BlendOptions = BlendDropdownTemplate.bind({})
BlendOptions.args = {
  text: 'Normal',
  disableCenter: true,
  maxWidth: '200px',
  items: blendModes.map(bl => ({
    text: bl.name,
    prefix: (bl.name && !bl.name.includes('Modes')) ? <img src={`/blendPreviews/${bl.name}.jpg`} style={{ width: '60px', minWidth: '60px' }} /> : undefined,
  }))
}