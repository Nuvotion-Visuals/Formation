import React from 'react'

import { Icon } from '../../internal'


import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'


import styled from 'styled-components'

import { Channels } from './Channels'



interface Props {
  
}

export const EventSidebar = ({  }: Props) => {

  const Detail = ({ icon, iconPrefix, content } : {
    icon: IconName,
    iconPrefix: IconPrefix,
    content: React.ReactNode
  }) => (
    <S_Detail>
      <Icon icon={icon} iconPrefix={iconPrefix} />
      <div>
        { content }
      </div>
    </S_Detail>
  )

  return (
    <S_EventSidebar>
      <>
        {
          <S_Poster src={``} />
        }
        <S_HeaderArea>
          <header>
            <S_Title>
              { 
                'Unnamed event'
              }
            </S_Title>
          </header>
          <S_Details>
            Details
          </S_Details>
          
          <S_Absolute>
            ...
          </S_Absolute>
        </S_HeaderArea>
      
        <Channels />
      </>
  

    </S_EventSidebar>
  )
}

const S_Absolute = styled.div`
  position: absolute;
  right: .5rem;
  bottom: .75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`


const S_EventSidebar = styled.div`
  width: 100%;
  height: calc(100vh - var(--Header_Height));
  margin-left: 72px;
  flex-wrap: wrap;
  background: white;
  overflow-x: hidden;
  border-right: 1px solid #bbb;
  /* min-width: 230px; */
`

const S_HeaderArea = styled.div`
  position: relative;
  padding: 1rem;
  border-bottom: 1px solid #bbb;
`

const S_Poster = styled.img`
  width: 100%;
  margin-bottom: -.5rem;
`

const S_Title = styled.h1`
  font-size: 20px;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
`

const S_Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const S_Detail = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  * {
    font-size: var(--Font_Size_Label);
  }
`

const S_PlaceholderMessage = styled.div`
  width: calc(100% - 2rem);
  padding: .75rem 1rem;
  padding-bottom: 0;
  height: 48px;
  display: flex;
  align-items: center;
`
