import React, { useState, useEffect, MouseEvent } from 'react'
import styled from 'styled-components'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Activities, ActivityEditor } from '../../internal'
import { ActivityType } from '../../types'

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
          id: '0',
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
          id: '1',
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
          id: '2',
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
          id: '3',
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
          id: '4',
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
          id: '5',
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
          id: '6',
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
          id: '7',
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
          id: '8',
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
          id: '9',
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
  const [activityId, setActivityId] = useState<string | null>(null)
  const [currentActivity, set_currentActivity] = useState<ActivityType>()

  useEffect(() => {
    let activity = value[0].activities.find(elem => elem.id === activityId)
    set_currentActivity(activity)
  }, [activityId, value])

  useEffect(() => console.log(currentActivity, "<<ACK>>"), [currentActivity])

  const onAreaGridClick = (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement
    const target = element.id
    setActivityId(target)
  }

  return(
  <S.Box>
    <Activities 
      {...args}
      value={value}
      onChange={(newValue) => set_value(newValue)} 
      onClick={(e: MouseEvent) => onAreaGridClick(e)}
    />
    <ActivityEditor
      value={value}
      onChange={(newValue) => set_value(newValue)}
    />
  </S.Box>)
}

export const Default = Template.bind({})
Default.args = {
  
}
Default.parameters = {
  layout: 'fullscreen'
}

const S = {
  Box: styled.div<{}>`
    display: flex;
  `
}
