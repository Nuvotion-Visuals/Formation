import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MultiSelect } from './MultiSelect'

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>

const Template: ComponentStory<typeof MultiSelect> = (args) => (
  <MultiSelect />
)

export const Default = Template.bind({})
Default.args = {
  // Add any default props if required
}
Default.parameters = {
  layout: 'fullscreen'
}