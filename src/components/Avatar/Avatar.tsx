import styled from 'styled-components'
import React from 'react'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { getInitials, getColorFromGuid, Icon, LabelColor, getLabelColor } from '../../internal'

interface Props {
  name?: string,
  src?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  labelColor?: LabelColor
}

export const Avatar = ({ 
  name,
  src,
  icon,
  iconPrefix,
  labelColor,
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
              size={labelColor === 'none' ? 'lg' : '1x'}
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