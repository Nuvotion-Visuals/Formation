import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MultiExpandableList } from './MultiExpandableList'


export default {
  title: 'Lists/MultiExpandableList',
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
      'title': '🎧 DJs',
      'guid': '',
      'listItems': [
        {
          'title': 'DJ SKoli',
          'avatar': false
        },
        {
          'title': 'King Spookey',
          'avatar': false
        },
        {
          'title': 'Subsus',
          'avatar': false
        }
      ]
  },
    {
      'title': '🔥 Fire Dancers',
      'guid': '',
      'listItems': [
        {
          'title': 'Isabella',
          'avatar': false
        },
        {
          'title': 'Lexi',
          'avatar': false
        },
        {
          'title': 'Gloria',
          'avatar': false
        },
        {
          'title': 'Michael',
          'avatar': false
        },
        {
          'title': 'PJ',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        }
      ]
    },
    {
      'title': '📺 Vusicians',
      'guid': '',
      'listItems': [
        {
          'title': 'AVsync.LIVE',
          'avatar': false
        },
        {
          'title': 'Neocord',
          'avatar': false
        }
      ]
    },
    {
      'title': '💡 Lighting Designer',
      'guid': '',
      'listItems': [
        {
          'title': 'Atomosity',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        }
      ]
    },
    {
      'title': '🍺 Bartenders',
      'guid': '',
      'listItems': [
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        }
      ]
    },
    {
      'title': '🛡️ Security',
      'guid': '',
      'listItems': [
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        }
      ]
    },
    {
      'title': '🔊 Audio engineer',
      'guid': '',
      'listItems': [
        {
          'title': 'Ricky Havansek',
          'avatar': false
        }
      ]
    },
    {
      'title': '🍽️ Waitstaff',
      'guid': '',
      'listItems': [
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        },
        {
          'title': '',
          'avatar': false
        }
      ]
    }
  ],
  
  onRemoveFunction: () => alert('remove'),
  label: 'Position title'
}
Positions.parameters = {
  layout: 'fullscreen'
}
