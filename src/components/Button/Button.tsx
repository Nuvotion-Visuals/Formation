import React, { FC } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { SizeProp } from '@fortawesome/fontawesome-svg-core' // type coersion needed until FA SizeProp defintion is fixed to include "xl"

import { Icon, getLinkComponent, Box } from '../../internal'

type Props = {
  href?: string,
  hero?: boolean,
  name?: string,
  icon?: IconName,
  onClick?: Function,
  onBlur?: Function,
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
  background?: string,
  singleBlink? : boolean,
  tab? : boolean,
  newTab?: boolean,
  square?: boolean,
  circle?: boolean,
  expandVertical?: boolean
}

export const Button: FC<Props> = React.memo(({ 
  hero, 
  name, 
  icon, 
  onClick, 
  onBlur,
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
  background,
  singleBlink,
  tab,
  newTab,
  square,
  circle,
  expandVertical
}: Props) => {

  const Link = getLinkComponent()

  const impliedSquare = !text || circle || square

  const renderButton = () => {
    return (
      <S.Button
        onClick={onClick ? (e) => onClick(e) : () => {}} 
        onBlur={onBlur ? (e) => onBlur(e) : () => {}}
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
        secondary={secondary && !primary}
        singleBlink={singleBlink}
        tab={tab}
        name={name}
        hasIcon={icon !== undefined}
        background={background}
      >
        {
          icon !== undefined
            ? <S.IconContainer square={impliedSquare}>
              <Icon 
                  iconPrefix={iconPrefix ? iconPrefix : 'far'} 
                  icon={icon}  
                  rotation={rotate ? 90 : undefined}
                  size={
                    hero 
                      ? ('xl' as SizeProp) // type coersion needed until FA SizeProp defintion is fixed to include "xl"
                      : 'lg'
                    } 
                />
              
                
              </S.IconContainer>
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
<<<<<<< HEAD
    <S.Container disabled={disabled} expand={expand} id={id}>
=======
    <S.Container 
      disabled={disabled} 
      expand={expand} 
      square={impliedSquare} 
      hero={hero}
      expandVertical={expandVertical}
    >
>>>>>>> 9f3493bf86121576147462a4d5572acdf5381038
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
  expandVertical?: boolean
}

interface ButtonProps {
  id?: string,
  onClick?: Function,
  title?: string,
  disabled?: boolean,
  secondary?: boolean,
  background?: string,
  hero?: boolean,
  square?: boolean,
  primary?: boolean,
  singleBlink?: boolean,
  blink?: boolean,
  expand?: boolean,
  tab?: boolean,
  type?: string,
  hasIcon: boolean,
  circle?: boolean
} 

interface TextProps {
  hero?: boolean,
  icon?: string
}

const calculateWidth = (props: ContainerProps) => {
  if (props.expand) {
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
      return 'var(--F_Input_Height)'
    }
    else {
      return 'auto'
    }
  }
}

const calculateHeight = (props: ContainerProps) => {
  if (props.expandVertical) {
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
  if (props.hero) {
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

const S = {
  Container: styled.div<ContainerProps>`
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
    flex-shrink: 0;
    user-select: none;
    max-height: ${props => calculateHeight(props)};
    height: ${props => calculateHeight(props)};
    max-width: ${props => calculateWidth(props)};
    width: ${props => calculateWidth(props)};
    display: flex;
    align-items: center;

    a {
      height: 100%;
    }
  `,
  Text: styled.div<TextProps>`
    font-size: ${props => props.hero ? 'var(--F_Font_Size_Title)' : 'var(--F_Font_Size)'};
    display: flex;
  `,
  Button: styled.button.attrs({
    type: 'submit',
<<<<<<< HEAD
    value: 'Submit',
  }) <ButtonProps>`
=======
    value: 'Submit'
  })<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: ${props => calculatePadding(props)}; 
    background: ${props => props.primary 
      ? `var(--F_Primary)`
      : props.blink
        ? 'var(--Hover_Single)'
        : props.secondary 
          ? 'none'
          : 'var(--F_Surface)'
    }; 
    box-shadow: ${props => props.secondary ? 'var(--F_Outline)' : 'none'};
>>>>>>> 9f3493bf86121576147462a4d5572acdf5381038
    letter-spacing: var(--F_Letter_Spacing);
    border: none;
    position: relative;
    overflow: hidden;
    color: ${props => props.disabled
      ? 'var(--F_Font_Color_Disabled)'
      : 'var(--F_Font_Color)'
    };
    pointer-events: ${props => props.disabled ? 'none' : 'default'}; 
<<<<<<< HEAD
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
          ? 'var(--F_Surface)'
          : typeof(props.background) == 'string'
            ? props.background
            : ''
    }; 
  
    box-shadow: ${props => props.secondary ? 'var(--F_Outline)' : 'none'};
=======
    border-radius: ${props => 
      props.circle
        ? '100%' 
        : props.tab 
          ? '.5rem .5rem 0 0' 
          : '.5rem'
    };
>>>>>>> 9f3493bf86121576147462a4d5572acdf5381038
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
      : props.background
        ? props.background
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
  IconContainer: styled.div<{
    square?: boolean
  }>`
    padding-right: ${props => props.square ? '0' : '.5rem'};
  `
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