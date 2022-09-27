import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MultiExpandableList } from './MultiExpandableList'

import { TextInput, Box, LineBreak, Button, Gap } from '../../internal'

export default {
  title: 'Items/MultiExpandableList',
  component: MultiExpandableList,
} as ComponentMeta<typeof MultiExpandableList>

const Template: ComponentStory<typeof MultiExpandableList> = args => {
  const [value, set_value] = useState<any>([])

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
    <Box p={.75}>
      <Gap disableWrap={true}>
      <TextInput 
        value={newItemName}
        label='Name'
        onChange={newValue => set_newItemName(newValue)}
      />
      <Button
        text='Add'
        icon='plus'
        iconPrefix='fas'
        onClick={add}
        disabled={newItemName === ''}
      />
      </Gap>
    </Box>

    <LineBreak />

    <MultiExpandableList 
      {...args} 
      onChange={lists => set_value(lists)}
      value={value}
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
