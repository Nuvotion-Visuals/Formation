import React from 'react'
import styled from 'styled-components'

import { Reorder, reorderItems, Item, ItemProps, ExpandableList, Label } from '../../internal'

import { Props as ExpandableListProps } from './ExpandableList'

interface Props {
  onExpand: (index: number) => void
  value: ExpandableListProps[],
  onReorder?: (newValue: ExpandableListProps[]) => void
}

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
              placeholder={<Item emphasize={true} name={' '} color='none' />}
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

const S = {
  ListEditor: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `
}