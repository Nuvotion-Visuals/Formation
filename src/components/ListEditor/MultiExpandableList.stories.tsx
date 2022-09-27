import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MultiExpandableList } from './MultiExpandableList'


export default {
  name: 'Lists/MultiExpandableList',
  component: MultiExpandableList,
} as ComponentMeta<typeof MultiExpandableList>

const Template: ComponentStory<typeof MultiExpandableList> = args => {
  const [value, set_value] = useState(args.value)

  return (
    <MultiExpandableList 
      {...args} 
      onChange={lists => set_value(lists)}
      value={value}
    />
  )
}

export const Positions = Template.bind({})
Positions.args = {
  value: [
    {
      'name': 'DJs',
      'guid': '',
      'listItems': [
        {
          'name': 'DJ SKoli',
          'avatar': false
        },
        {
          'name': 'King Spookey',
          'avatar': false
        },
        {
          'name': 'Subsus',
          'avatar': false
        }
      ]
  },
    {
      'name': 'Fire Dancers',
      'guid': '',
      'listItems': [
        {
          'name': 'Isabella',
          'avatar': false
        },
        {
          'name': 'Lexi',
          'avatar': false
        },
        {
          'name': 'Gloria',
          'avatar': false
        },
        {
          'name': 'Michael',
          'avatar': false
        },
        {
          'name': 'PJ',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        }
      ]
    },
    {
      'name': 'Vusicians',
      'guid': '',
      'listItems': [
        {
          'name': 'AVsync.LIVE',
          'avatar': false
        },
        {
          'name': 'Neocord',
          'avatar': false
        }
      ]
    },
    {
      'name': 'Lighting Designer',
      'guid': '',
      'listItems': [
        {
          'name': 'Atomosity',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        }
      ]
    },
    {
      'name': 'Bartenders',
      'guid': '',
      'listItems': [
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        }
      ]
    },
    {
      'name': 'Security',
      'guid': '',
      'listItems': [
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        }
      ]
    },
    {
      'name': 'Audio engineer',
      'guid': '',
      'listItems': [
        {
          'name': 'Ricky Havansek',
          'avatar': false
        }
      ]
    },
    {
      'name': 'Waitstaff',
      'guid': '',
      'listItems': [
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        },
        {
          'name': '',
          'avatar': false
        }
      ]
    }
  ],
  
  onRemoveFunction: () => alert('remove'),
  label: 'Position name'
}
Positions.parameters = {
  layout: 'fullscreen'
}
