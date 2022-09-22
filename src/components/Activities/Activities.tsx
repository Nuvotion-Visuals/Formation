import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { AreaSurface, Button, Box } from '../../internal'
import { ActivityType, AreaType } from '../../types'

interface Props {
  value?: AreaType[],
  onChange: Function
}

export const Activities = ({ value }: Props) => {
  const [state, setState] = useState<AreaType[]>([])
  const [activeArea, setActiveArea] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentActivities, setCurrentActivities] = useState<any[]>([])

  const findAreaIndex = (activeArea: string) => {
    const newIndex = state?.findIndex(object => {
      return object.area === activeArea
    })
    return newIndex
  }

  useEffect(() => {
    if (!value) {
      return 
    } else {
      let activities: ActivityType[] = value[0].activities
      let activeArea: string = value[0].area.toString()

      setState(value)
      setActiveArea(activeArea)
      setCurrentActivities(activities)
      return
    }
  }, [])

  useEffect(() => {
    let newIndex = findAreaIndex(activeArea)
    setActiveIndex(newIndex)
    console.log(activeArea)
  }, [activeArea])

  useEffect(() => {
    let activitiesPresent: ActivityType[] = state ? state[activeIndex] : []
    setCurrentActivities(activitiesPresent)
  }, [activeIndex])


  const handleTabClick = (e: React.MouseEvent<HTMLElement>) => {
    setActiveArea((e.target as HTMLInputElement).innerText)
  }

  const isPrimary = (area: string) => {
    return area === activeArea
  }

  return (
    <S.Activities>
      <S.Header>
        <Box pl={3}>
          {
            state?.map(state =>
              <Box mr={0.5} >
                <Button
                  primary={isPrimary(state.area)}
                  id={state.area}
                  text={state.area}
                  onClick={handleTabClick}
                />
              </Box>)
          }
        </Box>
      </S.Header>
      <AreaSurface currentActivities={currentActivities?.activities} />
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
    width: 100%;
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
