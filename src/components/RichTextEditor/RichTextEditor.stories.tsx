import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Gap, RichTextEditor, TextArea } from '../../internal'
import styled from 'styled-components'

export default {
  title: 'Input/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>

const FullScreenTemplate: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('')

  return (
    <S.FullScreenContainer>
      <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />
    </S.FullScreenContainer>
  )
}

export const FullScreen = FullScreenTemplate.bind({})
FullScreen.args = {
  px: 1
}
FullScreen.parameters = {
  layout: 'fullscreen'
}

const FixedHeightTemplate: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('')

  return (
    <S.FixedHeightContainer>
      <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />
    </S.FixedHeightContainer>
  )
}

export const FixedHeight = FixedHeightTemplate.bind({})
FixedHeight.args = {
  px: 1,
  outline: true
}

const ExpandTemplate: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('')

  return (
    <RichTextEditor {...args} value={value} onChange={newValue => set_value(newValue)} />
  )
}

export const Expand = ExpandTemplate.bind({})
Expand.args = {
  px: 1,
  outline: true
}

export const Autofocus = ExpandTemplate.bind({})
Autofocus.args = {
  px: 1,
  outline: true,
  autoFocus: true
}

export const Minimal = ExpandTemplate.bind({})
Minimal.args = {
  px: 1,
  outline: true,
  minimal: true
}

const OnEnterTemplate: ComponentStory<typeof RichTextEditor> = args => {
  const [value, set_value] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      alert('Enter key pressed without Shift!');
    }
  };

  return (
    <RichTextEditor
      {...args}
      value={value}
      onChange={set_value}
      onKeyDown={handleKeyDown}
    />
  );
};

export const OnEnter = OnEnterTemplate.bind({});
OnEnter.args = {
  px: 1,
  outline: true,
};

const S = {
  FullScreenContainer: styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    justify-content: center;
  `,
  FixedHeightContainer: styled.div`
    height: 12rem;
    width: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    justify-content: center;
  `
}
