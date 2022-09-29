import React from 'react'
import styled from 'styled-components'

import { Reorder, reorderItems, Item, ItemProps, ExpandableList, Label } from '../../internal'

import { Props as ExpandableListProps } from './ExpandableList'

interface Props {
  onExpand: (index: number) => void
  value: ExpandableListProps[]
}

export const ExpandableLists = ({
  value,
  onExpand
}: Props) => {
  return (
    <S.ListEditor>
      {
        value?.map((expandableList, index) => 
          <ExpandableList {...expandableList} onExpand={() => onExpand(index)}/>  
        )
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