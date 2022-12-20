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

export const TimeReference = ({intervals}: Props) => {

  return (
    <S.Container>
      {
        intervals.map((interval, index) => (
          <S.Interval key={index}>
            {
              interval.display
            }
          </S.Interval>))
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
    display: flex;
    height: 15px;
    text-align: center;
  `
}
