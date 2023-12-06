import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AspectRatio, Box, ContextMenu } from '../../internal'
import styled from 'styled-components'

export default {
  title: 'Input/ContextMenu',
  component: ContextMenu,
} as ComponentMeta<typeof ContextMenu>

const Template: ComponentStory<typeof ContextMenu> = args => {
  const [color, setColor] = useState('var(--F_Surface)')

  return (
    <Box width={12}>
      <ContextMenu
        {...args}
        dropdownProps={{
          ...args.dropdownProps,
          items: [
            {
              text: 'Red',
              onClick: () => setColor('darkred'),
              active: color === 'darkred',
            },
            {
              text: 'Green',
              onClick: () => setColor('darkgreen'),
              active: color === 'darkgreen',
            },
            {
              text: 'Blue',
              onClick: () => setColor('darkblue'),
              active: color === 'darkblue',
            }
          ]
        }}
      >
        <Box width={12}>
          <AspectRatio
            ratio={16/9}
            backgroundColor={color}
            borderRadius={.5}
          >
            <S.Text>
              Right click or tap and hold to open the color change menu
            </S.Text>
          </AspectRatio>
        </Box>
      </ContextMenu>
    </Box>
  )
}

export const Options = Template.bind({})
Options.args = {
}

const S = {
  Text: styled.div`
    padding: 1rem;
    color: var(--F_Font_Color);
    line-height: 1.5;
    user-select: none;
  `
}