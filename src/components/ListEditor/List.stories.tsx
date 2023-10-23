import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { List } from './List'

import { TextInput, Box, LineBreak, Button, Gap } from '../../internal'

export default {
  title: 'Items/List',
  component: List,
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = args => {
  const [value, set_value] = useState<any>([])

  const [newItemName, set_newItemName] = useState('')

  const remove = (index: number) => {
    set_value(value.filter((item, i) => index !== i))
  }

  const add = () => {
    set_newItemName('')
    set_value([
      ...value,
      {
        name: newItemName,
        options: [
          {
            icon: 'ellipsis-v',
            iconPrefix: 'fas',
            dropDownOptions: 
              [
                {
                  icon: 'trash-alt',
                  text: 'Trash',
                  onClick: () => {
                    remove(value.length)
                    
                  }
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
        icon='user'
        iconPrefix='fas'
        label='Name'
        onChange={newValue => set_newItemName(newValue)}
        onEnter={newItemName !== '' ? add : undefined}
        hero
      />
      <Button
        icon='plus'
        iconPrefix='fas'
        circle
        onClick={add}
        disabled={newItemName === ''}
        hero
      />
      
      </Gap>
    </Box>

    <LineBreak />

    <List 
      {...args} 
      value={value}
      onReorder={newValue => set_value(newValue)}
      reorderId='1'
    />
  </>
  )
}

export const Positions = Template.bind({})
Positions.args = {

}
Positions.parameters = {
  layout: 'fullscreen'
}
