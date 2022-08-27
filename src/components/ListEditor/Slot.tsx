import React from 'react'
import styled from 'styled-components'

import { Dropdown } from '../../internal'

const genPastelFromGuid = (guid : string) => {
  if (guid) {
    const range = guid?.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 100
    var hue = Math.floor((range / 100) * 360);
    var pastel = 'hsl(' + hue + ', 100%, 80%)'   
    return pastel 
  }
  return 'white'
}

const initials = (name : string) => name?.split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("")

interface Props {
  key?: any,
  title?: string,
  avatar?: boolean,
  status?: string,
  statusColor?: string,
}

export const Slot = ({ avatar,
  title,
  status,
  statusColor,
}: Props): JSX.Element => {
  
  // const renderStatusChip = (PositionInviteStatus) => {
  //   switch (PositionInviteStatus.type) {
  //     case PositionInviteStatus.confirmed:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.awaitintResponse:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.inviteDenied:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.inviteNotSent:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.applicationReceived:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //     case PositionInviteStatus.applicationDenied:
  //       return <S.StatusChip status={status} statusColor={statusColor}>{ status }</S.StatusChip>
  //   }
  // }

  return (
    <>
      <S.ListItem avatar={avatar}>
        
        <S.AvatarContainer>
          <S.Avatar color={title ? genPastelFromGuid(title) : genPastelFromGuid(String(Math.random()))}>
            {
              title ? initials(title) : '?'
            }
          </S.Avatar>
        </S.AvatarContainer>
        
        <S.ResponsiveWrap>
          <S.ResponsiveTitleContainer>
            <S.Title>{title ? title : `Unassigned`}</S.Title>
            
            {/* {
              renderStatusChip(PositionInviteStatus)
            } */}
          </S.ResponsiveTitleContainer>
        </S.ResponsiveWrap>
        
        <S.Absolute>
          <Dropdown
            options={[
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas',
                dropDownOptions: 
                  title
                    ? [
                        {
                          icon: 'user',
                          iconPrefix: 'fas',
                          text: 'View profile'
                        },
                        {
                          icon: 'paper-plane',
                          text: 'Message',
                        },
                        {
                          icon: 'handshake-angle',
                          iconPrefix: 'fas',
                          text: 'Set status'
                        },
                        {
                          icon: 'trash-alt',
                          text: 'Remove',
                        },
                      ] 
                    : [
                        {
                          icon: 'user-plus',
                          iconPrefix: 'fas',
                          text: 'Assign'
                        },
                        {
                          icon: 'trash-alt',
                          text: 'Remove',
                        },
                      ] 
                
              }
            ]}
          />
        </S.Absolute>
      </S.ListItem>
    </>
  )
}

interface ListItemProps {
  avatar?: boolean
}


interface StatusChipProps {
  status?: string,
  statusColor?: string
}

const S = {
  ListItem: styled.div<ListItemProps>`
    width: 100%;
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
    font-size: var(--F_Font_Size);
    font-weight: 400;
    color: var(--F_Font_Color_Label);
    padding-left: .5rem;
    display: flex;
    align-items: center;
  `,
  StatusChip: styled.div<StatusChipProps>`
    width: fit-content;
    height: 1rem;
    padding: 0 .5rem;
    display: ${props => props.status ? 'flex' : 'none'};
    align-items: center;
    font-size: var(--F_Font_Size_Tiny);
    color: var(--EC_Black_700);
    line-height: 8px;
    text-transform: lowercase;
    border-radius: 12px;
    margin-left: 0.75rem;
    background: ${props => props.statusColor};
    margin-top: .25rem;
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