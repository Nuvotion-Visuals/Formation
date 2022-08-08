import React, { FC } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { Icon } from '../Icon/Icon'

type Props = {
  href?: string,
  hero?: boolean,
  name?: string,
  icon?: string,
  onClick?: Function,
  emphasize?: boolean,
  text?: string,
  blink?: boolean,
  rotate?: boolean,
  title?: string,
  disabled?: boolean,
  expand?: boolean,
  submit?: boolean,
  id?: string,
  iconStyle?: string,
  outline?: boolean,
  singleBlink? : boolean,
  tab? : boolean,
  newTab?: boolean
}

export const Button: FC<Props> = React.memo(({ 
  hero, 
  name, 
  icon, 
  onClick, 
  emphasize, 
  text, 
  blink, 
  rotate, 
  title, 
  disabled,
  href,
  expand,
  submit,
  id,
  iconStyle,
  outline,
  singleBlink,
  tab,
  newTab
}: Props) => {
  const renderButton = () => {
    return (
      <S.Button
        onClick={onClick ? (e) => onClick(e) : () => {}} 
        emphasize={emphasize} 
        blink={blink}
        square={!text}
        title={title ? title : ''}
        disabled={disabled}
        hero={hero}
        expand={expand}
        // type={submit ? 'submit' : 'button'}
        id={id}
        outline={outline && !emphasize}
        singleBlink={singleBlink}
        tab={tab}
        name={name}
      >
        <Icon 
          prefix={iconStyle ? iconStyle : 'far'} 
          icon={icon}  
          rotate={rotate} 
        />
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
          <S.Link href={href} target={newTab ? '_blank' : '_href'}>
            { renderButton() }
          </S.Link>
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
  outline?: boolean,
  hero?: boolean,
  square?: boolean,
  emphasize?: boolean,
  singleBlink?: boolean,
  blink?: boolean,
  expand?: boolean,
  tab?: boolean,
  type?: string
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
  Link: styled.a``,
  Text: styled.div<TextProps>`
    font-size: ${props => props.hero ? 'var(--Font_Size_Title)' : 'var(--Font_Size)'};
    margin-left: ${props => props.icon ? '.5rem' : '0'};
    display: flex;
  `,
  Button: styled.button.attrs({ 
    type: 'submit',
    value: 'Submit'
  })<ButtonProps>`
    letter-spacing: var(--Letter_Spacing);
    background: none;
    border: none;
    position: relative;
    overflow: hidden;
    color: ${props => props.disabled 
      ? 'var(--Font_Color_Disabled)' 
      : props.outline
        ? 'var(--Font_Color_Label)'
        : 'var(--Font_Color)'
    };
    
    pointer-events: ${props => props.disabled ? 'none' : 'default'}; 
    display: flex;
    flex: 0 0 100%;
    align-items: center;
    justify-content: center;
    height: ${props => 
      props.hero && props.square 
        ? '54px' 
        : props.hero 
            ? 'auto' 
            : 'var(--Input_Height)'
        };
    min-width: var(--Font_Size_Icon);
    padding: ${props => 
      props.hero && !props.square 
        ? '1.5rem 1.75rem' 
        : props.square
            ? '1.5rem'
            : 'var(--Font_Size)'
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
    background: ${props => props.emphasize 
        ? `var(--Primary)`
        : props.blink
          ? 'var(--Hover_Single)'
          : props.outline 
            ? 'none'
            : 'var(--Surface)'
    }; 
  
    box-shadow: ${props => props.outline ? 'var(--Outline)' : 'none'};
    animation: ${props => props.blink 
      ? css`${blink} 1s linear infinite` 
      : props.singleBlink
          ? css`${blink} 2s linear forwards` 
          : 'none'
    };
    cursor: ${props => props.disabled ? 'default' : 'pointer'}; 

    svg {
      color: ${props => props.disabled 
        ? 'var(--Font_Color_Disabled)' 
        : props.outline
          ? 'var(--Font_Color_Label)'
          : 'var(--Font_Color)'
      };
    }
    
    &:hover {
      background: ${props => props.emphasize 
        ? `var(--Primary_Hover)`
        : 'var(--Surface_1)'
      };
      * {
        color: var(--Font_Color);
      }
      box-shadow: none;
    };
  
    &:active {
      background: ${props => props.emphasize 
        ? `var(--Primary)`
        : 'var(--Surface_2)'
      };
      transform: translateY(1px);
    };
  `,
}


const blink = keyframes`
{
  0% {
    background: var(--Surface);
  }
  50% {
    background: rgba(192, 12, 0, .7);
  }
  100% {
    background: var(--Surface);
  }
}
`
