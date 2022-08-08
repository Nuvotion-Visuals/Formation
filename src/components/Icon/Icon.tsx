import '../../index.css'

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import React from 'react'

interface Props extends FontAwesomeIconProps{
  iconPrefix: IconPrefix | undefined
}

export const Icon = React.memo((props : Props) => {
  const { iconPrefix, icon } = props

  return <FontAwesomeIcon 
    {...props}
    icon={[
      iconPrefix
        ? iconPrefix
        : 'far',
      (icon as IconName)
    ]} 
  />
})