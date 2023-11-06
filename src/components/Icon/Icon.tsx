import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

export interface Props extends FontAwesomeIconProps {
  iconPrefix?: IconPrefix | undefined
}

export const Icon = React.memo((props: Props) => {
  const { iconPrefix, icon, ...rest } = props

  return (
    <S.Icon
      {...rest}
      icon={[
        iconPrefix ? iconPrefix : 'fas',
        (icon as IconName)
      ]}
    />
  )
})

const S = {
  Icon: React.memo(styled(FontAwesomeIcon)`    
    color: var(--F_Font_Color_Label); 
  `)
}