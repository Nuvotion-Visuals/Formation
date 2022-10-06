import React from 'react'
import styled from 'styled-components'
import { ZonedDateTime } from '@js-joda/core'
import "@js-joda/timezone"

import { IntervalSurface, } from '../../internal'
import { ActivityType, AreaType } from '../../types'

interface Props {
  value: AreaType[],
  onChange: (newValue: AreaType[]) => void,
  onClick: (e: React.MouseEvent) => void,
  activeArea: number
}


export const Timeline = ({ value, onChange, onClick, activeArea }: Props) => {

  const handleIntervalSurfaceClick = (interval: any) => {

    console.log(interval.value, "<<INTERVAL @CLICK>>")
    let currentData: AreaType[] = value

    let newActivity: ActivityType = {
      title: '',
      startTime: interval.value,
      endTime: interval.value,
      id: '10',
      people: [
      ],
    }
    currentData[activeArea]?.activities.push(newActivity)
    onChange(currentData)
  }

  return (
    <S.Timeline>
      <IntervalSurface
        value={value} // refactor to only send active indexed activities
        areaIndex={activeArea}
        onChange={handleIntervalSurfaceClick}
        onClick={onClick}
      />
    </S.Timeline>
  )
}

const S = {
  Timeline: styled.div`
  width: 100%;
  max-width: 400px;
  `,
  Header: styled.div<{}>`
    position: sticky;
    top: 0;
    min-width: 100%;
    width: fit-content;
    background: var(--F_Background);
    display: flex;
    justify-content: start;
    align-items: end;
    z-index: 1000;
    padding-top: 0.5rem;
  `
}
