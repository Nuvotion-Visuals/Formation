import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button'

import { Lists } from './ListEditor'
import { Gap } from '../Gap/Gap';

interface Props {
  lists?: Lists,
  onCreate?: Function,
  onClose?: Function,
  hide?: boolean
}

export const ListItemEditor = ({  onCreate, onClose, hide }: Props) => {
  const [textValue, setTextValue] = useState('')
  const [countValue, setCountValue] = useState(1)
  const [dropdown, set_dropdown] = useState(new Array(50).fill(0).map((item, index) => index + 1))

  const dropdownItems = dropdown.map((item) =>
    <option key={item} value={item}>{item}</option>
  );

  // reset input fields upon user creating a new listItem
  const resetInput = () => {
    setTextValue('')
    setCountValue(1)
  }
  
  return (
    <S.NewPositionContainer>
      <Gap >
        <S.TopContainer >
          <TextInput
            label="Position Title"
            onChange={value=> { 
              setTextValue(value)
            }}
            value={textValue}
          />
          <S.CountWrap>
            
              <select
                name='count'
                id='count'
                value={countValue}
                onChange={(e) => setCountValue(Number(e.target.value))}
              >
              
                { dropdownItems }
              </select>
            
          </S.CountWrap>
          <Button
            text={'Create'}
            disabled={textValue === ''}
            onClick={() => {
              if (onCreate) {
                onCreate(textValue, countValue)
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
    padding-bottom: 1rem;
    border-bottom: 1px solid #bbb;
  `,
  TopContainer: styled.div`
    width: 100%;
    display: flex;
    gap: 0.75rem;
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
