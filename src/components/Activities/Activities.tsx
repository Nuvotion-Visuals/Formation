import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { AreaSurface, Button, Box, Tabs } from '../../internal'
import { ActivityType, AreaType } from '../../types'

interface Props {
  value: AreaType[],
  onChange: (newValue: AreaType[]) => void
}

type Tab = {
  name: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  onClick?: () => void,
  prefix?: IconPrefix,
  suffix?: string
}

export const Activities = ({ value, onChange }: Props) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0)
  const activeArea = value[activeAreaIndex]

  let tabs: Tab[] = value?.map(({ area }, index) => {
    const tab = { name: area, onClick: () => setActiveAreaIndex(index)}
    return tab
  })

  useEffect(() => console.log(tabs, '<<TABS>>'))

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
    onChange(currentData)
  }

  return (
    <S.Activities>
      <S.Header>
        <Tabs
          tabs={tabs}
          initialActiveTab={tabs[0].name}
          onSetActiveTab={() => null}
        />
      </S.Header>
      
      <AreaSurface
        value={value}
        areaIndex={activeAreaIndex}
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
    height: fit-content;
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
