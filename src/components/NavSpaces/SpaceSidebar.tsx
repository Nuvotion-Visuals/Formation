import React from 'react'

import styled from 'styled-components'

import { AspectRatio, Icon, Dropdown, Spacer, getLabelColor, LabelColor } from '../../internal'

import { Channels } from './Channels'

interface Props {
  name?: string,
  src?: string,
  dateString?: string,
  location?: string,
  channels: any,
  labelColor?: LabelColor
}

export const SpaceSidebar = ({  
  name,
  src,
  dateString,
  location,
  channels,
  labelColor
}: Props) => {
  return (
    <S.SpaceSidebar>
      <Spacer />
      <>
        {
          src || labelColor
            ? <AspectRatio 
                ratio={src ? 2 : 20}
                coverBackground={true}
                backgroundSrc={src} 
                backgroundColor={
                  labelColor
                    ? getLabelColor(labelColor)
                    : undefined
                }
              />
          : null
        }
        <S.HeaderArea>
          <header>
            <S.Name>
              { 
                name ? name : 'No name yet'
              }
            </S.Name>
          </header>

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
    right: .75rem;
    top: .75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `,
  SpaceSidebar: styled.div`
    width: calc(100% - 1px);
    flex-wrap: wrap;
    overflow-x: hidden;
    border-right: 1px solid var(--F_Surface);
    ::-webkit-scrollbar {
      width: .25rem;
      height: .25rem;
    }
  `,
  HeaderArea: styled.div`
    position: relative;
    padding: .75rem;
  `,
  Name: styled.h1`
    font-size: 20px;
    padding: 0;
    margin: 0;
    line-height: 1.25em;
    padding-right: 1.25rem;
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