import styled from 'styled-components'

import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import React from 'react'

type Tab = {
  name: string,
  icon?: string,
  onClickFunction?: () => void,
  suffix?: string,
  forceActive?: boolean
}

type Type = {
  tabs: Tab[],
  onSetActiveTab: (string) => any,
  initialActiveTab?: string,
  expand?: boolean,
  activeTab?: string
}

const Tabs = React.memo(({ tabs, onSetActiveTab, initialActiveTab, expand, activeTab }: Type) => {

  const [localSelectedTab, setLocalSelectedTab] = useState(initialActiveTab ? initialActiveTab : tabs[0])

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
            onClickFunction={() => {
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

export default Tabs

const S_Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`