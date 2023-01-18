import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import '@js-joda/timezone'

import { ActivityType, PersonType } from './Timeline.stories'

export interface Props {
  value: ActivityType[],
  intervals: IntervalType[],
  onChange: (time: any) => void,
  onIntervalClick: (interval: IntervalType) => void,
  onLaneItemClick: (item: ActivityType) => void,
  color: string,
  backgroundColor: string
}

interface IntervalType {
  display: string | string[],
  value: string,
  gridNumber: number
}

interface ItemTimeStampType {
  title: string,
  startTime: ZonedDateTime,
  endTime: ZonedDateTime,
  id: string,
  area: string,
  areaId: string,
  overflowLane: number,
  isPlaced: boolean,
  people: PersonType[]
}

type ItemTimeStampsType = ItemTimeStampType[]

export const Timeline = ({ value, intervals, onChange,  onIntervalClick, onLaneItemClick, color, backgroundColor }: Props) => {

  const [columnCount, set_columnCount] = useState<number>(1)
  const [renderItems, set_renderItems] = useState<ActivityType[]>()

  let currentItemTimeStamps: ItemTimeStampsType = value?.map((item) => {
    let startTime = ZonedDateTime.parse(item?.startTime)
    let endTime = ZonedDateTime.parse(item?.endTime)

    return {
      "title": item.title,
      "startTime": startTime,
      "endTime": endTime,
      "id": item.id,
      "area": item.area,
      "areaId": item.areaId,
      "overflowLane": 1,
      "isPlaced": false,
      "people": item.people !== undefined ? item.people : []
    }
  })

  // sort activites by start time. critical for calculateOverflowLanes to function properly
  let itemsByTimeStamp = currentItemTimeStamps?.sort((a, b) => {
    let x = a.startTime.isBefore(b.startTime)

    return x === true ? -1 : 1
  })

  const calculateOverflowLanes = (itemsByTimeStamp: ItemTimeStampsType) => {

    let isConflicted: boolean | null = null
    let isEmptyArray: boolean | null = null
    let laneRecord: ItemTimeStampType[][] = [[]]

    itemsByTimeStamp?.forEach((item, index) => {
      if (index === 0) {
        item.overflowLane = 1
        laneRecord[0].push(item)
        laneRecord.push([])
        return
      } 

      for (let i = 0; i < laneRecord.length; i++){
        let lane = laneRecord[i]
        let laneIndex = i + 1
        
        if (lane.length === 0) {
          isEmptyArray = true
        } else if (item.isPlaced === true) {
          break
        } else {
          isEmptyArray = false
        }

        for (let i = lane.length - 1; i > -1; i--){
          let singleLane = lane[i]
          
          const isStartTimeConflict = singleLane.startTime.isBefore(item.startTime) && item.startTime.isBefore(singleLane.endTime)
          const isEndTimeConflict = singleLane.startTime.isBefore(item.endTime)&& item.endTime.isBefore(singleLane.endTime)
          const isStartTimeIdentical = singleLane.startTime.isEqual(item.startTime)
          
          if (isStartTimeConflict || isEndTimeConflict || isStartTimeIdentical) {
            isConflicted = true
            break
          }

          else if (item.isPlaced === true) {
            break
          }
          else {
            isConflicted = false
          }
        }

        if (!isConflicted)
        {
          if (!isEmptyArray) {
            item.overflowLane = laneIndex
            item.isPlaced = true
            laneRecord[i]?.push(item)
          }
        }
        
        else if (isEmptyArray)
        
        {
          let newLane: any = []
          laneRecord.push(newLane)

          if (!item.isPlaced) {
            laneRecord[i]?.push(item)
            item.overflowLane = laneIndex
          }
          
          item.isPlaced = true
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

    let activityItemsByTimeStamp = itemsByTimeStamp.map((item) => {
      return {
        title: item.title,
        startTime: item.startTime.toString(),
        endTime: item.endTime.toString(),
        id: item.id,
        area: item.area,
        areaId: item.areaId,
        people: item.people,
        overflowLane: item.overflowLane
      }
    })

    set_columnCount(laneRecord.length)
    set_renderItems(activityItemsByTimeStamp)
  }

  useEffect(() => {
    calculateOverflowLanes(itemsByTimeStamp)
  }, [value]) 

  // match time string to interval value of type number, use this to calculate gridRow
  const renderRow = (time: string) => {
    const gridObject = intervals.filter(interval => interval.value === time)

    return gridObject[0]?.gridNumber + 1
  }

  return (
    <S.Container >
      <S.Grid columnCount={columnCount} rowCount={intervals.length}>
          {
            renderItems !== undefined
              ? renderItems.map((item, index) => 
                  <S.Item
                    key={index}
                    id={item.id}
                    onClick={() => onLaneItemClick(item)}
                    style={{
                      gridColumnStart: item.overflowLane,
                      gridColumnEnd: item.overflowLane,
                      gridRowStart: renderRow(item?.startTime.toString()),
                      gridRowEnd: renderRow(item?.endTime.toString())
                    }}
                  
                >
                  <S.Fill
                    color={color}
                    backgroundColor={backgroundColor}
                  >
                    {item.title}
                  </S.Fill>
                  </S.Item>
                )
              : <></>   
          }
      </S.Grid>
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    position: relative;
    width: fit-content;
    padding-right: 1px;
  `,
  Grid: styled.div<{
    columnCount: number,
    rowCount: number
  }>`
    position: relative;
    width: 100%;
    min-width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columnCount}, 6rem)`};
    grid-template-rows: ${props => `repeat(${props.rowCount}, 15px)`};
    column-gap: 1px;
  `,
  IntervalContainer: styled.div<{}>`
    position: absolute;
    top: 50;
    width: 100%;
  `, 
  IntervalBlock: styled.div<{
    value: string
  }>`
    box-sizing: border-box;
    width: 100%;
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
  Item: styled.div<{
    backgroundColor?: string,
  }>`
    min-width: 3rem;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 12px;
    z-index: 100;
    overflow-y: hidden;
  `,
  Fill: styled.div<{
    color: string,
    backgroundColor: string
  }>`
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem - 3px);
    margin: 0.125rem 0;
    background: ${props => props.backgroundColor ? props.backgroundColor : 'blue'};
    color: ${props => props.color ? props.color : 'lightblue'};
    border-radius: 0.25rem;
    padding: 0.25rem;

  `
}