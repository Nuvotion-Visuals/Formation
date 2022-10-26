import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateTimeFormatter, use, ZonedDateTime } from '@js-joda/core'
import '@js-joda/timezone'
import { ActivityType } from 'types'
import { times } from 'lodash'
import { act } from 'react-dom/test-utils'

interface Props {
  value: ActivityType[],
  areaIndex: number,
  onChange: (time: any) => void,
  onClick: (e: React.MouseEvent) => void
}

interface IntervalType {
  display: string,
  value: string,
  gridNumber: number
}

interface ActivityTimeStampType {
  title: string,
  startTime: string,
  endTime: string,
  startInteger: number, 
  endInteger: number,
  id: string,
  overflowLane: number
}

type ActivityTimeStampsType = ActivityTimeStampType[]

export const IntervalSurface = ({ value, onChange, onClick }: Props) => {
  const [collisions, set_collisions] = useState<ActivityTimeStampType[][]>()
  const [columnCount, set_columnCount] = useState<number>(1)
  const [columnString, set_columnString] = useState('')
  const [items, set_items] =  useState<ActivityTimeStampType[]>()

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

  const currentActivityTimeStamps: ActivityTimeStampsType = value.map((activity) => {
    let startTime = ZonedDateTime.parse(activity?.startTime)
    let endTime = ZonedDateTime.parse(activity?.endTime)

    let formattedStartTime = startTime.format(DateTimeFormatter.ofPattern('HHmm'))
    let formattedEndTime = endTime.format(DateTimeFormatter.ofPattern('HHmm'))

    return {
      "title": activity.title,
      "startTime": activity.startTime,
      "endTime": activity.endTime,
      "startInteger": parseInt(formattedStartTime),
      "endInteger": parseInt(formattedEndTime),
      "id": activity.id,
      "overflowLane": 1
    }
  })

  let activitiesByTimeStamp = currentActivityTimeStamps.sort((a, b) => a.startInteger - b.startInteger)

  const getActivityById = (id: string): ActivityTimeStampType | null => {
    let activity = null

    currentActivityTimeStamps.forEach((item) => {
      if (id === item.id) {
        activity = item
      }
    })

    return activity
  }

  const getComparisonActivitiesById = (activitiesByTimeStamp: ActivityTimeStampsType) => {
    let comparedIds: string[][] = []

    activitiesByTimeStamp.forEach((activity) => { 
      activitiesByTimeStamp.forEach((comparisonActivity, i) => {
        let alreadyCompared = false

        comparedIds.forEach((ids, index) => {
          if (ids.includes(activity.id) && ids.includes(comparisonActivity.id)) {
            alreadyCompared = true
          }
        })

        if (!alreadyCompared) {
          if (activity.id !== comparisonActivity.id) {
            comparedIds.push([activity.id, comparisonActivity.id])
          }
        }
      })
    })

    return comparedIds
  }

  useEffect(() => {
    const comparisonActivitiesById = getComparisonActivitiesById(activitiesByTimeStamp)
    let collisions: ActivityTimeStampType[][] = []

    comparisonActivitiesById.forEach((comparisonIds) => {
      const id1 = comparisonIds[0]
      const id2 = comparisonIds[1]

      const activity = getActivityById(id1)
      const comparisonActivity = getActivityById(id2)
      
      if (activity !== null && comparisonActivity !== null) {
        const isStartTimeConflict = comparisonActivity.startTime < activity.startTime && activity.startTime < comparisonActivity.endTime
        const isEndTimeConflict = comparisonActivity.startTime < activity.endTime && activity.endTime < comparisonActivity.endTime
      
        if (isStartTimeConflict || isEndTimeConflict) {
          let collision = [activity, comparisonActivity]
          collisions.push(collision)
        } 
      }
    })

    calculateOverflowLanes(activitiesByTimeStamp, collisions)

    let x = Math.max(...activitiesByTimeStamp.map(activity => activity.overflowLane))
    set_columnCount(x)
    console.log(activitiesByTimeStamp, "ACTIVITIES BY TIMESTAMP")

  }, [activitiesByTimeStamp]) 

  const calculateOverflowLanes = (activitiesByTimeStamp: ActivityTimeStampsType, collisions: ActivityTimeStampType[][])=> {

    activitiesByTimeStamp.forEach((activity, index) => {
      if (index === 0) {
        activitiesByTimeStamp[0] = {
          ...activitiesByTimeStamp[0],
          "overflowLane": 1
        }
      } else {

        collisions.forEach((collision) => {
          if (collision[1].id === activity.id) {

            if (activity.overflowLane <= collision[0].overflowLane) {
              activity.overflowLane = collision[0].overflowLane + 1
            }
          }
        })
      }
    })
    set_items(activitiesByTimeStamp)
  }

  useEffect(() => {
    set_columnString(`3rem repeat(${columnCount}, 1fr)`)
  }, [columnCount])

  const getFirstActivity = (value: ActivityType[]): string => {
    if (value !== undefined) {
      let firstActivityStartTime = value.reduce((prev, curr) => prev.startTime < curr.startTime ? prev : curr).startTime
  
      let firstActivityGridPosition = renderRow(firstActivityStartTime)
      
      if (firstActivityGridPosition) {
        return (firstActivityGridPosition - 5).toString()
      }
      return '6'
    }  
    return '6'
  }

  const renderRow = (time: string) => {
    let parsedHour: string = ZonedDateTime.parse(time).format(DateTimeFormatter.ofPattern('HH:mm'))

    if (parsedHour.charAt(0) === '0') {
      let zerolessParsedHour = parsedHour.substring(1)
      let gridObject = intervals.filter(interval => interval.value === zerolessParsedHour)

      return gridObject[0]?.gridNumber + 1
    }
    const gridObject = intervals.filter(interval => interval.value === parsedHour)

    return gridObject[0]?.gridNumber + 1
  }

  const handleClick = (interval: IntervalType, value: any) => {
    
    if (value !== undefined) {
      const a = value[0]?.startTime
      const b = ZonedDateTime.parse(a)
      const datePrefix = b.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
      const offSet = b.format(DateTimeFormatter.ofPattern('x:00'))
      const timeZone = b.format(DateTimeFormatter.ofPattern('VV'))

      const parsedTime: string = ZonedDateTime.parse(`${datePrefix}T${interval.value}:00.000${offSet}[${timeZone}]`, DateTimeFormatter.ISO_ZONED_DATE_TIME).toString()
      
      onChange(parsedTime)
    }
    return
  }

  useEffect(() => {
    if (value !== undefined) {
      let initScrollElement: string = getFirstActivity(value)
      document.getElementById(initScrollElement)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [JSON.stringify(value)])

  return (
    <S.Container>
      <S.Grid columnString={columnString}>
          {
            intervals.map((interval, index) => 
              <S.TimeDisplay
                key={index}
                style={{ gridColumnStart: 1, gridRowStart: index + 1}}>
                  <S.TimeSpan>
                    {interval.display}
                  </S.TimeSpan>
                </S.TimeDisplay>
              )
          }
          {
            intervals.map((interval, index) => 
                <S.IntervalBlock
                  key={index}
                  id={index.toString()}
                  onClick={() => handleClick(interval, value)}
                  style={{ gridColumnStart: 2, gridColumnEnd: 6, gridRowStart: index === 0 ? 1 : index + 1 }}
                />
              )
          }    
        {
          items !== undefined
            ? items.map((activity, index) => 
                <S.Activity
                  key={index}
                  onClick={(e) => onClick(e)}
                  id={activity.id}
                  style={{
                    gridColumnStart: activity.overflowLane + 1,
                    gridColumnEnd: activity.overflowLane + 2,
                    gridRowStart: renderRow(activity?.startTime),
                    gridRowEnd: renderRow(activity?.endTime)
                  }}>
                {activity.title}
                </S.Activity>
              )
            : <></>
            
        }
      </S.Grid>
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    width: 100%;
    background: var(--F_Activity_Backdrop);
  `,
  Grid: styled.div<{
    columnString: string
  }>`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: ${props => props.columnString};
    grid-template-rows: repeat(113, 1fr);
    row-gap: 1px;
    column-gap: 1px;
  `,
  TimeDisplay: styled.div<{}>`
    width: 3rem;
    font-size: var(--F_Font_Size_Label);
    height: 1rem;
    margin-top: -1.5rem;
    display: flex;
    justify-content: flex-end;
  `,
  TimeSpan: styled.div<{}>`
    padding-right: 0.5rem;
    padding-top: 1rem;
  `,  
  IntervalBlock: styled.div<{}>`
    width: 100%;
    height: 1rem;
    z-index: 1;

    :nth-child(1n+1) {
      border-bottom: 1px solid #d6d6d6;
    }
    :nth-Child(2n+2) {
      border-bottom: 1px solid #b9b9b9;
    }
  `,
  Activity: styled.div<{}>`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--F_Label_Light_Background_Blue);
    color: var(--F_Label_Background_Blue);
    font-size: 12px;
    padding: 0.15rem;
    z-index: 100;
    border-radius: 0.25rem;
  `
}


  // const calculateColumnCount = (timeStamps: TimeStampType[]) => {

  //   // create array of all activities which conflict
    // let activityConflicts = timeStamps.map((activity) => {

    //   for (let i = 0; i <= timeStamps.length - 1; i++){
    //     let item = timeStamps[i]
    //     if (item.startTime < activity.startTime && activity.startTime < item.endTime) {

    //       return activity
    //     } else if (item.startTime > activity.startTime && activity.endTime > item.startTime) {
          
    //       return activity
    //     }
    //   }
    // })

  //   // create array which holds all conflicted activities which conflict with each other
  //   // for use in generating required grid columns
  //   let filteredConflicts = activityConflicts.filter((activity) => {

  //     for (let i = 0; i < activityConflicts.length; i++){
  //       let item = activityConflicts[i]
  //       if (item !== undefined && activity !== undefined) {
  //         if (item.startTime === activity.startTime && item.endTime === activity.endTime) {
  //           return
  //         } else if (item.startTime <= activity.startTime && activity.startTime < item.endTime) {
            
  //           return activity
  //         }
  //       }
          

  //     }
  //   })

  //   console.log(filteredConflicts.length.toString(), "!")
  //   set_columnCount(filteredConflicts.length.toString())
  //   return
  // }

  // const renderColumn = (activity: ActivityType, timeStamps: TimeStampType[]) => {
  //   if (activity !== undefined && timeStamps !== undefined) {
  //     let activityStart: number = parseInt(ZonedDateTime.parse(activity.startTime).format(DateTimeFormatter.ofPattern('HHmm')))
  //     let activityEnd: number = parseInt(ZonedDateTime.parse(activity.endTime).format(DateTimeFormatter.ofPattern('HHmm')))

  //     let comparableItems = timeStamps.map((item) => {
        
  //       if (activityStart !== item.startTime && activityEnd !== item.endTime) {
  //         if (activityStart < item.startTime && activityEnd < item.startTime) {
  //           item.columnGrid = 2

  //           return 2
  //         }
  //         if (activityStart < item.startTime && activityEnd > item.startTime) {
  //           item.columnGrid = 2
  //           return 2
  //         } else if (activityStart > item.startTime && activityStart < item.endTime && item.columnGrid === 0) {
  //           return 3
  //         } else if (activityStart > item.startTime && activityStart < item.endTime && item.columnGrid === 2) {
  //           return 3
  //         }
  //       }
  //     })

  //     let z = comparableItems.filter((item) => item !== undefined)[0]

  //     console.log(comparableItems, "COMP ITEMS -----")
  //     console.log(z, "<<Z>>")

      
        
  //     return z
        
  //   }
  //   return 2
  //
  // }
  
   // let d = ZonedDateTime.parse(activity?.startTime)
          // let formattedTime = d.format(DateTimeFormatter.ofPattern('HHmm'))

          // let x = filteredConflicts[filteredConflicts.length - 1].length
          // let y = filteredConflicts[filteredConflicts.length - 1][x - 1]
          // let z = filteredConflicts[0][0]

          // console.log(x, "x",y, "y", z, "z")

          // if (y?.startTime > z?.endTime && y.id === activity.id) {
              
          //   let newCount = i + 1

          //   if (parseInt(columnCount) < newCount) {
          //     set_columnCount((newCount).toString())
          //   }

          //   return i + 1

          // }
          // for (let i = 0; i < filteredConflicts.length; i++){
          //   let comparisonObject = filteredConflicts[i]
      
          //   for (let i = 0; i < comparisonObject.length; i++){
          //     let nestedLevel = comparisonObject[i]
      
      
          //     if (nestedLevel.id === activity.id) {
               
          //       let newCount = i + 1
      
          //       if (parseInt(columnCount) < newCount) {  
          //         set_columnCount((newCount).toString())
          //       }
      
          //       return 2
          //     }
          //   }
          // }
          // return 2