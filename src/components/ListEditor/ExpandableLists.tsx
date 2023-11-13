import React from 'react'
import styled from 'styled-components'

import { Reorder, reorderItems, Item, ItemProps, ExpandableList, Label } from '../../internal'

import { Props as ExpandableListProps } from './ExpandableList'

interface Props {
  onExpand: (index: number) => void
  value: ExpandableListProps[],
  onReorder?: (newValue: ExpandableListProps[]) => void
}

/**
 * `ExpandableLists` is a component that renders a collection of expandable lists. Each list can be expanded or collapsed, and optionally, the lists can be reordered.
 *
 * @component
 * @param {ExpandableListProps[]} value - An array of properties for each expandable list.
 * @param {function} onExpand - Callback function that is called when a list item is expanded. It receives the index of the expanded item.
 * @param {function} [onReorder] - Optional callback function for reordering the list items. If provided, it enables reordering functionality.
 *
 * @example
 * // Basic usage with expand functionality
 * <ExpandableLists
 *   value={[
 *     { title: 'List 1', content: ['Item 1', 'Item 2'], expanded: false },
 *     { title: 'List 2', content: ['Item 3', 'Item 4'], expanded: false }
 *   ]}
 *   onExpand={(index) => console.log('Expanded list at index:', index)}
 * />
 *
 * @example
 * // Usage with expand and reorder functionality
 * <ExpandableLists
 *   value={[
 *     { title: 'List 1', content: ['Item 1', 'Item 2'], expanded: false },
 *     { title: 'List 2', content: ['Item 3', 'Item 4'], expanded: false }
 *   ]}
 *   onExpand={(index) => console.log('Expanded list at index:', index)}
 *   onReorder={(newOrder) => console.log('New order:', newOrder)}
 * />
 */
export const ExpandableLists = ({
  value,
  onExpand,
  onReorder
}: Props) => {
  return (
    <>
      {
        onReorder
          ? <Reorder 
              onChange={(event: any, previousIndex: any, nextIndex: any, fromId: any, toId: any) => {
                onReorder([...reorderItems(value, previousIndex, nextIndex)])
              }} 
              reorderId='reorder' 
              holdTime={200}
              placeholder={<Item emphasize={true} name={' '} labelColor='none' />}
            >
              {
                value?.map((expandableList, index) => 
                  <ExpandableList 
                    {...expandableList} 
                    key={String(index)}
                    onExpand={() => onExpand(index)} 
                    reorderId={String(index)}
                    onReorder={newValue => 
                      onReorder(value.map((expandableList, i) => 
                        i === index
                          ? {
                              ...expandableList,
                              list: newValue
                            }
                          : expandableList
                        
                      ))
                    }
                  />  
                )
              }
            </Reorder>
          : <>
              {
                value?.map((expandableList, index) => 
                  <ExpandableList {...expandableList} onExpand={() => onExpand(index)}/>  
                )
              }
            </>
      }
    </>
  )
}
