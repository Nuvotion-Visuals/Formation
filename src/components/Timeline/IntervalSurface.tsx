import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import '@js-joda/timezone'
import { ActivityType } from 'types'

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
  overflowLane: number,
  isPlaced: boolean
}

type ActivityTimeStampsType = ActivityTimeStampType[]

export const IntervalSurface = ({ value, onChange, onClick }: Props) => {
  const [columnCount, set_columnCount] = useState<number>(1)
  const [columnString, set_columnString] = useState('')
  const [renderItems, set_renderItems] =  useState<ActivityTimeStampType[]>()

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
      "overflowLane": 1,
      "isPlaced": false
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
    calculateOverflowLanes(activitiesByTimeStamp)

  }, [value]) 

  const calculateOverflowLanes = (activitiesByTimeStamp: ActivityTimeStampsType) => {
    
    let laneRecord: ActivityTimeStampType[][] = [[]]

    // []  [ [0],[1],[2], etc... ]

    activitiesByTimeStamp.forEach((activity, index) => {
      if (index === 0) {
        // seed index 0 of array (overflow lane 1)

        laneRecord[0].push(activity)
        console.log("PUSHED INIT:", activity.title)
        
        return
      }
      
      else
      
      {

        for (let i = 0; i < laneRecord.length; i++){
          const singleLane = laneRecord[i]
          let a = 0;

          for (let i = 0; i < singleLane.length; i++){
            const isStartTimeConflict = singleLane[i].startInteger < activity.startInteger && activity.startInteger < singleLane[i].endInteger
            const isEndTimeConflict = singleLane[i].startTime < activity.endTime && activity.endTime < singleLane[i].endTime
            // const isNotConflicted = singleLane[i].startInteger < activity.startInteger && activity.startInteger > singleLane[i].endInteger
            
            
            console.log("ACTIVITY:", activity.title)
            console.log("singleLane:", singleLane[i])

            if (activity.isPlaced === true) {
              console.log("ALREADY PLACED")
              console.log("----------------------------")
              return
            }

            else if (singleLane[i].id === activity.id) {
              console.log("NO COMPARISON NEEDED")
              console.log("----------------------------")
              return
            }
            
            if (isStartTimeConflict || isEndTimeConflict) {
              a = a + 1
              
              console.log("PUSHED WITH CONFLICT:", laneRecord[i + 1])
              console.log("----------------------------")
            }

            else
            
            {
              console.log("NOT CONFLICTED and ISNT CONFLICTED, PUSHED", laneRecord[i])  
              console.log("----------------------------")
              
              a = 0
            }            
          }

          if (a === 0) {
            activity.isPlaced = true
              laneRecord[i].push(activity)
          } else if (a === 1) {
            let newLane: any = []
              laneRecord.push(newLane)
              activity.isPlaced = true
            laneRecord[i + 1].push(activity)
          }
        }

        // console.log("EVERY", activity.title, placedActivity)
        // console.log("VARS", isStartConflicted, isEndConflicted, isNotConflicted)
        // activity.isPlaced = true
        // laneRecord[i+1].push(activity)

        // laneRecord.forEach((placedActivity) => {
        //   const isStartTimeConflict = placedActivity.startInteger < activity.startInteger && activity.startInteger < placedActivity.endInteger
        //   const isEndTimeConflict = placedActivity.startTime < activity.endTime && activity.endTime < placedActivity.endTime
        //   const isNotConflicted = placedActivity.startInteger < activity.startInteger && activity.startInteger > placedActivity.endInteger

        //   console.log("FOR EACH OVERFLOW", placedActivity.title, activity.title, "START CONLICT:" , isStartTimeConflict, "END CONFLICT:", isEndTimeConflict, laneRecord)


        //   if (isStartTimeConflict || isEndTimeConflict) {
            
        //     if (laneRecord.some(item => item.id === activity.id)) {
        //       console.log("SOME RETuRNS TRUE NO1", placedActivity, activity)

        //       return 
        //     }
            
        //     console.log("PUSHED", activity.title, "PUSHED - CONFLICT")
        //       // activity.overflowLane = placedActivity.overflowLane + 1
        //       // laneRecord.push(activity)
            
        //   }
          
        //   else if (isNotConflicted)
          
        //   {
        //     console.log("PUSHED", activity.title, "PUSHED - NO CONFLICT")
        //       // activity.overflowLane = placedActivity.overflowLane
        //       // laneRecord.push(activity)
   
        //   } 

        // })
        
      }
      
    
      
      // let maxLaneCount = Math.max(...laneRecord.map(activity => activity.overflowLane))
      // set_columnCount(maxLaneCount)
    })
    console.log("----", laneRecord, "----")
    set_renderItems(activitiesByTimeStamp)
  }

  useEffect(() => {
    set_columnString(`3rem repeat(${columnCount}, 1fr)`)
    console.log(columnCount, "COUNT")
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
          renderItems !== undefined
            ? renderItems.map((activity, index) => 
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