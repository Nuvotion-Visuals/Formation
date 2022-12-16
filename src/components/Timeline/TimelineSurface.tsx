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

export const TimelineSurface = ({intervals}: Props) => {

  return (
    <S.Container>
      {
        intervals.map((item, index) => <S.Interval />)
      }
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    position: absolute;
    top: 0;
    width: 100%;
  `,
  Interval: styled.div<{}>`
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
  `
}
