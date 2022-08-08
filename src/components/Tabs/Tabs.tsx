import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../Button/Button'

type Tab = {
  name: string,
  icon?: string,
  onClickFunction?: () => void,
  suffix?: string,
  forceActive?: boolean
}

type Type = {
  tabs: Tab[],
  onSetActiveTab: (arg0: string) => any,
  initialActiveTab?: string,
  expand?: boolean,
  activeTab?: string
}

export const Tabs = React.memo(({ tabs, onSetActiveTab, initialActiveTab, expand, activeTab }: Type) => {

  const [localSelectedTab, setLocalSelectedTab] = useState(initialActiveTab ? initialActiveTab : '')

  useEffect(() => {
    onSetActiveTab(localSelectedTab)
  }, [localSelectedTab])

  return (
    <S_Tabs>
      {
        tabs.map(({ name, icon, onClickFunction, suffix, forceActive }) => 
          <Button
            key={name}
            text={`${name}${suffix ? suffix : ''}`} 
            icon={icon} 
            onClick={() => {
              setLocalSelectedTab(name)
              onClickFunction
                ? onClickFunction()
                : null
            }} 
            expand={true}
            outline={name !== localSelectedTab}
            tab={true}
          /> 
        )
      }
    </S_Tabs>
  )
})

const S_Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`