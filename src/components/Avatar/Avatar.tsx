import styled from 'styled-components'
import React from 'react'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { getInitials, getColorFromGuid, Icon } from '../../internal'

interface Props {
  name?: string,
  src?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  color?: string,
  active?: boolean
}

export const Avatar = ({ 
  name,
  src,
  icon,
  iconPrefix,
  color,
  active
}: Props) => {
  return (
    <S.Avatar 
      src={src}
      color={
        color
          ? color
          : name 
            ? getColorFromGuid(name) 
            : getColorFromGuid(String(Math.random()))
      }
      active={active}
    >
      {
        icon
          ? <Icon 
              icon={icon} 
              iconPrefix={iconPrefix} 
              size={color === 'none' ? 'lg' : '1x'}
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
    color?: string,
    src?: string,
    active?: boolean
  }>`
    height: 1.675rem;
    max-width: 1.675rem;
    min-width: 1.675rem;
    border-radius: 50%;
    background-color: ${props => props.color};
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
      /* color: ${props => props.color === 'none' ? 'auto' : 'white'}; */
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'auto'};
    }
    font-weight: 600;
  `
}