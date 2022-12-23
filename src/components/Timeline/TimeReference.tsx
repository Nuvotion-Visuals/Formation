import React, { useEffect } from 'react'
import styled from 'styled-components'

interface Props {
  intervals: IntervalType[]
}

interface IntervalType {
  display: string | string[],
  value: string,
  gridNumber: number
}

export const TimeReference = ({ intervals }: Props) => {

  return (
    <S.Container>
      {
        intervals.map((interval, index) => (
          interval.display.length === 2
            ? <S.Interval key={index}>
                <S.DayOfWeek>
                  {
                    interval.display[0]
                  }
                </S.DayOfWeek>
                <S.MonthDay>
                  {
                    interval.display[1]
                  }
                </S.MonthDay>
              </S.Interval>
            : <S.Interval key={index}>
                <S.Hour>
                  {interval.display}
                </S.Hour>
              </S.Interval>
            ))
      }
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    position: relative;
    width: 100%;
    min-height: 100%;
    z-index: 1000;
    background: var(--F_Activity_Backdrop);
  `,
  Interval: styled.div<{}>`
    width: 100%;
    font-size: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    height: 15px;
    overflow-x: visible;
  `,
  DayOfWeek: styled.div<{}>`
    width: 100%;
    height: 0.8rem;
    text-align: center;
    font-weight: 800;
    font-size: 0.8rem;
    letter-spacing: 1.1px;
    background: var(--F_Backdrop);
    color: white;
    padding-top: 0.2rem;
  `,
  MonthDay: styled.div<{}>`
    width: 100%;
    height: 0.8rem;
    text-align: center;
    letter-spacing: 0.3px;
    font-size: 0.8rem;
    z-index: 200;
    background: var(--F_Backdrop);
    color: white;
    padding-bottom: 0.2rem;
  `,
  Hour: styled.div<{}>`
    position: relative;
    top: -0.6rem;
    width: 100%;
    text-align: center;
    font-weight: 200;
    font-size: 0.8rem;
    letter-spacing: 0.8px;
  `
}
