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
        intervals.map((item, index) => <S.Interval>{item.display}</S.Interval>)
      }
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    width: 100%;
    min-height: 100%;
  `,
  Interval: styled.div<{}>`
    width: 100%;
    height: 15px;
    text-align: center;
  `
}
