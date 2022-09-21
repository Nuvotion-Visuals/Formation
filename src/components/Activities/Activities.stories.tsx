import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'



import { Activities, ParseHTML, Page } from '../../internal'

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
          title: 'Set1: DJ Alpha',
          startTime: '1am',
          endTime: '2am',
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
          startTime: '2am',
          endTime: '3am',
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
          startTime: '3am',
          endTime: '4am',
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
          startTime: '6am',
          endTime: '8am',
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
          startTime: '8am',
          endTime: '12pm',
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
          startTime: '12pm',
          endTime: '2pm',
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
          title: 'Set1: DJ Alpha',
          startTime: '2pm',
          endTime: '6pm',
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
          startTime: '6pm',
          endTime: '10pm',
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
          startTime: '10pm',
          endTime: '12am',
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
    onChange={() => null} 
  />
}

export const Default = Template.bind({})
Default.args = {
  
}
Default.parameters = {
  layout: 'fullscreen'
}
