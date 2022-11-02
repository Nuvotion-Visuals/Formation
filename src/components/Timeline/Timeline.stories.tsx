import React, { useState, useEffect, MouseEvent } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Timeline, ActivityEditor, Box, Tabs } from '../../internal'
import { ActivityType } from '../../types'
import { styled } from '@storybook/theming'

export default {
  title: 'Advanced Input/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>

type Tab = {
  name: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  onClick?: () => void,
  prefix?: IconPrefix,
  suffix?: string
}

const Template: ComponentStory<typeof Timeline> = args => {
  const [value, set_value] = useState([
    {
      area: 'Stages',
      activities: [
        // {
        //   title: 'Set0: DJ PRE',
        //   startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
        //   endTime: `2023-01-01T18:45:00.000-06:00[America/Chicago]`,
        //   id: '0',
        //   people: [
        //     {
        //       name: "DJ PRE",
        //       position: "DJ",
        //     },
        //     {
        //       name: "tech",
        //       position: "AV Tech",
        //     }
        //   ],
        // },
        //
        //
        // UPDATE TO UTC TIMECODE
        {
          title: 'Set1: DJ Alpha',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T18:45:00.000-06:00[America/Chicago]`,
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
          startTime: `2023-01-01T18:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
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
          startTime: `2023-01-01T19:15:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T21:00:00.000-06:00[America/Chicago]`,
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
        {
          title: 'Set4: DJ Omega',
          startTime: `2023-01-01T22:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T23:00:00.000-06:00[America/Chicago]`,
          id: '4',
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
        {
          title: 'Set5: DJ AGAIN',
          startTime: `2023-01-01T22:30:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T23:30:00.000-06:00[America/Chicago]`,
          id: '5',
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
        {
          title: 'Set6: DJ AGAIN-AGAIN',
          startTime: `2023-01-01T22:45:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T23:45:00.000-06:00[America/Chicago]`,
          id: '10',
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
        {
          title: 'Set7: DJ TOO LONG',
          startTime: `2023-01-01T23:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T23:45:00.000-06:00[America/Chicago]`,
          id: '11',
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
          startTime: `2023-01-01T15:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
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
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T23:30:00.000-06:00[America/Chicago]`,
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
          startTime: `2023-01-01T23:30:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T23:45:00.000-06:00[America/Chicago]`,
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
          title: 'Mimosa Hour',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T19:00:00.000-06:00[America/Chicago]`,
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
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T19:00:00.000-06:00[America/Chicago]`,
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
          title: 'Massage Therapist',
          startTime:`2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
          id: '9',
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
          title: 'Vocal Coach',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
          id: '10',
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
          title: 'Ski-ball',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
          id: '11',
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
          title: 'Ski-ball Lane 2',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
          id: '12',
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
          title: 'A fairly long title, 23',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
          id: '13',
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
          title: 'This title is 32 characters long',
          startTime: `2023-01-01T17:00:00.000-06:00[America/Chicago]`,
          endTime: `2023-01-01T20:00:00.000-06:00[America/Chicago]`,
          id: '14',
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
      ]
    }
    ])
  const [activeAreaIndex, set_activeAreaIndex] = useState<number>(0)
  const [activityId, setActivityId] = useState<string | null>(null)
  const [currentActivity, set_currentActivity] = useState<ActivityType>()

  let tabs: Tab[] = value?.map(({ area }, index) => {
    const tab = { name: area, onClick: () => set_activeAreaIndex(index)}
    return tab
  })

  const onAreaGridClick = (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement
    const target = element.id
    setActivityId(target)
  }

  useEffect(() => {
    let activity = value[activeAreaIndex].activities.find(elem => elem.id === activityId)
    set_currentActivity(activity)
  }, [activityId, value])

  // useEffect(() => console.log(value, "<<VALUE>>"), [value])

  return(
    <Box>
      <Box wrap>
      <S.Sticky>
        <Box width={"100%"}>
          
            <Tabs
            tabs={tabs}
            initialActiveTab={tabs[0].name}
            onSetActiveTab={() => null}
            />
          
          </Box>
          </S.Sticky>
        <Timeline 
          {...args}
          value={value}
          onChange={(newValue) => set_value(newValue)} 
          onClick={(e: MouseEvent) => onAreaGridClick(e)}
          activeArea={activeAreaIndex}
        />
      </Box>
      <ActivityEditor
        value={value}
        onChange={(newValue) => set_value(newValue)}
        activity={currentActivity}
        activeAreaIndex={activeAreaIndex}
      />
  </Box>)
}

export const Activities = Template.bind({})
Activities.args = {
  
}
Activities.parameters = {
  layout: 'fullscreen'
}


const S = {
  Sticky: styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
    background: white;
  `
}
