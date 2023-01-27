import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Placeholders, LineBreak, Item, } from '../../internal'

type Channel = {
  name: string,
  icon: IconName,
  iconPrefix: IconPrefix,
  href: string,
  hideOptions?: boolean,
  active: boolean,
  onClick?: () => void
}

interface Props {
  channels: Channel[]
}

export const Channels = ({ channels }: Props) => {
  return (<S.Container>
    <S.Channels>
      {
        channels?.length >= 0
          ? <LineBreak />
          : <Placeholders />
      }
    
      {
        channels?.map(channel =>
          channel.name
            ? <Item
                icon={channel.icon}
                iconPrefix={channel.iconPrefix}
                href={channel.href}
                active={channel.active}
                title={channel.name}
                labelColor='none'
                name={undefined}
                onClick={channel.onClick}
              />
            : <LineBreak />
        )
      }
    </S.Channels>

  
  </S.Container>)
}

const S = {
  Container: styled.div`
    width: 100%;
  `,
  Channels: styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    /* padding: .5rem .5rem; */
    padding-bottom: 1rem;
    
  `,
  HLine: styled.div`
    width: 100%;
    border-bottom: 1px solid var(--F_Surface);
  `,
  Channel: styled.li`
    width: 100%;
    height: 100%;
    display: flex;
    gap: .5rem;
    padding: .6rem 0;
  `,
  IconContainer: styled.div`
    width: 1.25rem;
  `,
  ChannelName: styled.div<{
    active: boolean
  }>`
    display: flex;
    font-weight: ${props => props.active ? '600' : '400'};
    font-size: var(--F_Font_Size);
    height: 100%;
    align-items: center;
  `,
  Option: styled.div`
    padding-right: .375rem;
  `,
  ChannelContainer: styled.div<{
    active: boolean
  }>`
    width: 100%;
    background: ${props => props.active ? 'var(--F_Surface)' : 'none'};
    padding: 0 .5rem;
    cursor: pointer;
    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Disabled)'};
    }
    &:hover {
      background: ${props => props.active ? 'var(--F_Surface)' : 'var(--F_Surface_0)'};
      * {
        color: var(--F_Font_Color);
      }
    };
  `
}
