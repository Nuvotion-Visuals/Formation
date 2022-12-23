import React, { useState, useEffect, MouseEvent } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline, ActivityEditor, Box, Tags, TimeReference, TimelineSurface } from '../../internal'
import { ActivityType, AreaType } from '../../types'
import { styled } from '@storybook/theming'

import { DateTimeFormatter, Duration, ZonedDateTime, LocalDate, LocalDateTime } from '@js-joda/core'

export default {
  title: 'Advanced Input/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>

type AreasType = AreaType[]
type ActivitiesType = ActivityType[]

interface IntervalType {
  display: string | string[],
  value: string,
  gridNumber: number
}


const Template: ComponentStory<typeof Timeline> = args => {
  // Value Block One
  //
  const [value, set_value] = useState<AreasType>([
    {
      area: 'West Stage',
      activities: [
        {
          title: 'DJ Alpha',
          startTime: `2022-12-31T18:00-06:00`,
          endTime: `2022-12-31T20:45-06:00`,
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
          title: 'DJ Beta',
          startTime: `2022-12-31T20:45-06:00`,
          endTime: `2022-12-31T23:00-06:00`,
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
          title: 'DJ Theta',
          startTime: `2022-12-31T23:00-06:00`,
          endTime: `2023-01-01T01:00-06:00`,
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
          title: 'DJ Omega',
          startTime: `2023-01-01T01:00-06:00`,
          endTime: `2023-01-01T03:00-06:00`,
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
          title: 'DJ AGAIN',
          startTime: `2023-01-01T03:00-06:00`,
          endTime: `2023-01-01T05:00-06:00`,
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
          title: 'DJ AGAIN... AGAIN',
          startTime: `2023-01-01T05:00-06:00`,
          endTime: `2023-01-01T06:30-06:00`,
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
      area: 'East Stage',
      activities: [
        {
          title: 'Attack Juggling',
          startTime: `2022-12-31T19:00-06:00`,
          endTime: `2022-12-31T21:00-06:00`,
          id: '66b47071-70b9-4aa7-9394-60788627962e',
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
          title: 'Acrobats & Aerialists',
          startTime: `2022-12-31T21:00-06:00`,
          endTime: `2022-12-31T22:00-06:00`,
          id: '2627c6a3-6dfe-4c6b-a756-e672279dc4ea',
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
          title: 'Burlesque with Berty',
          startTime: `2022-12-31T22:00-06:00`,
          endTime: `2023-01-01T00:00-06:00`,
          id: '2b6fd32b-ea24-4d17-a9f6-1fb8c79e5a76',
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
          title: 'Dance Off',
          startTime: `2023-01-01T01:00-06:00`,
          endTime: `2023-01-01T03:00-06:00`,
          id: '4d4b237b-10c0-4757-a205-bcb13eab0fd8',
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
          title: 'Hypnosis',
          startTime: `2023-01-01T03:00-06:00`,
          endTime: `2023-01-01T04:00-06:00`,
          id: '9057e3a6-4382-4c3d-b5de-2dea2625b316',
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
          startTime: `2022-12-31T16:00-06:00`,
          endTime: `2022-12-31T18:00-06:00`,
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
          startTime: `2022-12-31T18:00-06:00`,
          endTime: `2023-01-01T07:00-06:00`,
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
          title: '18+ entry',
          startTime: `2022-12-31T18:00-06:00`,
          endTime: `2022-12-31T22:00-06:00`,
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
          title: '21+ entry',
          startTime: `2022-12-31T22:00-06:00`,
          endTime: `2023-01-01T05:00-06:00`,
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
          title: 'Close + Clean',
          startTime: `2023-01-01T07:00-06:00`,
          endTime: `2023-01-01T07:30-06:00`,
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
    }
  ])

  // Value Block Two
  //
  // const [value, set_value] = useState<AreasType>([
  //   {
  //     area: 'West Stage',
  //     activities: [
  //       {
  //         title: 'DJ Alpha',
  //         startTime: `2022-12-23T09:00-06:00`,
  //         endTime: `2022-12-23T12:00-06:00`,
  //         id: '1',
  //         people: [
  //           {
  //             name: "DJ Alpha",
  //             position: "DJ",
  //           },
  //           {
  //             name: "tech",
  //             position: "AV Tech",
  //           }
  //         ],
  //       },
  //       {
  //         title: 'DJ Beta',
  //         startTime: `2022-12-23T08:00-06:00`,
  //         endTime: `2022-12-23T11:00-06:00`,
  //         id: '1',
  //         people: [
  //           {
  //             name: "DJ Alpha",
  //             position: "DJ",
  //           },
  //           {
  //             name: "tech",
  //             position: "AV Tech",
  //           }
  //         ],
  //       }
  //     ]
  //   }
  // ])

  // Value Block Three
  //
  // const [value, set_value] = useState<AreasType>([
  //   {
  //     area: 'Central Stage',
  //     activities: [
  //       {
  //         title: 'SF Event',
  //         startTime: `2022-12-23T11:30-06:00`,
  //         endTime: `2022-12-23T23:00-06:00`,
  //         id: '1',
  //         people: [
  //           {
  //             name: "DJ Alpha",
  //             position: "DJ",
  //           },
  //           {
  //             name: "tech",
  //             position: "AV Tech",
  //           }
  //         ],
  //       }
  //     ]
  //   }
  // ])


  const [activeTabs, set_activeTabs] = useState<string[]>([value[0].area])
  const [activityId, setActivityId] = useState<string | null>(null)
  const [currentActivities, set_currentActivities] = useState<AreaType[]>([])
  const [eventDateIntervals, set_eventDateIntervals] = useState<IntervalType[]>()
  const [currentTime, set_currentTime] = useState(ZonedDateTime.now().format(DateTimeFormatter.ofPattern(`yyyy-M-dd'T'HH:mmXXX`)).toString()) 
  const [timeReferencePosition, set_timeReferencePosition] = useState('')

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

  /*  set currentActivities  */
  useEffect(() => {
    let activeIndexedData: AreasType = value.map((area) => {
      if (activeTabs.includes(area.area)) {
         return area
      } else {
        return
      }
    })
      
    let scrubbedData: AreasType = activeIndexedData.filter(item => item !== undefined)
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

      if (eventDates[eventDates.length - 1] !== terminus.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))){
        eventDates.push(terminus.format(DateTimeFormatter.ofPattern('yyyy-MM-dd')))
      }

      // create an array to represent a 24hr day in 15min increments
      const intervalList: IntervalType[] = new Array(96).fill(0)

      let eventDateIntervals = eventDates.map((date, index) => {
        let dateIndex = index
        let formattedTimeOffset = origin.format(DateTimeFormatter.ofPattern('ZZZZ')).substring(3)


        let parsedDate = LocalDate.parse(eventDates[dateIndex])
        let formattedDate = parsedDate.format(DateTimeFormatter.ofPattern('MM/dd'))
        let namedDay = parsedDate.dayOfWeek().toString()

        return intervalList.map((interval, index) => (
          {
            display:
              index == 0 
                ? [ `${namedDay.substring(0,3)}`, `${formattedDate}`]
                : index * 15 % 60 === 0
                  ? index * 15 / 60 > 12 && index * 15 / 60 < 24
                    ? [`${(index * 15 / 60) - 12}pm`]
                    : index * 15 / 60 == 12
                      ? [`${index * 15 / 60}pm`]
                      : index * 15 / 60 == 24
                        ? ``
                        : index * 15 / 60 > 24
                        ? [`${(index * 15) / 60 - 24}am`]
                        : [`${(index * 15) / 60}am`]
                  : ['']
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

  // determine if timeStampReference component should be tracked/rendered
  useEffect(() => {
    if (eventDateIntervals !== undefined) {
      console.log(eventDateIntervals, 'eventDateIntervals')
      let startTime: string = eventDateIntervals[0].value
      let parsedStartTime = ZonedDateTime.parse(startTime)

      let endTime: string = eventDateIntervals[eventDateIntervals.length - 1].value
      let parsedEndTime = ZonedDateTime.parse(endTime)

      let parsedCurrentTime = ZonedDateTime.parse(currentTime)
      let isAfterStart = parsedCurrentTime.isAfter(parsedStartTime)
      let isBeforeEnd = parsedCurrentTime.isBefore(parsedEndTime)

      if (isAfterStart && isBeforeEnd) {
        setInterval(() => {
          set_currentTime(ZonedDateTime.now().format(DateTimeFormatter.ofPattern(`yyyy-M-dd'T'HH:mmXXX`)).toString())
        }, 1000)

        let currentTimeParsed = ZonedDateTime.parse(currentTime)

        let currentOffset = currentTimeParsed.toString().substring(16)
        let currentOffsetInt = parseInt(currentOffset)

        let endTimeOffset = parsedEndTime.toString().substring(16)
        let endTimeOffsetInt = parseInt(endTimeOffset)

        let timeComparison = Duration.between(currentTimeParsed, parsedEndTime)

        console.log(timeComparison.toString(), 'timeComparison')

        let w = timeComparison.plus(Duration.ofHours(0).plusMinutes(15))
        let x = w._seconds / 60
        set_timeReferencePosition(`${x}px`)
      }
      console.log(isAfterStart, startTime, parsedCurrentTime.toString(), 'after start/current')
      console.log(isBeforeEnd, parsedCurrentTime.toString(), 'before end/current')
    }      
  }, [eventDateIntervals])

  return (
    <S.Container>
      <S.TagsContainer>
        <Tags
          allTags={tabs}
          initialActiveTags={[tabs[0]]}
          onChange={tabs => set_activeTabs(tabs)}
        />
      </S.TagsContainer>  
      <S.Content className={'CONTENT'}>
        <S.Timeline>
          {
            timeReferencePosition !== ''
              ? <S.CurrentTimeReference timeReferencePosition={timeReferencePosition}></S.CurrentTimeReference>
              : <></>
          }
          
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
        </S.Timeline>
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
    height: 99.5vh;
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
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }

    ::-webkit-scrollbar-track {
      background: #ffffff28;
      -webkit-box-shadow: inset 0 0 .125rem rgba(0,0,0,0.3);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--F_Primary_Variant);
    }
`,
  Timeline: styled.div`
    position: relative;
    width: 100%;
    min-height: fit-content;
    display: flex;
  `,
  CurrentTimeReference: styled.div<{
    timeReferencePosition: string | undefined
  }>`
    position: absolute;
    bottom: ${props => props.timeReferencePosition !== undefined ? props.timeReferencePosition : ''};
    width: 100%;
    height: 1px;
    background: #d44c4c;
    z-index: 500;
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
  `
}