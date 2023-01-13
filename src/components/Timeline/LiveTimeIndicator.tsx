import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import { Box, Break, Gap } from '../../internal'

interface Props {
  timeReferencePosition?: string,
  time?: string,
  color?: string,
}

export const LiveTimeIndicator = ({ timeReferencePosition, time, color }: Props) => {

  if (time === undefined) {
    return null
  }

  let currentTimeZone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'})

  let parsedTime = ZonedDateTime.parse(time)
  let formattedTime = parsedTime.format(DateTimeFormatter.ofPattern(`K:mm`))

  return (
    <S.Container
      timeReferencePosition={timeReferencePosition}
    >
      <S.OverlayLine color={color} />
      <S.Time color={color}>
        
        <Box>{formattedTime}</Box>
          <Break />
        <Box>{currentTimeZone.slice(-3)}</Box>
       
      </S.Time>
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
    height: 0.5rem;
    z-index: 500;
  `,
  Time: styled.div<{
    color?: string
  }>`
    background: ${props => props.color ? props.color : 'hsl(4, 100%, 38%)'};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 30px;
    position: absolute;
    color: white;
    font-weight: 400;
    font-size: 0.75rem;
    margin-top: -.5rem;
  `,
  OverlayLine: styled.div<{
    color?: string
  }>`
    position: absolute;
    bottom: 0;
    background: ${props => props.color ? props.color : 'hsl(4, 100%, 38%)'};
    height: 1px;
    width: 100%;
  `
}