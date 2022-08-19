import React from 'react'
import styled from 'styled-components'

import { ListItemType } from '../../internal'

import { Icon } from '../../internal'
import { Dropdown } from '../../internal'

interface Props {
  listItems: ListItemType[],
  onClick?: any,
  expand?: any,
  index: number,
  title?: string,
  onRemove: (index: number) => void,
  onAdd: (title: string, index: number) => void,
}

export const Toolbar = ({ 
  listItems,
  onClick,
  expand,
  index,
  title,
  onRemove,
  onAdd,
}: Props) => {
  return (
    <S.ListItemToolbar>
      <S.PositionState>
        {
          listItems.length > 0
            ?  (<>
                  <S.PositionCapacity>
                    {`1 / ` + listItems?.length}
                  </S.PositionCapacity>
                  <S.IconContainer>
                    <S.IconTransform onClick={onClick}>
                      <Icon icon={expand ? 'chevron-up' : 'chevron-down'} iconPrefix='fas'/>
                    </S.IconTransform>
          
                    <Dropdown
                      options={[
                        {
                          icon: 'ellipsis-v',
                          iconPrefix: 'fas',
                          dropDownOptions: [
                            {
                              icon: 'edit',
                              text: 'Edit',
                              onClick: () => {}
                            },
                            {
                              icon: 'trash-alt',
                              text: 'Remove',
                              onClick: () => onRemove(index)
                            },
                          ]
                        }
                      ]}
                    
                    />
                  </S.IconContainer>
                </>
          )
          : (<S.AddItem
                onClick={() => {
                  if (title) {
                    onAdd(title, index)
                  }
                }}
                
              >  
            <Icon icon='plus' iconPrefix='fas'/>
              </S.AddItem>
          )
        }
      </S.PositionState>
    </S.ListItemToolbar>
  )
}

const S = {
  ListItemToolbar: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `,
  PositionState: styled.div`
    display: flex;
    flex-wrap: nowrap;
  `,
  PositionCapacity: styled.div`
    font-size: var(--Font_Size);
    color: var(--Font_Color_Label);
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  IconContainer: styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    margin-left: 1.5rem;
  `,
  IconTransform: styled.div`
    margin-right: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
  `,
  AddItem: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
  `
}
