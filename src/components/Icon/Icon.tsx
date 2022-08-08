import '../../index.css'

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import React from 'react'

interface Props extends FontAwesomeIconProps{
  prefix: IconPrefix
}

export const Icon = React.memo((props : Props) => {
  const { prefix, icon } = props

  return <FontAwesomeIcon 
    {...props}
    icon={[
      prefix
        ? prefix
        : 'far',
      (icon as IconName)
    ]} 
  />
})