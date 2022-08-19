import React from 'react'
import styled from 'styled-components'

import { ListItem } from '../../internal'
import { Lists } from '../../internal'

interface Props {
  lists: Lists,
  onRemove: (index: number) => void,
  onAdd: (title: string, index: number) => void,
  hide?: boolean,
  lastAddedIndex?: number
}

export const ListItems = ({ lists, onRemove, onAdd, hide, lastAddedIndex }: Props) => {
  return (
    <S.ListItems hide={hide}>
      {
        lists.map((list, index) => 
          <ListItem
            key={index}
            title={list.title}
            avatar={list.avatar}
            listItems={list.listItems}
            blinkAnimation={index === lastAddedIndex}
            onRemove={(index) => onRemove(index)}
            onAdd={(title, index) => onAdd(title, index)}
            index={index}
          />
        )
      }
    </S.ListItems>
  )
}

interface ListItemsProps {
  hide?: boolean
}

const S = {
  ListItems: styled.div<ListItemsProps>`
    width: 100%;
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
  `
}