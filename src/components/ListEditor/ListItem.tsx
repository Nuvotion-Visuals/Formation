import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useState } from 'react'

import { Slot } from './Slot'
import { Toolbar } from './Toolbar'

import { ListItem as ListItemType } from './ListEditor'

interface Props {
  key?: any,
  title?: string,
  background?: boolean,
  avatar?: boolean,
  unassigned?: boolean,
  status?: string,
  statusColor?: string,
  listItems?: ListItemType[],
  index: number,
  onRemove: (index: number) => void,
  onAdd?: (title: string, index: number) => void,
  blinkAnimation?: boolean
}

export const ListItem = ({ avatar,
  unassigned,
  background,
  title,
  status,
  statusColor, 
  listItems,
  index,
  onRemove,
  onAdd,
  blinkAnimation
}: Props): JSX.Element => {
  
  const [expandPosition, setExpandPosition] = useState(false)

  return (
    <>
      <S.ListItemContainer 
        onClick={() => setExpandPosition(!expandPosition)}
        blinkAnimation={blinkAnimation}
      >     
        <S.ResponsiveWrap>

          {/* NOTE: WE NEED TO SHOW PLACEHOLDER FEEDBACK WHEN WHEN THE LIST IS EMPTY  */}

          <S.ResponsiveContainer>
            <S.Title>{title ? title : `${title} is unassigned`}</S.Title>
          </S.ResponsiveContainer>

          {
            listItems
              ? <Toolbar
                  listItems={listItems}
                  index={index}
                  title={title}
                  onRemove={(index) => onRemove(index)}
                  onAdd={(title, index) => {
                    if (onAdd) {
                      onAdd(title, index)
                    }
                  }}
                  expand={expandPosition}
                />
            : ''
          }

        </S.ResponsiveWrap>
      </S.ListItemContainer>
      
      <S.PositionSlots expandPosition={expandPosition}>
        <ul>
        
          {
            listItems?.map((listItem, index) => 
              <Slot
                key={index}
                title={listItem.title}
                avatar={listItem.avatar}
                status={listItem.status}
                statusColor={listItem.statusColor}
              /> 
            )
          } 
          
        </ul>
      </S.PositionSlots>
    </>
  )
}

interface ListItemContainerProps {
  blinkAnimation: boolean | undefined
}

interface PositionSlotsProps {
  expandPosition: boolean,
}

const S = {
  ListItemContainer: styled.div<ListItemContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bbb;
    animation: ${props => props.blinkAnimation ? css`${blink} 1s linear forwards` : 'none'};

    &:hover {
      background: var(--Surface_2);
    }
  `,
  ResponsiveWrap: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    cursor: pointer;
  `,
  ResponsiveContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
  `,
  Title: styled.div`
    color: var(--Font_Color);
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    font-size: var(--Font_Size_Title);
    font-weight: 600;
    padding-left: .25rem;
  `,
  PositionSlots: styled.div<PositionSlotsProps>`
    display: ${props => props.expandPosition ? 'flex' : 'none'};
    width: 100%;

    ul {
      width: 100%;
    }
  `
}


const blink = keyframes`
  0% {
    background: var(--EC_Primary_100);
  }
  50% {
    background: var(--EC_Primary_300);
  }
  100% {
    background: var(--EC_Primary_400);
  }
`