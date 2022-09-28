import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ExpandableList } from './ExpandableList'

import { TextInput, Box, LineBreak, Button, Gap } from '../../internal'

export default {
  title: 'Items/ExpandableList',
  component: ExpandableList,
} as ComponentMeta<typeof ExpandableList>

const Template: ComponentStory<typeof ExpandableList> = args => {
  const [expanded, set_expanded] = useState(false)
  
  const [value, set_value] = useState<any>({
    item: {
      icon: 'chevron-up',
      iconPrefix: 'fas',
      color: 'none',
      title: 'Dancers',
    },
    list: [
      {
        name: 'Scotty Distortion'
      },
      {
        name: 'Sleepy'
      },
      {
        name: 'Isabelle'
      }
    ]
  })


  

  const [newItemName, set_newItemName] = useState('')

  const remove = (index: number) => {
    set_value(value.slice(index, 1))
  }

  const add = () => {
    set_newItemName('')
    set_value([
      ...value,
      {
        title: newItemName,
        options: [
          {
            icon: 'ellipsis-v',
            iconPrefix: 'fas',
            dropDownOptions: 
              [
                {
                  icon: 'trash-alt',
                  text: 'Trash',
                  onClick: remove
                },
              ] 
          }
        ]
      }
    ])
  }


  return (<>
    <ExpandableList 
      {...args} 
      // onChange={lists => set_value(lists)}
      value={value}
      expanded={expanded}
      onExpand={() => set_expanded(!expanded)}
    />
  </>
  )
}

export const Positions = Template.bind({})
Positions.args = {
  value: [
    
  ],
}
Positions.parameters = {
  layout: 'fullscreen'
}
