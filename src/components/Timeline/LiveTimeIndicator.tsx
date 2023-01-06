import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'

interface Props {
  timeReferencePosition?: string,
  time?: string,
  color?: string,
}

export const LiveTimeIndicator = ({ timeReferencePosition, time, color }: Props) => {

  if (time === undefined) {
    return null
  }

  let parsedTime = ZonedDateTime.parse(time)
  let formattedTime = parsedTime.format(DateTimeFormatter.ofPattern(`K:mm`))

  return (
    <S.Container
      timeReferencePosition={timeReferencePosition}
    >
      <S.OverlayLine color={color} />
      <S.Time color={color}>{formattedTime}</S.Time>
    </S.Container>
  )
}


const S = {
  Container: styled.div<{
    timeReferencePosition?: string | undefined,
    color?: string
  }>`
    position: absolute;
    bottom: ${props => props.timeReferencePosition !== undefined ? props.timeReferencePosition : ''};
    width: 100%;
    height: 0.35rem;
    z-index: 500;
  `,
  Time: styled.div<{
    color?: string
  }>`
    background: ${props => props.color ? props.color : '#d18383'};
    width: 3rem;
    height: 0.75rem;
    position: absolute;
    border-radius: 0.5rem;
    color: #5d2a2a;
    text-align: center;
    font-weight: 400;
    font-size: 0.75rem;
  `,
  OverlayLine: styled.div<{
    color?: string
  }>`
    position: absolute;
    bottom: 0;
    background: ${props => props.color ? props.color : '#ff9696'};
    height: 1px;
    width: 100%;
  `
}