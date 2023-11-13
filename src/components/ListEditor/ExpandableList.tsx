import React from 'react'
import styled from 'styled-components'

import { Item, List, ItemProps, LineBreak } from '../../internal'

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

/**
 * `ExpandableList` is a component that renders a list item with an option to expand and reveal a nested list of items.
 *
 * @component
 * @param {Object} value - An object containing the main item and the nested list of items.
 * @param {ItemProps} value.item - Properties for the main list item.
 * @param {ItemProps[]} value.list - An array of properties for each item in the nested list.
 * @param {boolean} [expanded] - Indicates whether the nested list is currently expanded.
 * @param {function} [onExpand] - Callback function that is called when the list item is clicked to toggle its expanded state.
 * @param {function} [onReorder] - Optional callback function for reordering the items in the nested list.
 * @param {string} reorderId - A unique identifier for the nested list to maintain the reorder state.
 *
 * @example
 * // Basic usage to display an expandable list
 * <ExpandableList
 *   value={{
 *     item: { name: 'Main Item', icon: 'folder' },
 *     list: [{ name: 'Sub Item 1' }, { name: 'Sub Item 2' }]
 *   }}
 *   expanded={false}
 *   onExpand={(newExpanded) => console.log('Expanded:', newExpanded)}
 *   reorderId="my-expandable-list"
 * />
 *
 * @example
 * // Usage with expand and reorder functionality
 * <ExpandableList
 *   value={{
 *     item: { name: 'Main Item', icon: 'folder' },
 *     list: [{ name: 'Sub Item 1' }, { name: 'Sub Item 2' }]
 *   }}
 *   expanded={true}
 *   onExpand={(newExpanded) => console.log('Expanded:', newExpanded)}
 *   onReorder={(newList) => console.log('New list order:', newList)}
 *   reorderId="my-expandable-list"
 * />
 */
export const ExpandableList = React.memo(({ 
  value,
  expanded,
  onExpand,
  onReorder,
  reorderId
}: Props) => {

  return (<S.Container hide={false}>
    <Item 
      {...value.item} 
      onClick={(e) => {
        if (onExpand && expanded !== undefined) {
          onExpand(expanded)
        }
        if (value.item?.onClick) {
          value.item?.onClick(e)
        }
      }}
    />
    {/* <LineBreak /> */}
    <S.ListContainer hide={!expanded}>
      <List value={value.list} onReorder={onReorder} reorderId={reorderId} indent={true}/>
    {/* <LineBreak /> */}

    </S.ListContainer>
  </S.Container>)
})

const S = {
  Container: React.memo(styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    width: 100%;
  `),
  ListContainer: React.memo(styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    width: 100%;
  `)
}