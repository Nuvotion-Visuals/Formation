import React from 'react'
import styled from 'styled-components'

import { Props as ItemProps } from './Item'
import { Item } from './Item'

interface Props {
  value: ItemProps[],
  onChange: (newValue: ItemProps[]) => void
}

export const MultiExpandableList = ({
  value,
  onChange
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
  `,
  FixedWrapper: styled.div`
    width: 100%;
    z-index: 1;
  `
}