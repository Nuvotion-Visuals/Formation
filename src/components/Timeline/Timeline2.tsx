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


export const Timeline2 = ({ value, onChange, onClick, activeArea }: Props) => {

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
        value={value} 
        areaIndex={activeArea}
        onChange={handleIntervalSurfaceClick}
        onClick={onClick}
      />
    </S.Timeline>
  )
}

const S = {
  Timeline: styled.div`
  min-width: 100%;
  /* height: calc(100% - 50px); */
  `
}
