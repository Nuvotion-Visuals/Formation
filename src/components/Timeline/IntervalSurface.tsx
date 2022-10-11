import React, { useEffect } from 'react'
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

export const IntervalSurface = ({ value, onChange, onClick }: Props) => {

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
      <S.Grid>
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
            value.map((activity, index) => 
              <S.Activity
                key={index}
                onClick={(e) => onClick(e)}
                id={activity.id}
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
    grid-template-columns: 3rem repeat(1,1fr) 2rem;
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
