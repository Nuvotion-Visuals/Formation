import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Spacer, Box } from '../../internal'

type Channel = {
  name: string,
  icon: IconName,
  iconPrefix: IconPrefix,
  route: string,
  hideOptions?: boolean,
  active: boolean
}

interface Props {
  channels: Channel[]
}

export const Channels = ({ channels }: Props) => {
  const activeEventGuid = 'test'

  const Channel = ({ 
    name, 
    icon, 
    route, 
    iconPrefix, 
    hideOptions, 
    active 
  } : Channel ) => {
    return (
      <S.ChannelContainer 
        active={active}
      >
        <Box width='100%'>
          <S.Channel >
            <S.IconContainer>
              <Icon icon={icon} iconPrefix={iconPrefix} fixedWidth/>
            </S.IconContainer>
            <S.ChannelName>{ name }</S.ChannelName>
          </S.Channel>
          <Spacer />
          {
            hideOptions
              ? null
              : <S.Option>
                  <Icon icon='ellipsis-v' iconPrefix='fas'/>
                </S.Option>
          }
        </Box>
      </S.ChannelContainer>
    )
  }

  return (<S.Container>
    <S.Channels>
      {
        channels.map(channel =>
          <Channel
            {...channel}
          />
        )
      }
    </S.Channels>

    <S.HLine />

    <S.Channels>
      {
        [
          'Everyone',
          'Organizers',
          'Production',
          'Performers',
          'Doors',
          'Bar'
        ].map((channel, index) => 
          <Channel 
            key={index}
            name={channel} 
            icon={'hashtag'}
            iconPrefix='fas'
            route={`/events/${activeEventGuid}/chat/${channel}`}
            active={false}
          />
        )
      }

    </S.Channels>
  </S.Container>)
}

const S = {
  Container: styled.div`
    width: 100%;
    margin-bottom: 5.5rem;
  `,
  Channels: styled.ul`
    width: calc(100% - 1rem);
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    padding: .5rem .5rem;

    * {
      color: var(--F_Font_Color_Disabled);
    }
  `,
  HLine: styled.div`
    width: 100%;
    border-bottom: 2px solid var(--F_Surface);
  `,
  Channel: styled.li`
    width: 100%;
    display: flex;
    gap: .5rem;
    padding: .5rem 0;
  `,
  IconContainer: styled.div`
    width: 1.25rem;
  `,
  ChannelName: styled.div`
    display: flex;
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
    border-radius: .25rem;
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
  `,
  BottomSpacer: styled.div`
    width: 100%;
    height: var(--F_Header_Height);
  `
}
