import styled, { keyframes, css } from 'styled-components'

import React from 'react'

import Icon from '../Icon/Icon'

type ButtonType = {
  href?: string,
  hero?: boolean,
  name?: string,
  icon?: string,
  onClickFunction?: Function,
  emphasize?: boolean,
  text?: string,
  blink?: boolean,
  rotate?: boolean,
  title?: string,
  disabled?: boolean,
  expand?: boolean,
  submit?: boolean,
  cta?: boolean,
  id?: string,
  iconStyle?: string,
  outline?: boolean,
  singleBlink? : boolean,
  tab? : boolean,
  newTab?: boolean
}

const Button = React.memo(({ 
  hero, 
  name, 
  icon, 
  onClickFunction, 
  emphasize, 
  text, 
  blink, 
  rotate, 
  title, 
  disabled,
  href,
  expand,
  submit,
  cta,
  id,
  iconStyle,
  outline,
  singleBlink,
  tab,
  newTab
}: ButtonType) => {

  cta = true

  const renderButton = () => {
    return (
      <S_Button
        onClick={onClickFunction ? (e) => onClickFunction(e) : () => {}} 
        emphasize={emphasize} 
        blink={blink}
        square={!text}
        title={title ? title : ''}
        disabled={disabled}
        hero={hero}
        expand={expand}
        type={submit ? 'submit' : 'button'}
        id={id}
        outline={outline && !emphasize}
        singleBlink={singleBlink}
        tab={tab}
      >
        <Icon prefix={iconStyle ? iconStyle : 'far'} icon={icon}  rotate={rotate} />
        {
          text ? <S_Text id={`${id}_text`} hero={hero} icon={icon} disabled={disabled} cta={cta} outline={outline}>{text}</S_Text> : null
        }
      </S_Button>
    )
  }

  return (
    <S_ButtonContainer disabled={disabled} expand={expand}>
      {
        href 
        ? 
          <S_Link href={href} newTab={newTab}>
            { renderButton() }
          </S_Link>
        : renderButton()
      }
    </S_ButtonContainer>
  )
})

export default Button

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

const S_Link = styled.a`
  
`

const S_ButtonContainer = styled.div`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
  flex-shrink: 0;
  user-select: none;
  display: flex;
  flex-grow: ${props => props.expand ? '1' : 'auto'};
`

const S_Button = styled.button.attrs({ 
  type: 'submit',
  value: 'Submit'
})`
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

  svg {
    color: ${props => props.disabled 
      ? 'var(--Font_Color_Disabled)' 
      : props.outline
        ? 'var(--Font_Color_Label)'
        : 'var(--Font_Color)'
    };
  }
  
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
      ? '16px 24px' 
      : props.square
          ? '16px'
          : 'var(--Font_Size)'
  };
  width: ${props => props.square && !props.hero 
    ? '52px' 
    : props.expand ? '100%' : 'auto'}; 
  border-radius: ${props => 
    props.hero && props.square 
      ? '100%' 
      : props.tab 
        ? '8px 8px 0 0' 
        : '8px'
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
`

const S_Text = styled.div`
  font-size: ${props => props.hero ? 'var(--Font_Size_Title)' : 'var(--Font_Size)'};
  /* font-weight: ${props => props.cta && !props.outline ? '600' : '400'}; */
  /* text-transform: uppercase; */
  margin-left: ${props => props.icon ? '8px' : '0px'};
  display: flex;
`

