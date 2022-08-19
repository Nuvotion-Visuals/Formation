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
  hide?: boolean
}

export const ListItemEditor = ({  onCreate, onClose, hide }: Props) => {
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
            label="Position Title"
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
            />
          </S.CountWrap>
          <Button
            text={'Create'}
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
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: .5rem;
    border-bottom: 2px solid var(--Surface_1);
  `,
  TopContainer: styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
  `,
  CountWrap: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: var(--Input_Height);
    border: none;

    select {
      height: var(--Input_Height);
      font-size: var(--Font_Size);
      border-radius: 0.5rem;
      background: none;
      box-shadow: var(--Outline);
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      padding: 0 0.75rem;
      color: var(--Font_Color);
      background: var(--Background);
    }

  `
}
