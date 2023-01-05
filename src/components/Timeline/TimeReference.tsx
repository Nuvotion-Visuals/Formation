import { Box } from '../../internal'
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
    <S.Container className={'help'}>
      {
        intervals.map((interval, index) => (
          interval.display.length === 2
      
            ? 
              <S.DateDisplay>
                <S.Interval key={index}>
                 
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
              </S.DateDisplay>
              
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
    z-index: 400;
    background: var(--F_Activity_Backdrop);
  `,
  Interval: styled.div<{}>`
    position: relative;
    width: 100%;
    height: 15px;
    font-size: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    overflow-x: visible;
    transform-origin: 0 12px;
  `,
  DateContainer: styled.div`
    postion: relative;
    background: red;
    height: 100%;
    width: 100%;
  `,
  DateDisplay: styled.div`
    postion: relative;
  `,
  DayOfWeek: styled.div<{}>`
    position: absolute;
    top: -1rem;
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
    background: var(--F_Backdrop);
    color: white;
    padding-bottom: 0.2rem;
  `,
  Hour: styled.div<{}>`
    position: absolute;
    top: -0.4rem;
    /* line-height: 1.75rem; */
    width: 100%;
    text-align: center;
    font-weight: 200;
    font-size: 0.8rem;
    letter-spacing: 0.8px;
  `
}
