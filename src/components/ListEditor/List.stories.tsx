import React, { useEffect, useState } from 'react'
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
                  onClick: () => remove(value.length)
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

    <List 
      {...args} 
      value={value}
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
