import React from 'react'
import styled from 'styled-components'

import { Dropdown, Avatar, getInitials, OptionsType } from '../../internal'



interface Props {
  key?: any,
  name?: string,
  avatar?: boolean,
  status?: string,
  statusColor?: string,
  options?: OptionsType
}

export const Item = ({ 
  avatar,
  name,
  options
}: Props): JSX.Element => {
  return (
    <>
      <S.ListItem avatar={avatar}>
        
        <S.AvatarContainer>
          <Avatar
            name={name ? getInitials(name) : '?'}
            color={name ? undefined : 'var(--F_Surface_2)'}
          />
        </S.AvatarContainer>
        
        <S.ResponsiveWrap>
          <S.ResponsiveTitleContainer>
            <S.Title>{name ? name : `Unassigned`}</S.Title>
          </S.ResponsiveTitleContainer>
        </S.ResponsiveWrap>
        
        {
          options
            ? <S.Absolute>
                <Dropdown
                  options={options}
                />
              </S.Absolute>
            : null
        }
        
      </S.ListItem>
    </>
  )
}

interface ListItemProps {
  avatar?: boolean
}

const S = {
  ListItem: styled.div<ListItemProps>`
    width: calc(100% - 1rem);
    padding: .5rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--F_Surface_0);
    position: relative;
    cursor: pointer;
    background: var(--F_Background_Alternating);
    &:hover {
      background: var(--F_Surface_0);
    }
    &:active {
      background: var(--F_Surface);
    }
  `,
  AvatarContainer: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
  `,
  Avatar: styled.div`
    height: 1.75rem;
    min-width: 1.75rem;
    border-radius: 50%;
    background: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--F_Outline_Label);
    font-size: var(--F_Font_Size_Label);
  `,
  ResponsiveWrap: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
  `,
  ResponsiveTitleContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
  `,
  Title: styled.div`
    font-size: var(--F_Font_Size_Label);
    font-weight: 400;
    color: var(--F_Font_Color_Label);
    padding-left: .5rem;
    display: flex;
    align-items: center;
  `,
  Absolute: styled.div`
    position: absolute;
    height: 100%;
    right: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `
}