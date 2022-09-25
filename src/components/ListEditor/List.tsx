import React from 'react'
import styled from 'styled-components'
import { ListItemType } from '../../internal'

import { Item } from './Item'

interface Props {
  list?: ListItemType[],
  hide?: boolean
}

export const List = ({ list, hide }: Props) => {
  return (<S.List hide={hide}>
    {
      list?.map((listItem, index) => 
        <Item
          key={index}
          title={listItem.title}
          avatar={listItem.avatar}
          status={listItem.status}
          statusColor={listItem.statusColor}
        /> 
      )
    } 
  </S.List>)
}

const S = {
  List: styled.div<{
    hide?: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    width: 100%;
  `
}