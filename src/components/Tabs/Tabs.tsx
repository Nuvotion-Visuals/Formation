import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Button } from '../../internal'

type Tab = {
  name: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  onClick?: () => void,
  prefix?: IconPrefix,
  suffix?: string
}

type Props = {
  tabs: Tab[],
  onSetActiveTab: (arg0: string) => any,
  initialActiveTab: string
}

export const Tabs = React.memo(({ 
  tabs, 
  onSetActiveTab, 
  initialActiveTab
}: Props) => {

  const [localActiveTab, set_localActiveTab] = useState(initialActiveTab)

  useEffect(() => {
    onSetActiveTab(localActiveTab)
  }, [localActiveTab])

  return (
    <S.Tabs>
      {
        tabs.map(({ name, icon, onClick, prefix, suffix, iconPrefix }) => 
          <Button
            key={name}
            text={`${prefix ? prefix : ''}${name}${suffix ? suffix : ''}`} 
            icon={icon} 
            iconPrefix={iconPrefix}
            onClick={() => {
              set_localActiveTab(name)
              onClick
                ? onClick()
                : null
            }} 
            expand={true}
            secondary={name !== localActiveTab}
            tab={true}

          /> 
        )
      }
    </S.Tabs>
  )
})

const S = {
  Tabs: styled.div`
    width: 100%;
    display: flex;
  `
}