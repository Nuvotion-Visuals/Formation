import React from 'react'

import styled from 'styled-components'

import { AspectRatio, Icon, Dropdown } from '../../internal'

import { Channels } from './Channels'

interface Props {
  title: string,
  src?: string,
  dateString?: string,
  location?: string,
  channels: any
}

export const SpaceSidebar = ({  
  title,
  src,
  dateString,
  location,
  channels
}: Props) => {
  return (
    <S.SpaceSidebar>
      <>
        {
          <AspectRatio 
            ratio={2}
            coverBackground={true}
            backgroundSrc={src} 
          />
        }
        <S.HeaderArea>
          <header>
            <S.Title>
              { 
                title
              }
            </S.Title>
          </header>

          <S.Absolute>
          <Dropdown
            options={[
              {
                icon: 'ellipsis-v',
                iconPrefix: 'fas',
                dropDownOptions: [
                  {
                    icon: 'user-plus',
                    iconPrefix: 'fas',
                    text: 'Invite'
                  },
                  {
                    icon: 'share',
                    iconPrefix: 'fas',
                    text: 'Share'
                  },
                  {
                    icon: 'archive',
                    iconPrefix: 'fas',
                    text: 'Archive',
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

          {
            dateString || location
              ? <S.DetailsContainer>
                  {
                    dateString
                      ? <S.Details>
                          <Icon icon='calendar-alt' iconPrefix='fas' fixedWidth size='sm'/>
                          <S.Detail>
                            {
                              dateString
                            }
                          </S.Detail>
                        </S.Details>
                      : null
                  }
      
                  {
                    location
                      ? <S.Details>
                          <Icon icon='map-marker-alt' iconPrefix='fas' fixedWidth size='sm' />
                          <S.Detail>
                            {
                              location
                            }
                          </S.Detail>
                        </S.Details>
                      : null
                  }
                </S.DetailsContainer>
              : null
          }
        </S.HeaderArea>
      
        <Channels 
          channels={channels}
        />

      </>
    </S.SpaceSidebar>
  )
}

const S = {
  Absolute: styled.div`
    position: absolute;
    right: .5rem;
    bottom: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `,
  SpaceSidebar: styled.div`
    width: 100%;
    height: calc(100vh - var(--F_Header_Height));
    margin-left: 74px;
    flex-wrap: wrap;
    overflow-x: hidden;
    border-right: 2px solid var(--F_Surface);
    ::-webkit-scrollbar {
      width: .25rem;
      height: .25rem;
    }
  `,
  HeaderArea: styled.div`
    position: relative;
    padding: 1rem;
    border-bottom: 2px solid var(--F_Surface);
  `,
  Title: styled.h1`
    font-size: 20px;
    padding: 0;
    margin: 0;
    line-height: 1.25em;
    /* margin-top: -0.25rem; */
  `,
  DetailsContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .65rem;
    margin-top: .75rem;
  `,
  Details: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    color: var(--F_Font_Color_Disabled);
  `,
  Detail: styled.div`
    font-size: var(--F_Font_Size_Label);
  `
}