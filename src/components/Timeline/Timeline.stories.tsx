import React, { useState, useEffect, MouseEvent } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline, ActivityEditor, Box, Tags, TimeReference, TimelineSurface } from '../../internal'
import {  ActivityType, AreaType } from '../../types'
import { styled } from '@storybook/theming'
import { DateTimeFormatter, Duration, ZonedDateTime, LocalDate } from '@js-joda/core'

export default {
  title: 'Advanced Input/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>

type AreasType = AreaType[]
type ActivitiesType = ActivityType[]

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
          startTime: `2022-12-31T08:00-06:00`,
          endTime: `2023-01-01T18:45-06:00`,
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
          startTime: `2023-01-01T08:15-06:00`,
          endTime: `2023-01-01T20:00-06:00`,
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
          startTime: `2023-01-01T19:15-06:00`,
          endTime: `2023-01-01T21:00-06:00`,
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
          startTime: `2023-01-01T22:00-06:00`,
          endTime: `2023-01-01T23:00-06:00`,
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
          startTime: `2023-01-01T21:00-06:00`,
          endTime: `2023-01-01T22:00-06:00`,
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
          startTime: `2023-01-01T22:45-06:00`,
          endTime: `2023-01-02T02:00-06:00`,
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
      ]
    },
    {
      area: 'Front Doors',
      activities: [
        {
          title: 'Pre-Open',
          startTime: `2023-01-01T15:00-06:00`,
          endTime: `2023-01-01T17:00-06:00`,
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
          startTime: `2023-01-01T17:00-06:00`,
          endTime: `2023-01-01T23:30-06:00`,
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
          startTime: `2023-01-01T23:30-06:00`,
          endTime: `2023-01-01T23:45-06:00`,
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
    // {
    //   area: 'Back Doors',
    //   activities: [
    //     {
    //       title: 'Pre-Open',
    //       startTime: `2023-01-01T15:00-06:00`,
    //       endTime: `2023-01-01T17:00-06:00`,
    //       id: '4',
    //       people: [
    //         {
    //           name: "Larry",
    //           position: "Security",
    //         },
    //         {
    //           name: "Samantha",
    //           position: "Security",
    //         },
    //         {
    //           name: "Kevin",
    //           position: "Ticket Scanner",
    //         },
    //         {
    //           name: "Amanda",
    //           position: "Ticket Scanner",
    //         }
    //       ],
    
    //     },
    //     {
    //       title: 'Open',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T23:30-06:00`,
    //       id: '5',
    //       people: [
    //         {
    //           name: "Larry",
    //           position: "Security",
    //         },
    //         {
    //           name: "Samantha",
    //           position: "Security",
    //         },
    //         {
    //           name: "Kevin",
    //           position: "Ticket Scanner",
    //         },
    //         {
    //           name: "Amanda",
    //           position: "Ticket Scanner",
    //         }
    //       ],
    
    //     },
    //     {
    //       title: 'Close',
    //       startTime: `2023-01-01T23:30-06:00`,
    //       endTime: `2023-01-01T23:45-06:00`,
    //       id: '6',
    //       people: [
    //         {
    //           name: "Larry",
    //           position: "Security",
    //         },
    //         {
    //           name: "Samantha",
    //           position: "Security",
    //         },
    //         {
    //           name: "Kevin",
    //           position: "Ticket Scanner",
    //         },
    //         {
    //           name: "Amanda",
    //           position: "Ticket Scanner",
    //         }
    //       ],
          
    //     },
    //   ]
    // },
    // {
    //   area: 'Green Room',
    //   activities: [
    //     {
    //       title: 'Mimosa Hour',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T19:00-06:00`,
    //       id: '7',
    //       people: [
    //         {
    //           name: "DJ Alpha",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Catering Service',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T19:00-06:00`,
    //       id: '8',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Massage Therapist',
    //       startTime:`2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '9',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Vocal Coach',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '10',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Ski-ball',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '11',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'A fairly long title, 23',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '13',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'This title is 32 characters long',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '14',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'This title is actually 11 characters longer',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '14',
    //       people: [
    //         {
    //           name: "Dave",
    //           position: "catering",
    //         },
    //         {
    //           name: "Lindsay",
    //           position: "catering",
    //         }
    //       ],
    //     },
    //   ]
    // },
    // {
    //   area: 'Stage 2',
    //   activities: [
    //     // {
    //     //   title: 'Set0: DJ PRE',
    //     //   startTime: `2023-01-01T17:00`,
    //     //   endTime: `2023-01-01T18:45`,
    //     //   id: '0',
    //     //   people: [
    //     //     {
    //     //       name: "DJ PRE",
    //     //       position: "DJ",
    //     //     },
    //     //     {
    //     //       name: "tech",
    //     //       position: "AV Tech",
    //     //     }
    //     //   ],
    //     // },
    //     //
    //     //
    //     // UPDATE TO UTC TIMECODE
    //     {
    //       title: 'Set1: DJ Alpha',
    //       startTime: `2023-01-01T17:00-06:00`,
    //       endTime: `2023-01-01T18:45-06:00`,
    //       id: '1',
    //       people: [
    //         {
    //           name: "DJ Alpha",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Set2: DJ Beta',
    //       startTime: `2023-01-01T18:00-06:00`,
    //       endTime: `2023-01-01T20:00-06:00`,
    //       id: '2',
    //       people: [
    //         {
    //           name: "DJ Beta",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Set3: DJ Theta',
    //       startTime: `2023-01-01T19:15-06:00`,
    //       endTime: `2023-01-01T21:00-06:00`,
    //       id: '3',
    //       people: [
    //         {
    //           name: "DJ Theta",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Set4: DJ Omega',
    //       startTime: `2023-01-01T22:00-06:00`,
    //       endTime: `2023-01-01T23:00-06:00`,
    //       id: '4',
    //       people: [
    //         {
    //           name: "DJ Theta",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Set5: DJ AGAIN',
    //       startTime: `2023-01-01T22:30-06:00`,
    //       endTime: `2023-01-01T23:30-06:00`,
    //       id: '5',
    //       people: [
    //         {
    //           name: "DJ Theta",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Set6: DJ AGAIN-AGAIN',
    //       startTime: `2023-01-01T22:45-06:00`,
    //       endTime: `2023-01-01T23:45-06:00`,
    //       id: '10',
    //       people: [
    //         {
    //           name: "DJ Theta",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
    //     {
    //       title: 'Set7: DJ TOO LONG',
    //       startTime: `2023-01-01T22:45-06:00`,
    //       endTime: `2023-01-01T23:45-06:00`,
    //       id: '11',
    //       people: [
    //         {
    //           name: "DJ Theta",
    //           position: "DJ",
    //         },
    //         {
    //           name: "tech",
    //           position: "AV Tech",
    //         }
    //       ],
    //     },
        
    //   ]
    // },
    ])
  const [activeTabs, set_activeTabs] = useState<string[]>([value[0].area])
  const [activityId, setActivityId] = useState<string | null>(null)
  const [currentActivities, set_currentActivities] = useState<AreaType[]>([])
  const [eventDateIntervals, set_eventDateIntervals] = useState<IntervalType[]>()

  let tabs: string[] = value?.map(({ area }) => area)

  let formattedHourMinute = (index) => {
    let hourMinute = Math.floor(index * 15 / 60)
    let formattedHourMinute = ("0" + hourMinute).slice(-2);

    return formattedHourMinute
  }


  // const onLaneItemClick = (e: React.MouseEvent) => {
  //   const element = e.target as HTMLDivElement
  //   const target = element.id
  //   setActivityId(target)
  // }

  // const onIntervalClick = (interval) => {
  //   let areaData = value[activeTabs]
  //   let dateTime = areaData.activities[0].startTime
  //   let activeDate: string = dateTime?.slice(0, 11)

  //   let dateTimeString = `${activeDate}${interval.value}`
  //   let startTime = ZonedDateTime.parse(dateTimeString)
  //   let endTime = startTime.plus(Duration.ofHours(1))

  //   let guid = crypto.randomUUID()

  //   let emptyActivity = {
  //     "title": '',
  //     "startTime": startTime.toString(),
  //     "endTime": endTime.toString(),
  //     "id": guid,
  //     "people": []
  //   }

  //   set_currentActivity(emptyActivity)
  //   setActivityId(guid)

  //   let newData = value.map((area, index) => {
  //     if (index === activeTabs) {
  //       let newArea: AreaType = area
  //       newArea?.activities.push(emptyActivity)
  //       return newArea  
  //     } 
  //     return area
  //   })
  //   set_value(newData)
  // }

  useEffect(() => {
    let activeIndexedData = value.map((area) => {
      if (activeTabs.includes(area.area)) {
         return area
      } else {
        return null
      }
    })

    let scrubbedData: AreasType = activeIndexedData.filter(item => item !== null)
    set_currentActivities(scrubbedData)
  }, [activeTabs, value])

  // create intervals array from value
  useEffect(() => {
    // flatten all activities from all areas
    let allActivities: ActivitiesType = value.map((area) => {
      return area.activities
    }).flat()

    // sort&create new array by start time and determine start time of data
    let sortedByStartTime: ActivitiesType = allActivities?.sort((a, b) => {
      let item1 = Date.parse(a.startTime)
      let item2 = Date.parse(b.startTime)

      return item1 - item2
    })

    let origin = ZonedDateTime.parse(sortedByStartTime[0].startTime)

    // sort&create array by end time and determine end time of data
    let sortedByEndTime: ActivitiesType = allActivities?.sort((a, b) => {
      let item1 = Date.parse(a.endTime)
      let item2 = Date.parse(b.endTime)

      return item2 - item1
    })

    let terminus = ZonedDateTime.parse(sortedByEndTime[0].endTime)

    // evaluate duration between origin and terminus
    let durationTimeStamp = Duration.between(origin, terminus).toString()

    // regex which reads hours from the return of Duration method ---> PT24H60M
    const regex = /(?<=PT)\d+/;

    // extract number of hours via regex expression
    let durationRegEx = durationTimeStamp.match(regex)?.toString()

    if (durationRegEx !== undefined) {

      // determine number of days needed to render data
      let durationDaysNumber = parseInt(durationRegEx) / 24
      let durationDaysInteger = Math.ceil(durationDaysNumber)

      // create an array to represent all dates of the event
      let emptyDates = new Array(durationDaysInteger).fill([0])
      let eventDates = emptyDates.map((date, index) => {
        if (index === 0) {
          return origin.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
        } else {
          return origin.plus(Duration.ofDays(index)).format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
        }
      })

      console.log(terminus.format(DateTimeFormatter.ofPattern('yyyy-MM-dd')), 'terminus')

      if (eventDates[eventDates.length - 1] !== terminus.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))){
        eventDates.push(terminus.format(DateTimeFormatter.ofPattern('yyyy-MM-dd')))
      }

      // create an array to represent a 24hr day in 15min increments
      const intervalList: IntervalType[] = new Array(96).fill(0)

      let eventDateIntervals = eventDates.map((date, index) => {
        let dateIndex = index
        let formattedTimeOffset = origin.format(DateTimeFormatter.ofPattern('ZZZZ')).substring(3)


        let parsedDate = LocalDate.parse(eventDates[dateIndex])
        let formattedDate = parsedDate.format(DateTimeFormatter.ofPattern('MM dd'))
        let namedDay = parsedDate.dayOfWeek().toString()

        return intervalList.map((interval, index) => (
          {
            display:
              index == 0 
                ? `${namedDay.substring(0,3)} ${formattedDate}`
                : index * 15 % 60 === 0
                  ? index * 15 / 60 > 12 && index * 15 / 60 < 24
                    ? `${(index * 15 / 60) - 12}pm`
                    : index * 15 / 60 == 12
                      ? `${index * 15 / 60}pm`
                      : index * 15 / 60 == 24
                        ? ``
                        : index * 15 / 60 > 24
                        ? `${(index * 15) / 60 - 24}am`
                        : `${(index * 15) / 60}am`
                  : ''
            ,
            value:
              index * 15 % 60 === 0
                ? `${eventDates[dateIndex]}T${formattedHourMinute(index)}:00${formattedTimeOffset}`
                : index * 15 % 60 === 15
                  ? `${eventDates[dateIndex]}T${formattedHourMinute(index)}:15${formattedTimeOffset}`
                  : index * 15 % 60 === 30
                    ? `${eventDates[dateIndex]}T${formattedHourMinute(index)}:30${formattedTimeOffset}`
                    : index * 15 % 60 === 45
                      ? `${eventDates[dateIndex]}T${formattedHourMinute(index)}:45${formattedTimeOffset}`
                      : ''
            ,
            gridNumber: index + dateIndex * 96
          }
        ))
      })

      if (eventDateIntervals !== undefined) {
        let updatedIntervals = eventDateIntervals.flat()
        set_eventDateIntervals(updatedIntervals)
      }
    }
  }, [value])

  // useEffect(() => console.log(eventDateIntervals), [eventDateIntervals])

  // let eventIntervals = eventDates.map((date, index) => {

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
          {
            eventDateIntervals !== undefined  
              ? <>
                  <TimeReference intervals={eventDateIntervals} />
                  <TimelineSurface intervals={eventDateIntervals} />
                </>
              : <></>
          }
          
        </S.LeftColumn>
        <S.RightColumn>
          {
            eventDateIntervals !== undefined
              ? currentActivities?.map((item, index) => {
                  return (
                    <Timeline
                      key={index}
                      value={item.activities}
                      intervals={eventDateIntervals}
                      onChange={() => null}
                      onIntervalClick={() => null}
                      onLaneItemClick={() => null}
                      color={['#000f1a', '#1A0000', '#01001a', '#001a04'][index]}
                      backgroundColor={ ['#94c3d6b8', '#d69494bb', '#9c94d6ba', '#94d69cb9'][index]}
                    />
                  )
                })
              :<></>
            
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