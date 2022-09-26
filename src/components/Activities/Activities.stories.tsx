import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'



import { Activities } from '../../internal'

export default {
  title: 'Advanced Input/Activities',
  component: Activities,
} as ComponentMeta<typeof Activities>

const Template: ComponentStory<typeof Activities> = args => {
  const [value, set_value] = useState([
    {
      area: 'Stage',
      activities: [
        {
          title: 'Set0: DJ PRE',
          startTime: 960,
          endTime: 1110,
          icon: 'orange',
          people: [
            {
              name: "DJ PRE",
              position: "DJ",
            },
            {
              name: "tech",
              position: "AV Tech",
            }
          ],
        },
        {
          title: 'Set1: DJ Alpha',
          startTime: 1140,
          endTime: 1230,
          icon: 'orange',
          people: [
            {
              name: "DJ Alpha",
              position: "DJ",
            },
            {
              name: "tech",
              position: "AV Tech",
            }
          ],
        },
        {
          title: 'Set2: DJ Beta',
          startTime: 1230,
          endTime: 1320,
          icon: 'orange',
          people: [
            {
              name: "DJ Beta",
              position: "DJ",
            },
            {
              name: "tech",
              position: "AV Tech",
            }
          ],
        },
        {
          title: 'Set3: DJ Theta',
          startTime: 1320,
          endTime: 1485,
          icon: 'orange',
          people: [
            {
              name: "DJ Theta",
              position: "DJ",
            },
            {
              name: "tech",
              position: "AV Tech",
            }
          ],
        },
      ]
    },
    {
      area: 'Doors',
      activities: [
        {
          title: 'Pre-Open',
          startTime: 1080,
          endTime: 1140,
          icon: 'orange',
          people: [
            {
              name: "Larry",
              position: "Security",
            },
            {
              name: "Samantha",
              position: "Security",
            },
            {
              name: "Kevin",
              position: "Ticket Scanner",
            },
            {
              name: "Amanda",
              position: "Ticket Scanner",
            }
          ],
    
        },
        {
          title: 'Open',
          startTime: 1140,
          endTime: 1440,
          icon: 'orange',
          people: [
            {
              name: "Larry",
              position: "Security",
            },
            {
              name: "Samantha",
              position: "Security",
            },
            {
              name: "Kevin",
              position: "Ticket Scanner",
            },
            {
              name: "Amanda",
              position: "Ticket Scanner",
            }
          ],
    
        },
        {
          title: 'Close',
          startTime: 1440,
          endTime: 1560,
          icon: 'orange',
          people: [
            {
              name: "Larry",
              position: "Security",
            },
            {
              name: "Samantha",
              position: "Security",
            },
            {
              name: "Kevin",
              position: "Ticket Scanner",
            },
            {
              name: "Amanda",
              position: "Ticket Scanner",
            }
          ],
          
        },
      ]
    },
    {
      area: 'Green Room',
      activities: [
        {
          title: 'Mimosa and Tequila Block',
          startTime: 1020,
          endTime: 1080,
          icon: 'orange',
          people: [
            {
              name: "DJ Alpha",
              position: "DJ",
            },
            {
              name: "tech",
              position: "AV Tech",
            }
          ],
        },
        {
          title: 'Catering Service',
          startTime: 1080,
          endTime: 1200,
          icon: 'orange',
          people: [
            {
              name: "Dave",
              position: "catering",
            },
            {
              name: "Lindsay",
              position: "catering",
            }
          ],
        },
        {
          title: 'After-Party',
          startTime: 1200,
          endTime: 1560,
          icon: 'orange',
          people: [
            {
              name: "DJ Theta",
              position: "DJ",
            },
            {
              name: "tech",
              position: "AV Tech",
            }
          ],
        },
      ]
    }
    
  ])

  return <Activities 
    {...args}
    value={value}
    onChange={(newValue) => set_value(newValue)} 
  />
}

export const Default = Template.bind({})
Default.args = {
  
}
Default.parameters = {
  layout: 'fullscreen'
}
