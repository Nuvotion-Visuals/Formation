import React from 'react'
import styled from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon, Spacer, Box, getLinkComponent, LineBreak } from '../../internal'

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
  const Link = getLinkComponent()

  const Channel = ({ 
    name, 
    icon, 
    href, 
    iconPrefix, 
    hideOptions, 
    active,
    onClick
  } : Channel ) => {
    return (
      <S.ChannelContainer 
        active={active}
        onClick={onClick}
      >
        <Link href={href}>
          <Box width='100%'>
            <S.Channel >
              <S.IconContainer>
                <Icon icon={icon} iconPrefix={iconPrefix} fixedWidth/>
              </S.IconContainer>
              <S.ChannelName active={active}>{ name }</S.ChannelName>
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
        </Link>
      </S.ChannelContainer>
    )
  }

  return (<S.Container>
    <S.Channels>
      <LineBreak />
      {
        channels?.map(channel =>
          channel.name
            ? <Channel
                {...channel}
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
    margin-bottom: 6.325rem;
  `,
  Channels: styled.ul`
    width: calc(100% - 1rem);
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    padding: .5rem .5rem;
    gap: .25rem;

    * {
      color: var(--F_Font_Color_Disabled);
      text-decoration: none;
    }
  `,
  HLine: styled.div`
    width: 100%;
    border-bottom: 2px solid var(--F_Surface);
  `,
  Channel: styled.li`
    width: 100%;
    height: 100%;
    display: flex;
    gap: .5rem;
    padding: .5rem 0;
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
