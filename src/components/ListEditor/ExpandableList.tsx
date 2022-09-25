import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { Avatar, Spacer, Toolbar } from '../../internal'
import { ListItemType, Dropdown } from '../../internal'
import { List } from './List'

interface Props {
  key?: any,
  title?: string,
  listItems?: ListItemType[],
  index: number,
  onRemove: (index: number) => void,
  onAdd?: (title: string, index: number) => void,
  blinkAnimation?: boolean
}

export const ExpandableList = ({ 
  title,
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
          <Avatar
            icon={expandPosition ? 'chevron-up' : 'chevron-down'}
            iconPrefix='fas'
            color='none'
          />

          <S.Title>{ title }</S.Title>

          <Spacer />

          <Dropdown
            options={[
              {
                icon: 'ellipsis-vertical',
                iconPrefix: 'fas',
                dropDownOptions: [
                  {
                    icon: 'edit',
                    iconPrefix: 'fas',
                    text: 'Edit'
                  },
                  {
                    icon: 'trash-alt',
                    iconPrefix: 'fas',
                    text: 'Trash'
                  }
                ]
              }
            ]}
          />

        </S.ResponsiveWrap>
      </S.ListItemContainer>
      
      <List 
        list={listItems}
        hide={!expandPosition}
      />
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
    font-size: var(--F_Font_Size);
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