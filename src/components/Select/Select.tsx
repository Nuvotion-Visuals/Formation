import styled from 'styled-components'

import React from 'react'

import { Icon } from '../../internal'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName, 
  iconPrefix?: IconPrefix,
  value: string, 
  onChange: (value: string) => void, 
  onChangeIndexFunction?: Function,
  title?: string, 
  id?: string, 
  options: string[], 
  placeholder?: string,
  disabled?: boolean,
  activeOptionIndex?: number
}

export const Select = ({ 
  icon, 
  iconPrefix,
  value, 
  onChange, 
  onChangeIndexFunction,
  title, 
  id, 
  options, 
  placeholder,
  disabled,
  activeOptionIndex
}: Props) => {

  const handleOnChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = (e.target as HTMLSelectElement).value
    onChange(newValue)
  }
  
  return (
    <S.SelectContainer>
      {
        icon
          ? <S.IconContainer>
              <Icon icon={icon} iconPrefix={iconPrefix} fixedWidth/>
            </S.IconContainer>
          : null
      }
        
      <S.Select 
        value={value}
        onChange={e => handleOnChange(e)} 
        title={title}
        id={id}
        disabled={disabled}
        hasIcon={icon !== undefined}
      >
        {
          placeholder 
            ? <S.Option disabled>{ placeholder }</S.Option> 
            : null
        }
        {
          options.map((option, index) => <S.Option key={index + option} value={option}>{option}</S.Option>)
        } 
      </S.Select>
    </S.SelectContainer>
  )
}

interface SelectProps {
  hasIcon: boolean
}

const S = {
  IconContainer: styled.div`
    display: flex;
    align-items: center;
    height: var(--F_Input_Height);
    padding-left: .75rem;
    user-select: none;
  `,
  SelectContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--F_Input_Height);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--F_Outline);
    min-width: 66px;

    transition: 0s;
    &:hover {
      box-shadow: var(--F_Outline_Hover);
    }

  `,
  Select: styled.select<SelectProps>`
    display: flex;
    width: 100%;
    font-size: var(--F_Font_Size);
    letter-spacing: 0.4px;
    padding-left: .125rem;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--F_Font_Color);
    height: 100%;
    user-select: none;
    padding-left: ${props => props.hasIcon ? '.125rem' : '.75rem'};
  `,
  Option: styled.option`
    background: var(--F_Background);
    color: var(--F_Font_Color);
  `
}