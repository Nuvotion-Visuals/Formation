import React from 'react'

import styled from 'styled-components'

import { AspectRatio } from '../../internal'

import { Channels } from './Channels'

interface Props {
  
}

export const SpaceSidebar = ({  }: Props) => {
  return (
    <S.SpaceSidebar>
      <>
        {
          <AspectRatio 
            ratio={2}
            coverBackground={true}
            backgroundSrc={`https://api.avsync.live/uploads/medium_jive_djs_d7e9e4490a.jpg`} 
          />
        }
        <S.HeaderArea>
          <header>
            <S.Title>
              { 
                'Unnamed event'
              }
            </S.Title>
          </header>
          <S.Details>
            Details
          </S.Details>
        </S.HeaderArea>
      
        <Channels />
      </>
    </S.SpaceSidebar>
  )
}

const S = {
  Absolute: styled.div`
    position: absolute;
    right: .5rem;
    bottom: .75rem;
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
    margin-bottom: 1rem;
  `,
  Details: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `
}