import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Button, Fit } from '../../internal'

type Tab = {
  name: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  onClick?: (e: React.MouseEvent) => void,
  prefix?: IconPrefix,
  suffix?: string,
}

type Props = {
  tabs: Tab[],
  onSetActiveTab: (arg0: string) => any,
  initialActiveTab: string,
  compact?: boolean,
  expand?: boolean
}

/**
 * The `Tabs` component displays sections of content which offer an efficient way to direct the user's attention and keep longer pages more organized.
 * The component is designed to receive an array of tab objects; each with it's own unique properties e.g., a functioning button and more.
 * This component also provides a 'handleActiveTab' callback function where the parent component can have a notice about current active tab.
 * Tab active states are managed and updated locally and synced back to the parent component.
 *
 * @param {Array} tabs - An array of tabs. Each tab object can include a "name" (string), "icon" (IconName), "iconPrefix" (string), "onClick" (function), "prefix" (string), and "suffix" (string)
 * @param {string} initialActiveTab - The tab that is active on initial load of the component.
 * @param {Function} onSetActiveTab - A function that handles setting the currently active tab. Returns the name of the active tab when a tab is clicked.
 * @param {boolean} compact - Defines whether the compact variation of this component should be used. Default: false.
 * @param {boolean} expand - Defines whether the the component should expand to fill the full horizontal width.
 *
 * @example
 * return (
 *  <Tabs 
 *    tabs={[
 *      {name:'Tab1', icon:'home', iconPrefix:'fas', onClick:()=>console.log('home clicked')}, 
 *      {name:'Tab2', icon:'bell', iconPrefix:'fas'}
 *    ]}
 *    initialActiveTab='Tab1'
 *    onSetActiveTab={(tab) => console.log(tab)}
 *    compact
 *  />
 * )
 * 
 * @component
 */
export const Tabs = React.memo(({ 
  tabs, 
  onSetActiveTab, 
  initialActiveTab,
  compact,
  expand
}: Props) => {

  const [localActiveTab, set_localActiveTab] = useState(initialActiveTab)

  useEffect(() => {
    onSetActiveTab(localActiveTab)
  }, [localActiveTab])

  const Content = () => <>
   {
      tabs.map(({ name, icon, onClick, prefix, suffix, iconPrefix }) => 
        <Button
          key={name}
          text={`${prefix ? prefix : ''}${name}${suffix ? suffix : ''}`} 
          icon={icon} 
          iconPrefix={iconPrefix}
          onClick={(e) => {
            set_localActiveTab(name)
            onClick
              ? onClick(e)
              : null
          }} 
          secondary={name !== localActiveTab}
          tab={true}
          compact={compact}
        /> 
      )
    }
  </>

  return (
    <S.Tabs>
      {
        expand
          ? <Fit>
              <Content />
            </Fit>
          : <Content />
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