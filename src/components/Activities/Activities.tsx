import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyleHTML } from '../../internal'
import { ActivityType, AreaType } from '../../types'

interface Props {
  value?: AreaType[],
  onChange: Function
}

export const Activities = ({ value }: Props) => {
  const [state, setState] = useState<AreaType[]>([])
  const [activeArea, setActiveArea] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const findIndex = (activeArea: string) => {
    const newIndex = state?.findIndex(object => {
      return object.area === activeArea
    })
    return newIndex
  }

  useEffect(() => {
    if (!value) {
      return 
    } else {
      setState(value)
      setActiveArea(value[0].area.toString())
    }
  }, [])

  useEffect(() => {
    let newIndex = findIndex(activeArea)
    setActiveIndex(newIndex)
  }, [activeArea])

  const handleTabClick = (e: React.MouseEvent<HTMLElement>) => {
    setActiveArea(e.target.id)
  }

  return (
    <S.Activities>
      <S.Header>
        {
          state?.map(state => <S.Tab id={state.area} onClick={handleTabClick}>{state.area}</S.Tab>)
        }
      </S.Header>
      {/* <ActivitiesSurface /> */}
      <S.EventContainer>
        {
          state[activeIndex]?.activities.map(activity => <S.Column>{activity.title}</S.Column>)
        }
      </S.EventContainer>
    </S.Activities>
  )
}

const S = {
  Activities: styled.div`
    width: 100%;
    * {
    color: var(--F_Font_Color);

    }
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
  Column: styled.div<{}>`
    min-width: 25%;
    background: #8ba0d2;
    margin: 0.25rem;
    padding: 1rem;
  `
}
