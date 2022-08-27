import React from 'react'

import styled from 'styled-components'

import { AspectRatio } from '../../internal'

import { Channels } from './Channels'

interface Props {
  title: string,
  src?: string,
  dateString?: string
}

export const SpaceSidebar = ({  
  title,
  src,
  dateString
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

          {
            dateString
              ? <S.Details>
                  {
                    dateString
                  }
                </S.Details>
              : null
          }
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