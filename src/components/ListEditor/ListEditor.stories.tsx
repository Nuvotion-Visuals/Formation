import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ListEditor } from '../../internal'

export default {
  title: 'Advanced Input/ListEditor',
  component: ListEditor,
} as ComponentMeta<typeof ListEditor>


const Template: ComponentStory<typeof ListEditor> = args => 
  <div style={{display: 'flex'}}>
    <ListEditor {...args} />
  </div>

// calculateInitialValue: () => Lists,
// onChange: (lists: Lists) => void,
// onRemoveFunction?: (index: number) => void,
// calculateRecommendationLists?: () => Lists,
// calculateRecentLists?: () => Lists,
// isCreating: boolean

export const Positions = Template.bind({})
Positions.args = {
  value: () =>[],
  onChange: (lists) => { console.log(lists)},
  onRemoveFunction: () => alert('remove'),
  calculateRecommendationLists: () => [],
  calculateRecentLists: () => [],
  isCreating: false,
  label: 'Position'
}
