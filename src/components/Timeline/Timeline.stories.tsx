import React, { useState, useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Timeline, Tags, TimeReference, TimelineSurface, LiveTimeIndicator, Modal } from '../../internal'
import { styled } from '@storybook/theming'

import { DateTimeFormatter, Duration, ZonedDateTime, LocalDate } from '@js-joda/core'
import { Locale } from '@js-joda/locale_en-us'
import { Button, ButtonProps } from '../Button/Button'
import { ActivityForm } from './ActivityForm'

export default {
  title: 'Advanced Input/Timeline',
  component: Timeline,
} as ComponentMeta<typeof Timeline>

type areaColorType = {
  itemBackground: string,
  itemText: string,
  buttonBackground: string,
  buttonHoverBackground: string
}

interface IntervalType {
  display: string | string[],
  value: string,
  gridNumber: number
}

type AreaType = {
  area: string,
  areaId: string,
  colors: areaColorType,
  activities: ActivityType[],
}

export type ActivityType = {
  title: string,
  startTime: string,
  endTime: string,
  id: string,
  area: string,
  areaId: string,
  people: PersonType[],
  overflowLane: number
}

export type PersonType = {
  name: string,
  position: string,
}

type AreasType = AreaType[]
type ActivitiesType = ActivityType[]


const Template: ComponentStory<typeof Timeline> = args => { 
  // automatically create a two day calendar using clients date information
  const todaysDateString = ZonedDateTime.now().format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
  const tomorrowsDateString = ZonedDateTime.now().plusDays(1).format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))

  // mock data to be rendered
  const [value, set_value] = useState<AreasType>([
    {
      area: 'West Stage',
      areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
      colors: {
        itemBackground: 'var(--F_Timeline_Item_Background_Red)',
        itemText: 'var(--F_Timeline_Item_Text_Red)',
        buttonBackground: 'var(--F_Timeline_Item_Background_Red)',
        buttonHoverBackground: 'var(--F_Timeline_Item_Text_Red)'
      },
      activities: [
        {
          title: 'DJ Alpha',
          startTime: `${todaysDateString}T18:00-06:00`,
          endTime: `${todaysDateString}T20:45-06:00`,
          id: '1',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T20:45-06:00`,
          endTime: `${todaysDateString}T23:00-06:00`,
          id: '2',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T23:00-06:00`,
          endTime: `${tomorrowsDateString}T01:00-06:00`,
          id: '3',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T01:00-06:00`,
          endTime: `${tomorrowsDateString}T03:00-06:00`,
          id: '4',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T03:00-06:00`,
          endTime: `${tomorrowsDateString}T05:00-06:00`,
          id: '5',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T05:00-06:00`,
          endTime: `${tomorrowsDateString}T06:30-06:00`,
          id: '6',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T22:00-06:00`,
          endTime: `2023-01-06T01:30-06:00`,
          id: '7',
          area: 'West Stage',
          areaId: '9e8f1a5c-2b9a-4f8a-a2c2-7f7cb8c5af8d',
          overflowLane: 1,
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
      areaId: 'd45a7b9d-68ee-4f3b-a5d7-b1f48a4c5048',
      colors: {
        itemBackground: 'var(--F_Timeline_Item_Background_Blue)',
        itemText: 'var(--F_Timeline_Item_Text_Blue)',
        buttonBackground: 'var(--F_Timeline_Item_Background_Blue)',
        buttonHoverBackground: 'var(--F_Timeline_Item_Text_Blue)'
      },
      activities: [
        {
          title: 'Attack Juggling',
          startTime: `${todaysDateString}T19:00-06:00`,
          endTime: `${todaysDateString}T21:00-06:00`,
          id: '66b47071-70b9-4aa7-9394-60788627962e',
          area: 'East Stage',
          areaId: 'd45a7b9d-68ee-4f3b-a5d7-b1f48a4c5048',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T21:00-06:00`,
          endTime: `${todaysDateString}T22:00-06:00`,
          id: '2627c6a3-6dfe-4c6b-a756-e672279dc4ea',
          area: 'East Stage',
          areaId: 'd45a7b9d-68ee-4f3b-a5d7-b1f48a4c5048',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T22:00-06:00`,
          endTime: `${tomorrowsDateString}T00:00-06:00`,
          id: '2b6fd32b-ea24-4d17-a9f6-1fb8c79e5a76',
          area: 'East Stage',
          areaId: 'd45a7b9d-68ee-4f3b-a5d7-b1f48a4c5048',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T01:00-06:00`,
          endTime: `${tomorrowsDateString}T03:00-06:00`,
          id: '4d4b237b-10c0-4757-a205-bcb13eab0fd8',
          area: 'East Stage',
          areaId: 'd45a7b9d-68ee-4f3b-a5d7-b1f48a4c5048',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T03:00-06:00`,
          endTime: `${tomorrowsDateString}T04:00-06:00`,
          id: '9057e3a6-4382-4c3d-b5de-2dea2625b316',
          area: 'East Stage',
          areaId: 'd45a7b9d-68ee-4f3b-a5d7-b1f48a4c5048',
          overflowLane: 1,
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
      areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
      colors: {
        itemBackground: 'var(--F_Timeline_Item_Background_Yellow)',
        itemText: 'var(--F_Timeline_Item_Text_Yellow)',
        buttonBackground: 'var(--F_Timeline_Item_Background_Yellow)',
        buttonHoverBackground: 'var(--F_Timeline_Item_Text_Yellow)'
      },
      activities: [
        {
          title: 'Pre-Open',
          startTime: `${todaysDateString}T16:00-06:00`,
          endTime: `${todaysDateString}T18:00-06:00`,
          id: '20',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T18:00-06:00`,
          endTime: `${tomorrowsDateString}T07:00-06:00`,
          id: '21',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T18:00-06:00`,
          endTime: `${todaysDateString}T22:00-06:00`,
          id: '22',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T22:00-06:00`,
          endTime: `${tomorrowsDateString}T05:00-06:00`,
          id: '23',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T22:00-06:00`,
          endTime: `${tomorrowsDateString}T05:00-06:00`,
          id: '24',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
          startTime: `${todaysDateString}T22:00-06:00`,
          endTime: `${tomorrowsDateString}T05:00-06:00`,
          id: '25',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
    
        },{
          title: '21+ entry',
          startTime: `${todaysDateString}T22:00-06:00`,
          endTime: `${tomorrowsDateString}T05:00-06:00`,
          id: '26',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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
          startTime: `${tomorrowsDateString}T07:00-06:00`,
          endTime: `${tomorrowsDateString}T07:30-06:00`,
          id: '27',
          area: 'Front Doors',
          areaId: 'e4b4e9a1-f7e2-4b1c-b2a5-8a94e8b45c3a',
          overflowLane: 1,
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

  // state for managing rendering based on user's interactions
  const [activeTags, set_activeTags] = useState<string[]>([value[0].area])
  const [currentActivities, set_currentActivities] = useState<AreasType>([])
  const [eventDateIntervals, set_eventDateIntervals] = useState<IntervalType[]>()

  // state for modal interactions
  const [isOpen, set_isOpen] = useState<boolean>(true)
  const [activityData, set_activityData] = useState<ActivityType | null>()

  // state for managing LiveTimeReference component
  const [displayTimeReferenceLine, set_displayTimeReferenceLine] = useState<boolean>()
  const [currentTime, set_currentTime] = useState<string>(ZonedDateTime.now().format(DateTimeFormatter.ofPattern(`yyyy-MM-dd'T'HH:mmXXX`)).toString()) 
  const [endTime, set_endTime] = useState<ZonedDateTime>()
  const [timeReferencePosition, set_timeReferencePosition] = useState('')

  
  let tags: ButtonProps[] = value?.map(({ area, colors }) => {
    return {
      name: area,
      hasIcon: false,
      background: colors.buttonBackground
    }
  })

  let areaStrings: string[] = value?.map((area) => area.area)

  const onLaneItemClick = (item: ActivityType) => {
    set_isOpen(true)
    set_activityData(item)
  }

  const onChange = (newValue: ActivityType) => {
    console.log('hey', newValue)
    set_value(prevValue => {
      const updatedAreas = prevValue.map(area => {
          if (area.areaId === newValue.areaId) {
              return {
                  ...area,
                  activities: area.activities.map(activity => {
                      if (activity.id === newValue.id) {
                          return newValue;
                      }
                      return activity;
                  }),
              };
          }
          return area;
      });
      return updatedAreas;
    });
    setTimeout(() => (set_isOpen(false)), 250)
  }

  //  set currentActivities based on activeTabs 
  useEffect(() => {
    let activeIndexedData: AreaType[] = value.filter(area => activeTags.includes(area.area));
    set_currentActivities(activeIndexedData);
  }, [activeTags, value])

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
    const regex = /PT(\d+)H/
    const match = durationTimeStamp.match(regex)

    // If the regex matched something, extract the number of hours from the capturing group
    let durationRegEx = (match && match[1]) ? match[1] : undefined

    if (durationRegEx !== undefined) {

      // determine number of days needed to render data
      let durationDaysNumber = parseInt(durationRegEx) / 24
      let durationDaysInteger = Math.ceil(durationDaysNumber)

      // create an array to represent all dates of the event
      let emptyDates = new Array(durationDaysInteger).fill([0])
      let eventDates = emptyDates.map((date, index) => {
        if (index === 0) {
          return origin.format(DateTimeFormatter.ofPattern('yyyy-MM-dd').withLocale(Locale.US))
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

        let formattedHourMinute = (index: number) => {
          let hourMinute = Math.floor(index * 15 / 60)
          let formattedHourMinute = ("0" + hourMinute).slice(-2);
      
          return formattedHourMinute
        }

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

  // determine if LiveTimeReference component should be tracked/rendered
  useEffect(() => {
    if (eventDateIntervals !== undefined) {
      
      let startTime: string = eventDateIntervals[0].value
      let parsedStartTime = ZonedDateTime.parse(startTime)

      let endTime: string = eventDateIntervals[eventDateIntervals.length - 1].value
      let parsedEndTime = ZonedDateTime.parse(endTime)

      let parsedCurrentTime = ZonedDateTime.parse(currentTime)
      let isAfterStart = parsedCurrentTime.isAfter(parsedStartTime)
      let isBeforeEnd = parsedCurrentTime.isBefore(parsedEndTime)

      if (isAfterStart && isBeforeEnd) {

        set_displayTimeReferenceLine(true)
        set_endTime(parsedEndTime)

        let currentTimeParsed = ZonedDateTime.parse(currentTime)
        let timeComparison = Duration.between(currentTimeParsed, parsedEndTime)
        let durationObject = timeComparison.plusMinutes(15)
        
        set_timeReferencePosition(`${durationObject.seconds() / 60 - 1}px`)
      }
      if (!isAfterStart || !isBeforeEnd) {
        set_timeReferencePosition(`none`)
        set_displayTimeReferenceLine(false)
      }
    }      
  }, [eventDateIntervals])

  // if LiveTimeReference is rendered, re-calculate the state being passed as props each minute
  useEffect(() => {
    if (displayTimeReferenceLine === true && endTime !== undefined) {
      let currentMoment = ZonedDateTime.now()
      let nextMinute = currentMoment.withSecond(0).withNano(0).plusMinutes(1);
      let timeout = Duration.between(currentMoment, nextMinute).toMillis();

      setTimeout(() => {
       
        let currentTimeParsed = ZonedDateTime.parse(currentTime)
        
        let timeComparison = Duration.between(currentTimeParsed, endTime)
        let durationObject = timeComparison.plusMinutes(15)
        
        set_timeReferencePosition(`${durationObject.seconds() / 60 - 1}px`)
        set_currentTime(ZonedDateTime.now().format(DateTimeFormatter.ofPattern(`yyyy-MM-dd'T'HH:mmXXX`)).toString())
       
      }, timeout)
    }
  }, [displayTimeReferenceLine, endTime, currentTime, timeReferencePosition])

  const autoScrollFirstActivity = (currentValue: AreasType): string => {
    if (currentValue.length == 0) {
      return ''
    } else {
      let allActivities = currentValue.map((area) => area.activities).flat()

      let firstActivity = allActivities.reduce((a, b) => {
        let previous = ZonedDateTime.parse(a.startTime)
        let current = ZonedDateTime.parse(b.startTime)
        let comparison = previous.isBefore(current)

        if (comparison == true) {
          return a
        }
        return b
      })

      let itemIdByIndex = eventDateIntervals?.filter((interval) => {
        let a = ZonedDateTime.parse(interval.value)
        let b = ZonedDateTime.parse(firstActivity.startTime)

        return a.isEqual(b)
      })

      if (itemIdByIndex === undefined) {
        return ''
      }
        
      return itemIdByIndex[0]?.gridNumber.toString()
    }
  }

  // initial pagescroll animation
  useEffect(() => {
    if (currentActivities !== undefined) {
      let initScrollElement: string = autoScrollFirstActivity(currentActivities)
      
      document.getElementById(initScrollElement)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [currentActivities])

  return (
    <S.Container>
      <S.TagsContainer>
        <Tags
          allTags={tags}
          initialActiveTags={tags[0].name !== undefined ? [tags[0]?.name] : ['']}
          onChange={tags => set_activeTags(tags)}
        />
      </S.TagsContainer>  
      <S.Content >
        <S.Timeline>
          {
            displayTimeReferenceLine == true
              ? <LiveTimeIndicator
                  timeReferencePosition={timeReferencePosition}
                  time={currentTime}
                />
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
                        onLaneItemClick={onLaneItemClick}
                        color={item.colors.itemText}
                        backgroundColor={item.colors.itemBackground}
                      />
                    )
                  })
                : <></>
              
            }
            
          </S.RightColumn>
        </S.Timeline>
      </S.Content>
      {
        isOpen
          ? <Modal
              isOpen={isOpen}
              onClose={() => set_isOpen(false)}
              iconPrefix={'fas'}
              title={'Edit Activity'}
              content={
                <ActivityForm
                  activity={activityData != undefined ? activityData : null} areas={areaStrings}
                  onChange={(newValue) => onChange(newValue)}
                />}
              size={'sm'}
              fullscreen
              onBack={undefined}
            />
          : <></>
      }
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
    width: calc(100% - 1rem);
    height: 2.25rem;
    padding: 0.5rem;
    z-index: 1000;
    background: var(--F_Background);
  `,
  Content: styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
`,
  Timeline: styled.div`
    position: relative;
    width: 100%;
    min-height: 100%;
    display: flex;
  `,
  DataView: styled.div`
  `,
  LeftColumn: styled.div`
    width: 3rem;
    height: 100%;
  `,
  RightColumn: styled.div`
    position: relative;
    width: calc(100% - 2rem);
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  `
}
