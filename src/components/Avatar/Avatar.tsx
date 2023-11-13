import styled from 'styled-components'
import React from 'react'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { getInitials, getColorFromGuid, Icon, LabelColor, getLabelColor } from '../../internal'

interface Props {
  name?: string,
  src?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  labelColor?: LabelColor,
  minimalIcon?: boolean
}

/**
 * `Avatar` is a component that displays a user's avatar. It can show an image, an icon, or the user's initials. 
 * The avatar's appearance can be customized with various options, such as the icon size and label color.
 *
 * @component
 * @param {string} [name] - The name of the user, used to generate initials if no image source is provided.
 * @param {string} [src] - The image source URL to display in the avatar.
 * @param {IconName} [icon] - The name of the FontAwesome icon to display in the avatar.
 * @param {IconPrefix} [iconPrefix] - The prefix for the FontAwesome icon set to be used.
 * @param {LabelColor} [labelColor] - The color label for the avatar background, can influence icon color as well.
 * @param {boolean} [minimalIcon] - If true, a smaller icon size is used.
 *
 * @example
 * // Avatar with user's initials
 * <Avatar name="Jane Doe" />
 *
 * @example
 * // Avatar with FontAwesome icon
 * <Avatar icon="user" iconPrefix="fas" minimalIcon />
 *
 * @example
 * // Avatar with an image source
 * <Avatar src="/path/to/image.jpg" />
 */

export const Avatar = ({ 
  name,
  src,
  icon,
  iconPrefix,
  labelColor,
  minimalIcon
}: Props) => {
  return (
    <S.Avatar 
      src={src}
      labelColor={labelColor}
    >
      {
        icon
          ? <Icon 
              icon={icon} 
              iconPrefix={iconPrefix} 
              size={
                labelColor === 'none' 
                  ? 'lg' 
                  : minimalIcon
                    ? 'sm'
                    : '1x'
              }
              fixedWidth={true}
            />
          : name && !src 
            ? getInitials(name) 
            : null
      }
    </S.Avatar>
  )
}


const S = {
  Avatar: styled.div<{
    labelColor?: LabelColor,
    src?: string
  }>`
    height: 1.675rem;
    max-width: 1.675rem;
    min-width: 1.675rem;
    border-radius: 50%;
    background-color: ${props => props.labelColor ? getLabelColor(props.labelColor) : 'none'};
    background-image: ${props => props.src 
      ? `url(${props.src})` 
      : 'none'
    };
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--F_Outline_Label);
    font-size: var(--F_Font_Size_Label);
    color: white;
    * {
      color: ${props => props.labelColor && props.labelColor !== 'none' ? 'white' : 'auto'};
    }
    font-weight: 600;
  `
}