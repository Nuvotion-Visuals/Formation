import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

export type IconProps = FontAwesomeIconProps & {
  iconPrefix?: IconPrefix
}

/**
 * `Icon` is a component that renders a Font Awesome icon. It extends all the properties of the FontAwesomeIcon component
 * and allows specifying an icon prefix for different icon styles. This component is used for adding icons to the UI with 
 * consistent styling across the application.
 *
 * @component
 * @param {IconPrefix} [iconPrefix] - The prefix to choose the style of the icon, such as 'fas' for solid icons or 'far' for regular icons.
 * @param {FontAwesomeIconProps} rest - Any other properties supported by FontAwesomeIcon can be passed through to this component.
 *
 * @example
 * // Icon with a specific prefix and additional FontAwesomeIconProps
 * <Icon iconPrefix="fas" icon="user" size="lg" />
 *
 * @example
 * // Icon with default prefix
 * <Icon icon="coffee" />
 */
export const Icon = React.memo((props: IconProps) => {
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