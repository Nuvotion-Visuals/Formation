import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { AreaSurface, Button, Box } from '../../internal'
import { ActivityType, AreaType } from '../../types'

interface Props {
  value: AreaType[],
  onChange: (newValue: AreaType[]) => void
}

export const Activities = ({ value, onChange }: Props) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0)
  const activeArea = value[activeAreaIndex]

  const handleActivityAreaClick = (time: any) => {
    let currentData: AreaType[] = value

    let newActivity: ActivityType = {
      title: '',
      startTime: time.value,
      endTime: time.value + 1,
      icon: '',
      people: [
      ],
    }

    currentData[activeAreaIndex]?.activities.push(newActivity)

    console.log(currentData, '<<NEWACTIVITY>>')
    onChange(currentData)
  }

  return (
    <S.Activities>
      <S.Header>
        <Box pl={3}>
          {
            value?.map((value, index) =>
              <Box mr={0.5} key={index}>
                <Button
                  primary={index === activeAreaIndex}
                  id={value.area}
                  text={value.area}
                  onClick={() => setActiveAreaIndex(index)}
                />
              </Box>)
          }
        </Box>
      </S.Header>
      <AreaSurface
        activities={activeArea.activities}
        onChange={handleActivityAreaClick}
      />
    </S.Activities>
  )
}

const S = {
  Activities: styled.div`
  width: 100%;
  `,
  Header: styled.div<{}>`
    position: sticky;
    top: 0;
    min-width: 100%;
    width: fit-content;
    height: var(--F_Header_Height);
    background: var(--F_Background);
    display: flex;
    justify-content: start;
    align-items: center;
    z-index: 1000;
    filter: drop-shadow(2px 0px 0.5rem #00000011);
  `,
  Tab: styled.div<{}>`
    padding: 0.25rem 0.5rem;
    margin: 0 0.5rem;
    background: var(--F_Primary);
    border-radius: 0.25rem;
  `,
  EventContainer: styled.div<{}>`
    display: flex;

  `,
}
