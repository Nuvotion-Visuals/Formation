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
      <S_ChannelContainer 
        active={active}
      >
          <Box width='100%'>
            <S_Channel >
              <S_IconContainer>
                <Icon icon={icon} iconPrefix={iconPrefix} />
              </S_IconContainer>
              <S_ChannelName>{ name }</S_ChannelName>
            </S_Channel>
            <Spacer />
            {
              hideOptions
                ? null
                : <S_Option>
                    <Icon icon='ellipsis-v' iconPrefix='fas'/>
                  </S_Option>
            }
          </Box>
      </S_ChannelContainer>
    )
  }

  return (<>
    <S_Channels>
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
        active={false}
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
    </S_Channels>

    <S_HLine />

    <S_Channels>
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
    </S_Channels>
    </>)
}


const S_Channels = styled.ul`
  width: calc(100% - 1rem);
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  padding: .5rem .5rem;
  * {
    color: var(--Font_Color_Label);
  }
`

const S_HLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #bbb;
`

const S_ChannelContainer = styled.div<{
  active: boolean
}>`
  width: 100%;
  font-weight: ${props => props.active ? '600' : '400'};
  background: ${props => props.active ? 'var(--Surface_2)' : 'none'};
  padding: 0 .5rem;
  border-radius: .25rem;

  &:hover {
    background: ${props => props.active ? 'var(--Surface_2)' : 'var(--Surface_1)'};
  };
`

const S_Channel = styled.li`
  width: 100%;
  display: flex;
  gap: .5rem;
  padding: .5rem 0;
`

const S_IconContainer = styled.div`
  width: 1.25rem;
`

const S_ChannelName = styled.div`
  display: flex;
`

const S_Option = styled.div`
  color: var(--Font_Color_Label);
  padding-right: .375rem;
`