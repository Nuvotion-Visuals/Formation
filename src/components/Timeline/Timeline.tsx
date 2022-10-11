import React, { useEffect } from 'react'
import styled from 'styled-components'


import { IntervalSurface, } from '../../internal'
import { ActivityType, AreaType } from '../../types'

interface Props {
  value: AreaType[],
  onChange: (newValue: AreaType[]) => void,
  onClick: (e: React.MouseEvent) => void,
  activeArea: number
}

interface IntervalType {
  display: string,
  value: string,
  gridNumber: number
}


export const Timeline = ({ value, onChange, onClick, activeArea }: Props) => {
  let activities = value[activeArea].activities

  const handleIntervalSurfaceClick = (parsedTime: string) => {
    let currentData: AreaType[] = value

    let newActivity: ActivityType = {
      title: '',
      startTime: parsedTime,
      endTime: parsedTime,
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
        value={activities} 
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
  height: calc(100% - 50px);
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
