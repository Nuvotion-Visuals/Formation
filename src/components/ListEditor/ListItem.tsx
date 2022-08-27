import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useState } from 'react'

import { Slot } from '../../internal'
import { Toolbar } from '../../internal'
import { ListItemType } from '../../internal'

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
      
      <S.PositionSlots hide={!expandPosition}>
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
      </S.PositionSlots>
    </>
  )
}

interface ListItemContainerProps {
  blinkAnimation: boolean | undefined
}

interface PositionSlotsProps {
  hide: boolean,
}

const S = {
  ListItemContainer: styled.div<ListItemContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--F_Surface_0);
    animation: ${props => props.blinkAnimation ? css`${blink} 1s linear forwards` : 'none'};
    
  `,
  ResponsiveWrap: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background: var(--F_Surface_0);
    }
    &:active {
      background: var(--F_Surface);
    }
  `,
  ResponsiveContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
  `,
  Title: styled.div`
    color: var(--F_Font_Color_Label);
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Title);
    padding-left: .25rem;
  `,
  PositionSlots: styled.div<PositionSlotsProps>`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-wrap: wrap;
    width: 100%;
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