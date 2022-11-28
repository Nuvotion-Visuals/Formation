import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import '@js-joda/timezone'
import { ActivityType } from 'types'

interface Props {
  value: ActivityType[],
  areaIndex: number,
  onChange: (time: any) => void,
  onIntervalClick: (interval: IntervalType) => void,
  onItemClick: (e: React.MouseEvent) => void,
  activeArea: number
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

export const Timeline = ({ value, onChange, onIntervalClick, onItemClick }: Props) => {

  const [columnCount, set_columnCount] = useState<number>(1)
  const [renderItems, set_renderItems] = useState<ActivityTimeStampType[]>()
  

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

  let currentActivityTimeStamps: ActivityTimeStampsType = value?.map((activity) => {
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

  // sort activites by start time. critical for calculateOverflowLanes to function properly
  let activitiesByTimeStamp = currentActivityTimeStamps?.sort((a, b) => a.startInteger - b.startInteger)

  const calculateOverflowLanes = (activitiesByTimeStamp: ActivityTimeStampsType) => {
    let isConflicted: boolean | null = null
    let isEmptyArray: boolean | null = null
    let laneRecord: ActivityTimeStampType[][] = [[]]

    activitiesByTimeStamp?.forEach((activity, index) => {
      
      if (index === 0) {
        activity.overflowLane = 1
        laneRecord[0].push(activity)
        laneRecord.push([])
        return
      } 

      for (let i = 0; i < laneRecord.length; i++){
        let lane = laneRecord[i]
        let laneIndex = i + 1
        
        if (lane.length === 0) {
          isEmptyArray = true
        } else if (activity.isPlaced === true) {
          break
        } else {
          isEmptyArray = false
        }

        for (let i = lane.length - 1; i > -1; i--){
          let singleLane = lane[i]
          const isStartTimeConflict = singleLane.startInteger < activity.startInteger && activity.startInteger < singleLane.endInteger
          const isEndTimeConflict = singleLane.startTime < activity.endTime && activity.endTime < singleLane.endTime
          const isStartTimeIdentical = singleLane.startTime === activity.startTime
          
          if (isStartTimeConflict || isEndTimeConflict || isStartTimeIdentical) {
            isConflicted = true
            break
          }

          else if (activity.isPlaced === true) {
            break
          }
          else {
            isConflicted = false
          }
        }

        if (!isConflicted)
        {
          if (!isEmptyArray) {
            activity.overflowLane = laneIndex
            activity.isPlaced = true
            laneRecord[i]?.push(activity)
          }
        }
        
        else if (isEmptyArray)
        
        {
          let newLane: any = []
          laneRecord.push(newLane)

          if (!activity.isPlaced) {
            laneRecord[i]?.push(activity)
            activity.overflowLane = laneIndex
          }
          
          activity.isPlaced = true
          isConflicted = false
          isEmptyArray = false
        } 
      }
    })

    if (laneRecord !== undefined) {

      let filteredRecord = laneRecord.filter(item => {
        if (item.length === 0) {
          return false
        }
        return true
      })
      laneRecord = filteredRecord
    }

    set_columnCount(laneRecord.length)
    set_renderItems(activitiesByTimeStamp)
  }

  useEffect(() => {
    calculateOverflowLanes(activitiesByTimeStamp)
  }, [value]) 

  const autoScrollFirstActivity = (value: ActivityType[]): string => {
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

  // match time string to interval value of type number, use this to calculate gridRow
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
  
  // initial pagescroll animation
  useEffect(() => {
    if (value !== undefined) {
      let initScrollElement: string = autoScrollFirstActivity(value)
      document.getElementById(initScrollElement)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [JSON.stringify(value)])

  return (
    <S.Container>
      <S.Grid columnCount={columnCount}>
          {
            renderItems !== undefined
              ? renderItems.map((activity, index) => 
                  <S.Activity
                    key={index}
                    onClick={(e) => onItemClick(e)}
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

      <S.TimeStampContainer>
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
      </S.TimeStampContainer>
         
      <S.IntervalContainer>
        {
        
        intervals.map((interval, index) =>
          
          <S.IntervalBlock
            key={index}
            id={index.toString()}
            value={interval.value}
            onClick={() => onIntervalClick(interval)}
            style={{ gridColumnStart: 2, gridColumnEnd: columnCount + 2, gridRowStart: index === 0 ? 1 : index + 1 }}
              />
            )
        }  
     
      </S.IntervalContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    /* position: relative; */
    width: 100%;
    overflow-x: auto;
    background: var(--F_Activity_Backdrop);
  `,
  Grid: styled.div<{
    columnCount: number
  }>`
    position: relative;
    width: 100%;
    height: 127rem;
    display: grid;
    grid-template-columns: ${props => `3rem repeat(${props.columnCount}, 4rem)`};
    grid-template-rows: repeat(113, 15px);
    column-gap: 1px;
  `,
  IntervalContainer: styled.div<{}>`
    position: absolute;
    top: 0;
    width: 100%;
  `,
  TimeStampContainer: styled.div<{}>`
    position: absolute;
    top: 0;
    width: 3rem;
    height: 100%;
    background: var(--F_Activity_Backdrop);
    z-index: 200;
  `,
  TimeDisplay: styled.div<{}>`
    width: 100%;
    font-size: var(--F_Font_Size_Label);
    height: 15px;
    display: flex;
    justify-content: flex-end;

    :nth-child(1){
      display: none;
    }
  `,
  TimeSpan: styled.div<{}>`
    padding-right: 0.5rem;
    margin-top: 0.4rem;
  `,  
  IntervalBlock: styled.div<{
    value: string
  }>`
    box-sizing: border-box;
    min-width: 100%;
    height: 15px;
    z-index: 1;
    line-height: 0;
    :nth-child(1n+1) {
      
      border-bottom: 1px solid #e7e7e7;
    }
    :nth-Child(2n+2) {
      border-bottom: 1px solid #d7d7d7;
    }
  `,
  Activity: styled.div<{}>`
    min-width: 4rem;
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
    overflow-y: hidden;
  `
}