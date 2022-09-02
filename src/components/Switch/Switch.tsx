import styled, { css, keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'

interface Props {
  value: boolean,
  handleToggle: Function
}


export const Switch = ({ value, handleToggle }: Props) => {
    
  return (
        <S.Container>
          <S.Input
            checked={value}
            onChange={handleToggle ? (e) => handleToggle(e) : () => {}}
            type="checkbox"
          />
          <S.Label>
            <S.Span/>
          </S.Label>
        </S.Container>
      );
};
  
const S = {
  Container: styled.div<{}>`
    width: 100%;
    height: 45px; 
    background: blue;
  `,
  Input: styled.input<{}>`
    
  `,
  Label: styled.label<{}>`
    
  `,
  Span: styled.span<{}>`
    
  `
}
