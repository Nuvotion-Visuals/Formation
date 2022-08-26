import React from 'react'

import { EventIcon } from './EventIcon'
import styled, { css, keyframes } from 'styled-components'

import { Box, Icon } from '../../internal'

interface Props {
  
}

export const Sidebar = ({  }: Props) => {

  return (
    <S_Sidebar>
      <S_ServerIcon
      >
        <Icon icon='plus' iconPrefix='fas'/>
      </S_ServerIcon>
      {
        new Array(5).fill(0).map((event, index) =>
          <S_SidebarContainer key={index}>
            {
              false
                ? <S_Active />
                : null
            }

            <EventIcon
          
            />
            
          </S_SidebarContainer>
        )
      }
      
      <Box my={2.125} width='100%' />
    </S_Sidebar>
  )
}


const S_Sidebar = styled.div`
  width: 72px;
  height: calc(calc(100vh - var(--Header_Height)) - 1.5rem);
  overflow-y: auto;
  background: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: start;
  padding: .75rem 0;
  gap: .75rem;
  border-right: 1px solid #bbb;
  position: absolute;
  top: 0;
`

const S_SidebarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`

const S_Active = styled.div`
  position: absolute;
  left: 0;
  background: var(--Primary);
  width: 6px;
  height: 62px;
  border-radius: 0 4px 4px 0;
`

const Pulse = keyframes`
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
  }
  
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
`

const S_ServerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: var(--Primary);
  background-size: cover;
  background-position: center;
`

