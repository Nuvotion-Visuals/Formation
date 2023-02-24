import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ExpandableLists } from './ExpandableLists'

import { TextInput, Box, LineBreak, Button, Gap, Label, Select } from '../../internal'

export default {
  title: 'Items/ExpandableLists',
  component: ExpandableLists,
} as ComponentMeta<typeof ExpandableLists>

const Template: ComponentStory<typeof ExpandableLists> = args => {
  const [value, set_value] = useState<any>(args.value)

  const [newItemName, set_newItemName] = useState('')

  const remove = (index: number) => {
    set_value(value.filter((item, i) => index !== i))
  }

  const add = () => {
    set_newItemName('')
    set_value([
      ...value,
      {
        value: {
          item: {
            icon: 'chevron-up',
            iconPrefix: 'fas',
            labelColor: 'none',
            text: newItemName,
            children: <>
              <Label label={`0 / ${count}`} labelColor={'orange'}/>
            </>,
            options: [
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas',
                dropDownOptions: [
                  {
                    icon: 'edit',
                    iconPrefix: 'fas',
                    text: 'Edit'
                  },
                  {
                    icon: 'trash-alt',
                    iconPrefix: 'far',
                    text: 'Trash'
                  }
                ]
              }
            ]
          },
          list: new Array(count).fill({
            icon: 'user',
            iconPrefix: 'fas',
            name: 'Unassigned',
            labelColor: 'none',
            emphasize: false,
            onClick: () => {},
            children: <>
              <Label label={'todo'} labelColor={'orange'}/>
            </>,
            options: [
              {
                icon: 'arrow-right',
                iconPrefix: 'fas'
              }
            ]
          })
        }
      }
    ])
  }

  const [count, set_count] = useState(1)

  const [expanded, set_expanded] = useState<boolean[]>([])

  useEffect(() => {
    set_expanded(new Array(value.length).fill(false))
  }, [value])

  return (<>
    <Box p={.75}>
      <Gap disableWrap={true}>
      <TextInput 
        value={newItemName}
        icon='user'
        iconPrefix='fas'
        label='Position Name'
        onChange={newValue => set_newItemName(newValue)}
        onEnter={newItemName !== '' ? add : undefined}
      />
      <Select
        label='Count'
        options={new Array(50).fill(0).map((item, i) => String(i + 1))}
        value={String(count)}
        onChange={newValue => set_count(Number(newValue))}
        icon='users'
        iconPrefix='fas'
      />
      <Button
        icon='plus'
        hero
        circle
        secondary
        iconPrefix='fas'
        onClick={add}
        disabled={newItemName === ''}
      />
      
      </Gap>
    </Box>

    <LineBreak />

    <ExpandableLists 
      {...args} 
      value={value.map((expandableList, i) => ({
        ...expandableList,
        expanded: expanded[i],
        value: {
          ...expandableList.value,
          item: {
            ...expandableList.value.item,
            icon: expanded[i] ? 'chevron-up' : 'chevron-down'
          }
        }
      }))}
      onExpand={index => set_expanded(expanded.map((exp, i) => i === index ? !expanded[i] : exp))}
    />
  </>
  )
}

export const Positions = Template.bind({})
Positions.args = {
  value: [
    
  ]
}
Positions.parameters = {
  layout: 'fullscreen'
}
