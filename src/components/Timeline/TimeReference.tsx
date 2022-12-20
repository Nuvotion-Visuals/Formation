import React, { useEffect } from 'react'
import styled from 'styled-components'

interface Props {
  intervals: IntervalType[]
}

interface IntervalType {
  display: string,
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
    height: 1rem;
    text-align: center;
    font-weight: 800;
    letter-spacing: 1.1px;
    background: var(--F_Backdrop);
    color: white;
    padding: 0.25rem 0;
  `,
  MonthDay: styled.div<{}>`
    width: 100%;
    height: 1rem;
    text-align: center;
    letter-spacing: 0.3px;
    z-index: 200;
    background: var(--F_Backdrop);
    color: white;
  `,
  Hour: styled.div<{}>`
    position: relative;
    /* top: -0.6rem; */
    width: 100%;
    text-align: center;
    font-weight: 200;
    letter-spacing: 0.8px;
  `
}
