import React from 'react'
import styled from 'styled-components'

import { Reorder, reorderItems, Item, ItemProps } from '../../internal'

interface Props {
  value: ItemProps[],
  onReorder?: (newList : ItemProps[]) => void,
  allowReorder?: boolean,
  reorderId: string,
  indent?: boolean
}

export const List = React.memo(({
  value,
  onReorder,
  reorderId,
  indent
}: Props) => {


  return (
    <S.ListEditor>
      {
        onReorder
          ? <Reorder 
              onChange={(event: any, previousIndex: any, nextIndex: any, fromId: any, toId: any) => {
                onReorder([...reorderItems(value, previousIndex, nextIndex)])
              }} 
              reorderId={reorderId} 
              holdTime={200}
              placeholder={<Item emphasize={true} name={' '} labelColor='none' />}
            >
              {
                value.map(props => <Item {...props} indent={indent}/>)
              }
            </Reorder>
          : <>
              {
                value.map(props => <Item {...props} indent={indent} />)
              }
            </>
      }
      
    </S.ListEditor>
  )
})

const S = {
  ListEditor: React.memo(styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `)
}