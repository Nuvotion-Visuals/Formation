import { ListEditor } from 'components'
import React from 'react'
import styled from 'styled-components'

import { Item } from '../../internal'
import { Props as ItemProps } from './Item'

interface Props {
  value: {
    item: ItemProps,
    list: ItemProps[],
  },
  expanded?: boolean,
  onExpand?: (newExpanded : boolean) => void
}

export const ExpandableList = ({ 
  value,
  expanded,
  onExpand
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
    <S.List hide={!expanded}>
      {
        value.list.map(listItem => <Item {...listItem} />)
      }
    </S.List>
  </>)
}

const S = {
  List: styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
  `
}