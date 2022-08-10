import styled from 'styled-components'

import React from 'react'
import { Icon } from '../Icon/Icon'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon?: IconName, 
  iconPrefix?: IconPrefix,
  value: string, 
  onChange: Function, 
  onChangeIndexFunction?: Function,
  title: string, 
  id: string, 
  options: string[], 
  placeholder?: string,
  disabled: boolean,
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
    <S_SelectContainer>
      {
        icon
          ? <S_IconContainer>
              <Icon icon={icon} iconPrefix={iconPrefix} />
            </S_IconContainer>
          : null
      }
        
      <S_Select 
        value={value}
        onChange={e => handleOnChange(e)} 
        title={title}
        id={id}
        disabled={disabled}
      >
        {
          placeholder 
            ? <S_Option disabled>{ placeholder }</S_Option> 
            : null
        }
        {
          options.map((option, index) => <S_Option key={index + option} value={activeOptionIndex !== null ? `${option}${index}` : option}>{option}</S_Option>)
        } 
      </S_Select>
    </S_SelectContainer>
  )
}

const S_IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: var(--Input_Height);
  padding-left: 1rem;
  user-select: none;
`

const S_SelectContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--Input_Height);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--Outline);

  transition: 0s;
  &:hover {
    background: var(--Surface_1);
  }
  &:active {
    background: var(--Surface_2);
    
  }
  &:focus {
    background: var(--Surface_1);
  }
`

const S_Select = styled.select`
  display: flex;
  width: 100%;
  font-size: var(--Font_Size);
  letter-spacing: 0.4px;
  padding-left: .5rem;
  cursor: pointer;
  background: none;
  border: none;
  color: var(--Font_Color);
  height: 100%;
  user-select: none;
`

const S_Option = styled.option`
  background: var(--Background);
  color: var(--Font_Color);
`