import styled, { keyframes, css } from 'styled-components'

import React, { useState, useRef } from 'react'
import { Icon } from '../../internal'
import { Gap } from '../../internal'
import { Dropdown, OptionsType } from '../../internal'

type SearchType = {
  value?: string, 
  placeholder?: string, 
  onChangeFunction?: Function, 
  onKeyDownFunction?: Function, 
  onSubmitHandler?: Function, 
  onClearFunction?: Function,
  invalidInput?: boolean, 
  id?: string,
  initialValue: string,
  autoFocus?: boolean,
  sortOptions?: OptionsType,
  filterOptions?: OptionsType
}

export const Search = React.memo(({ 
  value, 
  placeholder, 
  onChangeFunction, 
  onKeyDownFunction, 
  onClearFunction,
  onSubmitHandler,
  invalidInput, 
  id,
  initialValue,
  autoFocus,
  sortOptions,
  filterOptions
}: SearchType) => {

  const [searchQuery, setSearchQuery] = useState(initialValue)

  const ref = useRef<HTMLInputElement>(null)

  const clear = () => {
    if (onSubmitHandler) {
      onSubmitHandler('')
    }
    if (onClearFunction) {
      onClearFunction()
    }
    setSearchQuery('');
    (ref.current as HTMLInputElement).focus()
  }

  return (<Gap disableWrap={true}>
    <S.SearchContainer>
      
      <S.Search
        ref={ref}
        value={searchQuery}
        placeholder={'Search'} 
        type='text' 
        onChange={e => {
          onChangeFunction ? onChangeFunction(e.target.value) : ()=>{}
          setSearchQuery(e.target.value)
        }}
        onKeyDown={onKeyDownFunction ? onKeyDownFunction as React.KeyboardEventHandler<HTMLInputElement> : ()=>{}}
        invalidInput={invalidInput}
        id={id}
        hero={true}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            if (onSubmitHandler) {
              onSubmitHandler(searchQuery)
            }
          }
        }}
        autoFocus={autoFocus}
      />

      <S.ClearContainer onClick={clear}>
        <Icon icon='times' iconPrefix='fas' />
      </S.ClearContainer>

      <S.IconContainer onClick={() => onSubmitHandler ? onSubmitHandler(searchQuery) : null}>
        <Icon icon='search' iconPrefix='fas' />
      </S.IconContainer>
    </S.SearchContainer>

    {
      sortOptions
        ?  <Dropdown
              options={sortOptions}
            />
        : null
    }

    {
      filterOptions
        ? <Dropdown
            options={filterOptions}
          />
        : null
    }
    </Gap>
  )
})

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

const S = {
  SearchContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    box-shadow: var(--Outline);
    border-radius: 16px;
    background: var(--Background_Alternating);
    &:hover, &:focus, &:focus-within {
      box-shadow: var(--Outline_Hover);
      i {
        color: var(--Font_Color);
      }
      
    }
  `,
  IconContainer: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 12px;
    color: var(--Font_Color_Label);
    height: var(--Input_Height);
    border-radius: 0 1rem 1rem 0;
    padding: 0 2rem;
    background: var(--Surface);
    &:hover, &:active {
      background: var(--Surface_1);
    }
  `,
  ClearContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    right: 0;
    height: var(--Input_Height);
    padding: 0 1rem;
    cursor: pointer;
    * {
      color: var(--Font_Color_Label);
    }
    &:hover, &:active {
      * {
        color: var(--Font_Color);
      }
    }
  `,
  Search: styled.input<SearchProps>`
    background: none;
    color: black;
    border: none;
    padding: 0px 16px;
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    color: var(--Font_Color);
    font-size: var(--Font_Size);
    border-radius: var(--Input-Radius);
    border-radius: 0px 16px 16px 0px;
    font-size: ${props => props.hero ? 'var(--Font_Size_Title)' : 'var(--Font_Size)'};
    width: 100%;
    animation: ${props => props.invalidInput ? css`0.7s ease-out 0s 1 ${shake} forwards` : 'none'};
  `
}

interface SearchProps {
  hero?: boolean,
  invalidInput?: boolean
}