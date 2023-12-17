import React from 'react'
import styled from 'styled-components'
import { Link } from '../../internal'

interface Props {
  children: React.ReactNode,
  onClick?: () => void,
  href?: string,
  newTab?: boolean,
  center?: boolean,
  underline?: boolean,
}

export const Small = ({ 
  children,
  onClick,
  href,
  newTab,
  center,
  underline
}: Props) => {
  return (
    href
      ? <Link 
          href={href} 
          newTab={newTab}
        >
          <S.Small 
            center={center} 
            underline={underline}
            href={href}
          >
            {
              children
            }
          </S.Small>
        </Link>
      : <S.Small 
          onClick={onClick} 
          center={center} 
          underline={underline}
        >
          {
            children
          }
        </S.Small>
  )
}

export const S = {
  Small: styled.div<Props>`
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Label);
    width: 100%;
    cursor: ${props => props.onClick || props.href ? 'pointer' : 'auto'};
    text-align: ${props => props.center ? 'center' : 'left'};
    text-decoration: ${props => props.underline ? 'underline' : 'none'};
  `
}
