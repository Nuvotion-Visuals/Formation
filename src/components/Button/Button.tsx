import React, { FC, useContext, useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { SizeProp } from '@fortawesome/fontawesome-svg-core' // type coersion needed until FA SizeProp defintion is fixed to include "xl"

import { Icon, LabelColor, getLabelColor, LinkContext, Link as IntLink } from '../../internal'


export interface ButtonProps {
  href?: string,
  hero?: boolean,
  name?: string,
  icon?: IconName,
  onClick?: (e: React.MouseEvent) => void,
  primary?: boolean,
  text?: string,
  blink?: boolean,
  rotate?: boolean,
  title?: string,
  disabled?: boolean,
  expand?: boolean,
  submit?: boolean,
  minimal?: boolean,
  id?: string,
  iconPrefix?: IconPrefix,
  minimalIcon?: boolean,
  secondary?: boolean,
  labelColor?: LabelColor,
  singleBlink? : boolean,
  tab? : boolean,
  newTab?: boolean,
  square?: boolean,
  circle?: boolean,
  expandVertical?: boolean,
  compact?: boolean,
  children?: React.ReactNode,
  prefix?: React.ReactNode,
  disableCenter?: boolean,
  off?: boolean
}

export const Button: FC<ButtonProps> = React.memo(({ 
  hero, 
  name, 
  icon, 
  onClick, 
  primary, 
  text, 
  blink, 
  rotate, 
  title, 
  disabled,
  href,
  expand,
  submit,
  id,
  iconPrefix,
  minimalIcon,
  secondary,
  minimal,
  labelColor,
  singleBlink,
  tab,
  newTab,
  square,
  circle,
  expandVertical,
  compact,
  prefix,
  disableCenter,
  children,
  off
}: ButtonProps) => {

  const Link: any = useContext(LinkContext) || IntLink;

  const impliedSquare = circle || square

  const renderButton = () => {
    return (
      <S.Button
        onClick={onClick ? (e: React.MouseEvent) => onClick(e) : () => {}} 
        primary={primary} 
        blink={blink}
        square={impliedSquare}
        circle={circle}
        title={title ? title : ''}
        disabled={disabled}
        hero={hero}
        expand={expand}
        type={submit ? 'submit' : undefined}
        id={id}
        secondary={(secondary && !primary) || minimal}
        singleBlink={singleBlink}
        tab={tab}
        name={name}
        labelColor={labelColor}
        expandVertical={expandVertical}
        minimal={minimal}
        minimalIcon={minimalIcon}
        compact={compact}
        disableCenter={disableCenter}
        prefix={!!prefix}
      >
        {
          prefix
        }
        {
          icon !== undefined
            ? <S.IconContainer square={impliedSquare} text={!!text}>
              <Icon 
                iconPrefix={iconPrefix ? iconPrefix : 'far'} 
                icon={icon}  
                rotation={rotate ? 90 : undefined}
                size={
                  hero 
                    ? ('xl' as SizeProp) // type coersion needed until FA SizeProp defintion is fixed to include "xl"
                    : minimalIcon || compact
                      ? '1x'
                      : 'lg'
                  } 
              />
              
                
              </S.IconContainer>
            : null
        }
        {
          labelColor && secondary
            ? <S.LabelCircle labelColor={labelColor} />
            : null
        }
        {
          text || children 
            ? 
              <S.Text 
                hero={hero}
                icon={icon}
                compact={compact}
              >
                {
                  children
                }
                {
                  text
                }
              </S.Text> 
            : null
        }
      </S.Button>
    )
  }

  return (
    <S.Container 
      disabled={disabled} 
      expand={expand} 
      square={impliedSquare} 
      hero={hero}
      expandVertical={expandVertical}
      minimalIcon={minimalIcon}
      compact={compact}
      off={off}
    >
      {
        href 
        ? 
          <Link href={href} newTab={newTab}>
            { renderButton() }
          </Link>
        : renderButton()
      }
    </S.Container>
  )
})

interface ContainerProps {
  disabled?: boolean,
  expand?: boolean,
  square?: boolean,
  hero?: boolean,
  expandVertical?: boolean,
  minimalIcon?: boolean,
  compact?: boolean,
  off?: boolean
}

interface TextProps {
  hero?: boolean,
  icon?: string,
  compact?: boolean
}

const calculateWidth = (props: ContainerProps) => {
  if (props.minimalIcon) {
    return '1.5rem'
  }
  else if (props.expand) {
    return '100%'
  }
  else if (props.hero) {
    if (props.square) {
      return 'var(--F_Input_Height_Hero)'
    }
    else {
      return 'auto'
    }
  }
  else {
    if (props.square) {
      if (props.compact) {
        return 'var(--F_Input_Height_Compact)'
      }
      else {
        return 'var(--F_Input_Height)'
      }
    }
    else {
      return 'auto'
    }
  }
}

const calculateHeight = (props: ContainerProps) => {
  if (props.compact) {
    return 'var(--F_Input_Height_Compact)'
  }
  else if (props.minimalIcon) {
    return '1rem'
  }
  else if (props.expandVertical) {
    return '100%'
  }
  else if (props.hero) {
    if (props.square) {
      return 'var(--F_Input_Height_Hero)'
    }
    else {
      return 'var(--F_Input_Height_Hero)'
    }
  }
  else {
    if (props.square) {
      return 'var(--F_Input_Height)'
    }
    else {
      return 'var(--F_Input_Height)'
    }
  }
}

const calculatePadding = (props: ButtonProps) => {
  if (props.compact) {
    if (props.square) {
      return '0'
    }
    else if (props.prefix) {
      return '0 .75rem 0 0'
    }
    else {
      return '0 .75rem'
    }
  }
  else if (props.hero) {
    if (props.square) {
      return '0'
    }
    else {
      return '0 1.75rem'
    }
  }
  else {
    if (props.square) {
      return '0'
    }
    else {
      return '0 1.125rem'
    }
  }
}

const calculateBackgroundColor = (props: ButtonProps) => {
  if (typeof props.labelColor === 'string' && props.primary) {
    return getLabelColor(props.labelColor);
  }
  if (props.primary) {
    return 'var(--F_Primary)';
  }
  if (props.blink) {
    return 'var(--Hover_Single)';
  }
  if (props.secondary) {
    return 'none';
  }
  return 'var(--F_Surface)';
}

const calculateHoverBackgroundColor = (props: ButtonProps) => {
  if (typeof props.labelColor === 'string' && props.primary) {
    return getLabelColor(props.labelColor);
  }
  if (props.primary) {
    return `var(--F_Primary_Hover)`
  }
  if (props.minimal) {
    return 'none'
  }
  else {
    return `var(--F_Surface_1)`
  }
}

const calculateActiveBackgroundColor = (props: ButtonProps) => {
  if (typeof props.labelColor === 'string' && props.primary) {
    return getLabelColor(props.labelColor);
  }
  if (props.primary) {
    return `var(--F_Primary)`
  } 
  if (props.minimal) {
    return 'none'
  }
  return 'var(--F_Surface_2)'
  
}

const S = {
  Container: React.memo(styled.div<ContainerProps>`
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
    flex-shrink: 0;
    user-select: none;
    max-height: ${props => calculateHeight(props)};
    height: ${props => calculateHeight(props)};
    max-width: ${props => calculateWidth(props)};
    width: ${props => calculateWidth(props)};
    opacity: ${props => props.off ? '.5' : '1'};
    display: flex;
    align-items: center;
    a {
      height: 100%;
    }
  `),
  Text: React.memo(styled.div<TextProps>`
    font-size: ${props => 
      props.hero 
        ? 'var(--F_Font_Size_Title)' 
        : props.compact
          ? 'var(--F_Font_Size_Label)'
          : 'var(--F_Font_Size)'
    };
    display: flex;
    flex-shrink: 0;
  `),
  Button: React.memo(styled.button.attrs({
    type: 'submit',
    value: 'Submit'
  })<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.prefix || props.disableCenter ? 'left' : 'center'};
    width: 100%;
    padding: ${props => calculatePadding(props)}; 
    background: ${props => calculateBackgroundColor(props)}; 
    letter-spacing: var(--F_Letter_Spacing);
    border: none;
    position: relative;
    overflow: hidden;
    color: ${props => props.disabled
      ? 'var(--F_Font_Color_Disabled)'
      : props.labelColor !== undefined && !props.secondary 
        ? 'white' 
        : 'var(--F_Font_Color)'
    };
    pointer-events: ${props => props.disabled ? 'none' : 'default'}; 
    display: flex;
    flex: 0 0 100%;
    align-items: center;
    height: 100%;
    min-width: var(--F_Font_Size_Icon);
    width: ${props => props.square && !props.hero
      ? '52px'
      : props.expand ? '100%' : 'auto'}; 
    box-shadow: ${props => props.secondary && !props.minimal ? 'var(--F_Outline)' : 'none'};
    border-radius: ${props => 
      props.circle
        ? '100%' 
        : props.tab 
          ? 'var(--F_Input_Radius) var(--F_Input_Radius) 0 0' 
          : 'var(--F_Input_Radius)'
    };
    animation: ${props => props.blink 
      ? css`${blink} 1s linear infinite` 
      : props.singleBlink
          ? css`${blink} 2s linear forwards` 
          : 'none'
    };
    cursor: ${props => props.disabled ? 'default' : 'pointer'}; 
    svg {
      color: ${props => props.disabled 
        ? 'var(--F_Font_Color_Disabled)' 
        : props.secondary
          ? 'var(--F_Font_Color_Label)'
          : 'var(--F_Font_Color)'
      };
    }
    &:hover {
      background: ${props => calculateHoverBackgroundColor(props)};
      * {
        color: var(--F_Font_Color);
        color: ${props => props.labelColor !== undefined && !props.secondary ? 'white' : 'var(--F_Font_Color)'};
      }
      box-shadow: none;
      filter: ${props => props.labelColor !== undefined && !props.secondary ? 'brightness(108%)' : 'none'};
    };
  
    &:active {
      background: ${props => calculateActiveBackgroundColor(props)
      };
      transform: translateY(1px);
      filter: ${props => props.labelColor !== undefined && !props.secondary ? 'brightness(116%)' : 'none'};
    };
  `),
  IconContainer: React.memo(styled.div<{
    square?: boolean,
    text?: boolean
  }>`
    padding-right: ${props => props.text ? '.5rem' : '0'};
  `),
  LabelCircle: React.memo(styled.div<{
    labelColor: LabelColor
  }>`
    width: 1rem;
    height: 1rem;
    margin-left: -.25rem;
    margin-right: .5rem;
    border-radius: 100%;
    background: ${props => getLabelColor(props.labelColor)};
  `)
}

const blink = keyframes`
  0% {
    background: var(--F_Surface);
  }
  50% {
    background: var(--F_Primary);
  }
  100% {
    background: var(--F_Surface);
  }
`