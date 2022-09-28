import React from 'react'
import styled from 'styled-components'

import { Props as ItemProps } from './Item'

import { Reorder, reorderItems, Item } from '../../internal'

interface Props {
  value: ItemProps[],
  onReorder?: (newList : ItemProps[]) => void,
  allowReorder?: boolean
}

export const List = ({
  value,
  onReorder,
}: Props) => {


  return (
    <S.ListEditor>
      {
        onReorder
          ? <Reorder 
              onChange={(event: any, previousIndex: any, nextIndex: any, fromId: any, toId: any) => {
                onReorder([...reorderItems(value, previousIndex, nextIndex)])
              }} 
              reorderId='1' 
              holdTime={200}
              placeholder={<Item emphasize={true} name={' '} color='none' />}
            >
              {
                value.map(props => <Item {...props} />)
              }
            </Reorder>
          : <>
              {
                value.map(props => <Item {...props} />)
              }
            </>
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