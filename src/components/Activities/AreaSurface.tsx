import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ActivityType, AreaType } from 'types'

interface Props {
  value: AreaType[],
  areaIndex: number,
  onChange: (time: any) => void
}

interface IntervalType {
  display: string,
  value: number,
  gridNumber: number
}

export const AreaSurface = ({ value, areaIndex, onChange }: Props) => {

  const intervals: IntervalType[] = new Array(112).fill(0).map((item, index) => (
    {
      display:
        (index * 15) % 60 === 0
          ? ((index * 15) / 60) > 12
            ? `${((index * 15) / 60) - 12}pm`
            : `${(index * 15) / 60}am`
          : ''
      ,
      value: index * 15,
      gridNumber: index
    }
  ))
  let activities = value[areaIndex].activities

  const getFirstActivity = (activities: ActivityType[]): string => {
    if (activities !== undefined) {
      let firstActivityStartTime = activities.reduce((prev, curr) => prev.startTime < curr.startTime ? prev : curr).startTime
  
      let firstActivityGridPosition = renderRow(firstActivityStartTime)
      
      if (firstActivityGridPosition) {
        return (firstActivityGridPosition - 5).toString()
      }
      return '6'
    }  
    return '6'
  }

  const renderRow = (time: number) => {
    const gridObject = intervals.filter(interval => interval.value === time)
    return gridObject[0].gridNumber + 1
  }

  const handleClick = (interval: []) => {
    onChange(interval)
  }

  useEffect(() => {
    if (activities !== undefined) {
      let initScrollElement: string = getFirstActivity(activities)
      document.getElementById(initScrollElement)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [activities])

  return (
    <S.Container>
      <S.Grid>
          {
            intervals.map((interval, index) => 
                <S.TimeDisplay key={index} style={{ gridColumnStart: 1, gridRowStart: index == 0 ? 1 : index + 1 }}>
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
                  onClick={() => handleClick(interval)}
                  style={{ gridColumnStart: 2, gridColumnEnd: 6, gridRowStart: index === 0 ? 1 : index + 1 }}
                />
              )
          }    
          {
            activities.map((activity, index) => 
              <S.Activity
                key={index}
                onClick={() => console.log(activity, '<<ACTIVITY ONCLICK>>')}
                style={{
                  gridColumnStart: 2,
                  gridColumnEnd: 3,
                  gridRowStart: renderRow(activity?.startTime),
                  gridRowEnd: renderRow(activity?.endTime)
                }}>
                {activity.title}
              </S.Activity>
            )
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
  Grid: styled.div<{}>`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 3rem repeat(1,1fr);
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
