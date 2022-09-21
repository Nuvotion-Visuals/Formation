import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { AreaSurface } from '../../internal'
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
      // console.log("state", value)
      // console.log("current Activities", value[0].area.toString())
      // console.log( "ActiveArea", value[0].activities)
      return
    }
  }, [])

  useEffect(() => {
    let newIndex = findAreaIndex(activeArea)
    setActiveIndex(newIndex)
  }, [activeArea])

  useEffect(() => {
    let activitiesPresent: ActivityType[] = state ? state[activeIndex] : []
    setCurrentActivities(activitiesPresent)
  }, [activeIndex])


  const handleTabClick = (e: React.MouseEvent<HTMLElement>) => {
    setActiveArea((e.target as HTMLInputElement).id)
    console.log(currentActivities?.activities, "<<currentActivities>>")
  }

  return (
    <S.Activities>
      <S.Header>
        {
          state?.map(state => <S.Tab id={state.area} onClick={handleTabClick}>{state.area}</S.Tab>)
        }
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
    width: 100%;
    height: 2rem;
    background: #56d877;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Tab: styled.div<{}>`
    border-bottom: 2px solid black;
    padding: 0.25rem 0.5rem;
    margin: 0 0.5rem;
  `,
  EventContainer: styled.div<{}>`
    display: flex;

  `,
}
