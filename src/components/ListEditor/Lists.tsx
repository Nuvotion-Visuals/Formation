import React from 'react'
import styled from 'styled-components'

import { ListItem } from '../../internal'


import { ExpandableList } from './ExpandableList'

import { ListType } from './MultiExpandableList'

interface Props {
  lists: ListType[],
  onRemove: (index: number) => void,
  onAdd: (name: string, index: number) => void,
  hide?: boolean,
  lastAddedIndex?: number
}

export const Lists = ({ lists, onRemove, onAdd, hide, lastAddedIndex }: Props) => {
  return (
    <S.Lists hide={hide}>
      {
        lists.map((list, index) => 
          <ExpandableList
            index={index}
            key={index}
            name={list.name}
            listItems={list.listItems}
            onRemove={() => {}}
          />
        )
      }
    </S.Lists>
  )
}

interface ListsProps {
  hide?: boolean
}

const S = {
  Lists: styled.div<ListsProps>`
    width: 100%;
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
  `
}