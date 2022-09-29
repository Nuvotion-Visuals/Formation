import React from 'react'
import styled from 'styled-components'

import { Item, List, ItemProps } from '../../internal'

export interface Props {
  value: {
    item: ItemProps,
    list: ItemProps[],
  },
  expanded?: boolean,
  onExpand?: (newExpanded : boolean) => void,
  onReorder?: (newList: ItemProps[]) => void,
  reorderId: string
}

export const ExpandableList = ({ 
  value,
  expanded,
  onExpand,
  onReorder,
  reorderId
}: Props) => {

  return (<S.Container hide={false}>
    <Item 
      {...value.item} 
      onClick={() => {
        if (onExpand && expanded !== undefined) {
          onExpand(expanded)
        }
        if (value.item?.onClick) {
          value.item?.onClick()
        }
      }}
    />
    <S.ListContainer hide={!expanded}>
      <List value={value.list} onReorder={onReorder} reorderId={reorderId}/>
    </S.ListContainer>
  </S.Container>)
}

const S = {
  Container: styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    width: 100%;
  `,
  ListContainer: styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    padding-left: .5rem;
    width: calc(100% - .5rem);
    background: var(--F_Surface_0);
  `
}