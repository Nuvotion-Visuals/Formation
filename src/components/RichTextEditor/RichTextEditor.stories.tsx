import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RichTextEditor, Box, Button, TextInput, StyleHTML } from '../../internal'
import styled from 'styled-components'


export default {
  title: 'Input/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>

const Template: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('')

  return (<>
    <S.Container>
      <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />
    </S.Container>
  </>
  )
}

export const Regular = Template.bind({})
Regular.args = {
  px: 1
}
Regular.parameters = {
  layout: 'fullscreen'
}

const S = {
  Container: styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    justify-content: center;
    
  `
}