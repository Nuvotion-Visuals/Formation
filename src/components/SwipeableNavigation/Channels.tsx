import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Spacer, Box } from '../../internal'

interface Props {
  
}

export const Channels = ({  }: Props) => {
  const activeEventGuid = 'test'

  const channels = [
    'Everyone',
    'Organizers',
    'Production',
    'Performers',
    'Doors',
    'Bar'
  ]

  const Channel = ({ name, icon, route, iconPrefix, hideOptions, active }:
    {
      name: string,
      icon: IconName,
      iconPrefix: IconPrefix,
      route: string,
      hideOptions?: boolean,
      active: boolean
    }) => {

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

  return (<>
    <S.Channels>
      <Channel
        name='Details'
        icon='info-circle'
        iconPrefix='fas'
        route={`/events/${activeEventGuid}`}
        hideOptions={true}
        active={false}
      />
      <Channel
        name='People'
        icon='users'
        iconPrefix='fas'
        route={`/events/${activeEventGuid}/people`}
        hideOptions={true}
        active={true}
      />
      <Channel
        name='Tasks'
        icon='check-square'
        iconPrefix='fas'
        route={`/events/${activeEventGuid}/tasks`}
        hideOptions={true}
        active={false}
      />
      <Channel
        name='Areas'
        icon='compass'
        iconPrefix='fas'
        route={`/events/${activeEventGuid}/areas`}
        hideOptions={true}
        active={false}
      />
    </S.Channels>

    <S.HLine />

    <S.Channels>
      {
        channels.map((channel, index) => 
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
  </>)
}

const S = {
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
  `
}
