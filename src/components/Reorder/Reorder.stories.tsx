import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AspectRatio, Empty, Reorder, reorderItems } from '../../internal'

export default {
  title: 'Layout/Reorder',
  component: Reorder,
} as ComponentMeta<typeof Reorder>

const Template: ComponentStory<typeof Reorder> = args => {
  const [items, set_items] = useState(['A', 'B', 'C', 'D'])

  const onChange = (event: any, previousIndex: any, nextIndex: any, fromId: any, toId: any) => {
    set_items(oldItems => [...reorderItems(oldItems, previousIndex, nextIndex)])
  }

  return (
    <Reorder {...args} onChange={onChange} >
      {
        items.map((item, index) =>
          <AspectRatio ratio={16/9}>
            <Empty>
              {
                item
              }
            </Empty>
          </AspectRatio>  
        )
      }
    </Reorder>
  )
}
  
export const Gap = Template.bind({})
Gap.args = {
  reorderId: 'reorder',
  gap: .5,
  maxItemWidth: 12,
  holdTime: 100,
  placeholder: <AspectRatio ratio={16/9}>
  <Empty>
    Placeholder
  </Empty>
  </AspectRatio>
}
