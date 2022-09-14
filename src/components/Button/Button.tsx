import React, { FC } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { SizeProp } from '@fortawesome/fontawesome-svg-core' // type coersion needed until FA SizeProp defintion is fixed to include "xl"

import { Icon, getLinkComponent } from '../../internal'

type Props = {
  href?: string,
  hero?: boolean,
  name?: string,
  icon?: IconName,
  onClick?: Function,
  primary?: boolean,
  text?: string,
  blink?: boolean,
  rotate?: boolean,
  title?: string,
  disabled?: boolean,
  expand?: boolean,
  submit?: boolean,
  id?: string,
  iconPrefix?: IconPrefix,
  secondary?: boolean,
  singleBlink? : boolean,
  tab? : boolean,
  newTab?: boolean
}

export const Button: FC<Props> = React.memo(({ 
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
  secondary,
  singleBlink,
  tab,
  newTab
}: Props) => {

  const Link = getLinkComponent()

  const renderButton = () => {
    return (
      <S.Button
        onClick={onClick ? (e) => onClick(e) : () => {}} 
        primary={primary} 
        blink={blink}
        square={!text}
        title={title ? title : ''}
        disabled={disabled}
        hero={hero}
        expand={expand}
        type={submit ? 'submit' : undefined}
        id={id}
        secondary={secondary && !primary}
        singleBlink={singleBlink}
        tab={tab}
        name={name}
        hasIcon={icon !== undefined}
      >
        {
          icon
            ? <Icon 
                iconPrefix={iconPrefix ? iconPrefix : 'far'} 
                icon={icon}  
                rotation={rotate ? 90 : undefined}
                size={
                  hero 
                    ? ('xl' as SizeProp) // type coersion needed until FA SizeProp defintion is fixed to include "xl"
                    : '1x'
                  } 
                fixedWidth
              />
            : null
        }
      
        {
          text 
            ? 
              <S.Text 
                hero={hero}
                icon={icon}
              >
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
    <S.Container disabled={disabled} expand={expand}>
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
  expand?: boolean
}

interface ButtonProps {
  id?: string,
  onClick?: Function,
  title?: string,
  disabled?: boolean,
  secondary?: boolean,
  hero?: boolean,
  square?: boolean,
  primary?: boolean,
  singleBlink?: boolean,
  blink?: boolean,
  expand?: boolean,
  tab?: boolean,
  type?: string,
  hasIcon: boolean
} 

interface TextProps {
  hero?: boolean,
  icon?: string,
}

const S = {
  Container: styled.div<ContainerProps>`
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
    flex-shrink: 0;
    user-select: none;
    display: flex;
    flex-grow: ${props => props.expand ? '1' : 'auto'};
  `,
  Text: styled.div<TextProps>`
    font-size: ${props => props.hero ? 'var(--F_Font_Size_Title)' : 'var(--F_Font_Size_Label)'};
    margin-left: ${props => props.hero
      ? props.icon ? '.5rem' : '0'
      : props.icon ? '.375rem' : '0'
    };
    display: flex;
    height: 100%;
    align-items: center;
  `,
  Button: styled.button.attrs({ 
    type: 'submit',
    value: 'Submit'
  })<ButtonProps>`
    letter-spacing: var(--F_Letter_Spacing);
    background: none;
    border: none;
    position: relative;
    overflow: hidden;
    color: ${props => props.disabled 
      ? 'var(--F_Font_Color_Disabled)' 
      : 'var(--F_Font_Color)'
    };
    
    pointer-events: ${props => props.disabled ? 'none' : 'default'}; 
    display: flex;
    flex: 0 0 100%;
    align-items: center;
    justify-content: center;
    height: ${props => 
      props.hero
        ? 'auto' 
        : 'var(--F_Input_Height)'
    };
    min-width: var(--F_Font_Size_Icon);
    padding: ${props => 
      props.hero && !props.square 
        ? '1rem 1.5rem 1rem 1rem' 
        : props.square
            ? '1rem'
            : props.hasIcon
                ? '1rem 1rem 1rem .75rem' 
                : '1rem' 
    };
    width: ${props => props.square && !props.hero 
      ? '52px' 
      : props.expand ? '100%' : 'auto'}; 
    border-radius: ${props => 
      props.hero && props.square 
        ? '100%' 
        : props.tab 
          ? '.5rem .5rem 0 0' 
          : '.5rem'
    };
    background: ${props => props.primary 
        ? `var(--F_Primary)`
        : props.blink
          ? 'var(--Hover_Single)'
          : props.secondary 
            ? 'none'
            : 'var(--F_Surface)'
    }; 
  
    box-shadow: ${props => props.secondary ? 'var(--F_Outline)' : 'none'};
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
      background: ${props => props.primary 
        ? `var(--F_Primary_Hover)`
        : 'var(--F_Surface_1)'
      };
      * {
        color: var(--F_Font_Color);
      }
      box-shadow: none;
    };
  
    &:active {
      background: ${props => props.primary 
        ? `var(--F_Primary)`
        : 'var(--F_Surface_2)'
      };
      transform: translateY(1px);
    };
  `,
}

const blink = keyframes`
  0% {
    background: var(--F_Surface);
  }
  50% {
    background: rgba(192, 12, 0, .7);
  }
  100% {
    background: var(--F_Surface);
  }
`