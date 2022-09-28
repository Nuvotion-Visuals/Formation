import React from 'react'
import styled from 'styled-components'

import { Props as ItemProps } from './Item'
import { Item } from './Item'

interface Props {
  value: ItemProps[]
}

export const List = ({
  value,
}: Props) => {

  return (
    <S.ListEditor>
      {
        value.map(props => <Item {...props} />)
      }
    </S.ListEditor>
  )
}

const S = {
  ListEditor: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `
}