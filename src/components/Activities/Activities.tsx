import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { StyleHTML } from '../../internal'
import { AreaType } from '../../types'

interface Props {
  value?: AreaType[],
  onChange: Function
}

export const Activities = ({ value }: Props) => {

  useEffect(() => {
    console.log(value, '<<VALUE>>')
  })

  return (
    <S.Activities>
      <S.Header>
        {
          value?.map(value => <S.Tab>{value.area}</S.Tab>)
        }
     </S.Header>
    </S.Activities>
  )
}

const S = {
  Activities: styled.div`
    width: 100%;
    * {
    color: var(--F_Font_Color);

    }
  `,
  Header: styled.div<{}>`
    width: 100%;
    height: 4rem;
    background: #56d877;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Tab: styled.div<{}>`
    padding: 1rem;
  `
}
