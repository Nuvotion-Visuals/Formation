import React, { useState, useEffect, MouseEvent } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline, ActivityEditor, Box, Tags, TimeReference, TimelineSurface } from '../../internal'
import {  AreaType } from '../../types'
import { styled } from '@storybook/theming'
import { DateTimeFormatter, Duration, ZonedDateTime } from '@js-joda/core'

export default {
  title: 'Advanced Input/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>

type AreasType = AreaType[]

interface IntervalType {
  display: string,
  value: string,
  gridNumber: number
}


const Template: ComponentStory<typeof Timeline> = args => {
  const [value, set_value] = useState([
    {
      area: 'Stage 1',
      activities: [
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
          startTime: `2023-01-01T22:45:00.000-06:00[America/Chicago]`,
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
      area: 'Front Doors',
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
      area: 'Back Doors',
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
        {
          title: 'This title is actually 11 characters longer',
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
    },
    {
      area: 'Stage 2',
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
          startTime: `2023-01-01T22:45:00.000-06:00[America/Chicago]`,
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
    ])
  const [activeTabs, set_activeTabs] = useState<string[]>([value[0].area])
  const [activityId, setActivityId] = useState<string | null>(null)
  const [currentActivities, set_currentActivities] = useState<AreaType[]>([])

  let tabs: string[] = value?.map(({ area }) => area)

  const intervals: IntervalType[] = new Array(112).fill(0).map((item, index) => (
    {
      display:
        index * 15 % 60 === 0
          ? index * 15 / 60 > 12 && index * 15 / 60 < 24
            ? `${(index * 15 / 60) - 12}pm`
            : index * 15 / 60 == 12
              ? `${index * 15 / 60}pm`
              : index * 15 / 60 == 24
                ? '12am'
                : index * 15 / 60 > 24
                ? `${(index * 15) / 60 - 24}am`
                : `${(index * 15) / 60}am`
          : ''
      ,
      value:
        index * 15 % 60 === 0
          ? `${index * 15 / 60}:00`
          : index * 15 % 60 === 15
            ? `${Math.round(index * 15 / 60)}:15`
            : index * 15 % 60 === 30
              ? `${Math.floor(index * 15 / 60)}:30`
              : index * 15 % 60 === 45
                ? `${Math.floor(index * 15 / 60)}:45`
                : ''
      ,
      gridNumber: index
    }
  ))

  const onLaneItemClick = (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement
    const target = element.id
    setActivityId(target)
  }

  const onIntervalClick = (interval) => {
    let areaData = value[activeTabs]
    let dateTime = areaData.activities[0].startTime
    let activeDate: string = dateTime?.slice(0, 11)

    let dateTimeString = `${activeDate}${interval.value}:00.000-06:00[America/Chicago]`
    let startTime = ZonedDateTime.parse(dateTimeString)
    let endTime = startTime.plus(Duration.ofHours(1))

    let guid = crypto.randomUUID()

    let emptyActivity = {
      "title": '',
      "startTime": startTime.toString(),
      "endTime": endTime.toString(),
      "id": guid,
      "people": []
    }

    set_currentActivity(emptyActivity)
    setActivityId(guid)

    let newData = value.map((area, index) => {
      if (index === activeTabs) {
        let newArea: AreaType = area
        newArea?.activities.push(emptyActivity)
        return newArea  
      } 
      return area
    })
    set_value(newData)
  }

  useEffect(() => {
    let activeIndexedData = value.map((area) => {
      if (activeTabs.includes(area.area)) {
         return area
      } else {
        return null
      }
    })

    let scrubbedData: AreasType = activeIndexedData.filter(item => item !== null)
    console.log(activeTabs, "active Indexes")
    console.log(scrubbedData)
    set_currentActivities(scrubbedData)
  }, [activeTabs, value])

  useEffect(() => {
    console.log(currentActivities, "Current Activities")
  }, [currentActivities])

  return (
    <S.Container>
      <S.TagsContainer>
        <Tags
          allTags={tabs}
          initialActiveTags={[tabs[0]]}
          onChange={tabs => set_activeTabs(tabs)}
        />
      </S.TagsContainer>  
      <S.Content>
        <S.LeftColumn>
          <TimeReference intervals={intervals} />
          <TimelineSurface intervals={intervals} />
        </S.LeftColumn>
        <S.RightColumn className={'right column'}>
          {
            currentActivities?.map((item, index) => {
              return (
                <Timeline
                  value={item.activities}
                  intervals={intervals}
                  onChange={() => null}
                  onIntervalClick={() => null}
                  onLaneItemClick={() => null}
                  color={['red', 'blue', 'green', 'orange'][index]}
                  backgroundColor={ ['darkred', 'lightblue', 'lightgreen', 'lightorange'][index]}
                />
              )
            })
          }
          
        </S.RightColumn>
      </S.Content>
    </S.Container>
  )
}

export const Activities = Template.bind({})
Activities.args = {
  
}
Activities.parameters = {
  layout: 'fullscreen'
}


const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
  `,
  TagsContainer: styled.div`
    position: relative;
    width: 100%;
    height: 2.25rem;
    padding: 0.5rem;
    overflow-x: auto; 
    z-index: 1000;
    background: white;
  `,
  Content: styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: calc(100% - 50px);
  display: flex;
  overflow-y: auto;
`,
  Overflow: styled.div`
    max-height: 100%;
`,
  DataView: styled.div`
  `,
  LeftColumn: styled.div`
    width: 4rem;
    height: 100%;
  `,
  RightColumn: styled.div`
    position: relative;
    width: calc(100% - 4rem);
    height: fit-content;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  `,
  Item: styled.div`
    width: 12rem;
    min-width: 12rem;
    height: 8rem;
    outline: 1px solid black;
    background: red;
  `,
  Example: styled.div`
    width: 4rem;
    height: 15px;
    background: red;
  `
}