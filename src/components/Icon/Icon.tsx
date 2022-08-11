import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import React from 'react'
import styled from 'styled-components'

interface Props extends FontAwesomeIconProps{
  iconPrefix: IconPrefix | undefined
}

export const Icon = React.memo((props : Props) => {
  const { iconPrefix, icon } = props

  return <S.Icon 
    {...props}
    icon={[
      iconPrefix
        ? iconPrefix
        : 'far',
      (icon as IconName)
    ]} 
  />
})

const S = {
  Icon: styled(FontAwesomeIcon)`
    color: var(--Font_Color_Label);
  `
}