import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'

import { TextInput } from '../../internal'
import { Button } from '../../internal'

import { Lists } from '../../internal'
import { Gap } from '../../internal'
import { Select } from '../../internal'

interface Props {
  lists?: Lists,
  onCreate?: Function,
  onClose?: Function,
  hide?: boolean,
  label?: string
}

export const ListItemEditor = ({  onCreate, onClose, hide, label }: Props) => {
  const [text, set_text] = useState('')
  const [count, set_count] = useState(1)

  // reset input fields upon user creating a new listItem
  const resetInput = () => {
    set_text('')
    set_count(1)
  }
  
  return (
    <S.NewPositionContainer>
    <Gap >
        <S.TopContainer >
          <TextInput
            label={label}
            onChange={value=> { 
              set_text(value)
            }}
            value={text}
          />
          <S.CountWrap>
            <Select
              options={new Array(50).fill(0).map((item, index) => { 
                return (index + 1).toString()
              })}
              onChange={value => set_count(Number(value))}
              value={count.toString()}
              label={'Count'}
            />
          </S.CountWrap>
          <Button
            icon='plus'
            iconPrefix='fas'
            text={'Add'}
            disabled={text === ''}
            onClick={() => {
              if (onCreate) {
                onCreate(text, count)
              }
              resetInput()
            }}
          />
        </S.TopContainer>
    </Gap>
    </S.NewPositionContainer>
  )
}

const S = {
  NewPositionContainer: styled.div`
    width: calc(100% - 1rem);
    position: relative;
    display: flex;
    align-items: center;
    padding: .75rem .5rem;
    border-bottom: 2px solid var(--F_Surface);
  `,
  TopContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  CountWrap: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: var(--F_Input_Height);
    border: none;

    select {
      height: var(--F_Input_Height);
      font-size: var(--F_Font_Size);
      border-radius: 0.5rem;
      background: none;
      box-shadow: var(--F_Outline);
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      padding: 0 0.75rem;
      color: var(--F_Font_Color);
      background: var(--F_Background);
    }

  `
}
