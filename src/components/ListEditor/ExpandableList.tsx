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
  onReorder?: (newList: ItemProps[]) => void
}

export const ExpandableList = ({ 
  value,
  expanded,
  onExpand,
  onReorder
}: Props) => {

  return (<>
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
      <List value={value.list} onReorder={onReorder} />
    </S.ListContainer>
  </>)
}

const S = {
  ListContainer: styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    width: 100%;
  `
}