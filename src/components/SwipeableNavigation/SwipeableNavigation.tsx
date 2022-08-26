import React, { useState } from 'react'
import styled from 'styled-components'

import { SwipeableViews } from './SwipeableViews'
import { NavHeader, useBreakpoint } from '../../internal'
import { EventSidebar } from './EventSidebar'
import { BottomNav } from './BottomNav'

import { Sidebar } from './Sidebar'

import Div100vh from 'react-div-100vh'

export const SwipeableNavigation = ({  }) => {

  const [activeSwipeIndex, set_activeSwipeIndex] = useState(0)

  const { isDesktop, isTablet, isMobile } = useBreakpoint()

  const renderSecondPage = () => {
    return 'second page'
  }

  const renderThirdPage = () => {
    return 'third page'
  }

  const renderContentMobile = () => {
      return (<>
        <SwipeableViews
          activeSwipeIndex={activeSwipeIndex}
          onSwipe={index => set_activeSwipeIndex(index)}
          onIncrement={() => set_activeSwipeIndex(activeSwipeIndex + 1)}
        >
          <S_PagePlaceholder>
            <S_Expand>
              <S_MainScroll>
                <Sidebar />
                <EventSidebar />
              </S_MainScroll>
              <BottomNav/>
            </S_Expand>
          </S_PagePlaceholder>

          <S_PagePlaceholder>
            <S_Expand>
              <NavHeader>Header</NavHeader>
              <S_Scroll doubleHeader={true}>
                {
                  renderSecondPage()
                }
                <S_HeaderSpacerY />
                <S_HeaderSpacerY />

              </S_Scroll>
              <BottomNav/>
            </S_Expand>
          </S_PagePlaceholder>

          <S_PagePlaceholder>
            <S_Expand>
              <NavHeader>Header</NavHeader>
              <S_Scroll doubleHeader={false}>
                {
                  renderThirdPage()
                }
              </S_Scroll>
            </S_Expand>
          </S_PagePlaceholder>
          
        </SwipeableViews>

  
      </>)
  }

  const renderContentTablet = () => {
    return (<>
      <S_Container>
        <S_SidebarContainer>
            <S_MainScroll>
              <Sidebar />
              <EventSidebar />
            </S_MainScroll>
            <BottomNav />
        </S_SidebarContainer>
        <SwipeableViews
          activeSwipeIndex={activeSwipeIndex}
          onSwipe={index => set_activeSwipeIndex(index)}
          onIncrement={() => set_activeSwipeIndex(activeSwipeIndex + 1)}
        >
          <S_PagePlaceholder >
            <S_Expand>
              <S_Scroll noHeaders={false}>
                {
                  renderSecondPage()
                }
                <S_HeaderSpacerY />

              </S_Scroll>
            </S_Expand>
          </S_PagePlaceholder>

          <S_PagePlaceholder>
            <S_Expand>
              <S_Scroll noHeaders={true}>
                {
                  renderThirdPage()
                }
              </S_Scroll>
            </S_Expand>
          </S_PagePlaceholder>
        </SwipeableViews>
      </S_Container>


    </>)
  }


  const renderContentDesktop = () => {
    return (<>
      <S_Container>

        <S_SidebarContainer>
            <S_MainScroll>
              <Sidebar />
              <EventSidebar />
            </S_MainScroll>
            <BottomNav  />
        </S_SidebarContainer>

        <S_MainContent>
          <S_Scroll  >
            {
              renderSecondPage()
            }
          </S_Scroll>
        </S_MainContent>

        <S_SecondaryContent>
          <S_Scroll doubleHeader={false}>
            {
              renderThirdPage()
            }
          </S_Scroll>
        </S_SecondaryContent>
      </S_Container>


    </>)
  }

 

  const renderContent = () => {
    if (isDesktop) {
      return renderContentDesktop()
    }
    else if (isTablet) {
      return renderContentTablet()
    }
    else {
      return renderContentMobile()
    }  
  }

  return (<>
    {
      renderContent()
    }
  </>)
}

const S_Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const S_SidebarContainer = styled.div`
  min-width: 320px;
  max-width: 320px;
  display: flex;
  position: relative;
`

const S_MainContent = styled.div`
  width: var(100vw - 640px);
  display: flex;
  flex-grow: 1;
  position: relative;
`

const S_SecondaryContent = styled.div`
  max-width: 320px;
  display: flex;
  position: relative;
  border-left: 1px solid #bbb;
  min-width: 320px;

  @media (min-width: 1400px) {
    min-width: 600px;
    max-width: 600px;
  }
`

const S_PagePlaceholder = styled.div`
  height: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  position: relative;
  z-index: 1;
  overflow: hidden;
`

const S_DrawerScroll = styled.div`
  height: calc(70vh - 25px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  display: unset !important;
`

const S_Expand = styled(Div100vh)`
  width: 100%;
`

const S_Scroll = styled.div<{
  noHeaders?: boolean,
  doubleHeader?: boolean
}>`
  height: calc(100vh - calc(var(--Header_Height) * 2));
  height: ${props => props.noHeaders
    ? '100vh'
    : `calc(100vh - calc(var(--Header_Height) * ${ props.doubleHeader ? 2 : 1 }));`};
  width: 100%;
  overflow-y: auto;
`

const S_MainScroll = styled.div`
  display: flex;
  height: calc(100vh - var(--Header_Height));
  width: 100%;
  overflow-y: auto;
`

const S_HeaderSpacerY = styled.div`
  height: var(--Header_Height);
  width: 100%;
`