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
          startTime: '1',
          endTime: '2',
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
          startTime: '2',
          endTime: '3',
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
          startTime: '3',
          endTime: '4',
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
          startTime: '0',
          endTime: '1',
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
          startTime: '1',
          endTime: '4',
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
          startTime: '3',
          endTime: '4',
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
