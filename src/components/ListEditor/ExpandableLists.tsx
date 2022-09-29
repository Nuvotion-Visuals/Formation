import React from 'react'
import styled from 'styled-components'

import { Reorder, reorderItems, Item, ItemProps, ExpandableList, Label } from '../../internal'

import { Props as ExpandableListProps } from './ExpandableList'

interface Props {

  onReorder?: (newList : ItemProps[]) => void,
  allowReorder?: boolean,
  expandableLists: ExpandableListProps[]
}

export const ExpandableLists = ({

  onReorder,
  expandableLists
}: Props) => {


  return (
    <S.ListEditor>
      {
        expandableLists?.map(expandableList => 
          <ExpandableList {...expandableList} />  
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