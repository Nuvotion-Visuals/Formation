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

/**
 * `List` is a component that renders a list of items. It supports reordering of its items if the `onReorder` function is provided.
 *
 * @component
 * @param {ItemProps[]} value - The array of item properties that will be used to render the list items.
 * @param {function} [onReorder] - The callback function that will be called with the new reordered list of items.
 * @param {string} reorderId - A unique identifier for the reorderable list.
 * @param {boolean} [indent] - If true, each item in the list will be indented.
 * @returns {JSX.Element} - The rendered list component.
 *
 * @example
 * // Basic list
 * <List value={[{ name: 'Item 1' }, { name: 'Item 2' }]} />
 *
 * @example
 * // List with reorder functionality
 * <List
 *   value={[{ name: 'Item 1' }, { name: 'Item 2' }]}
 *   onReorder={(newList) => console.log(newList)}
 *   reorderId="myList"
 * />
 */
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
              placeholder={<Item primary={true} name={' '} labelColor='none' />}
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