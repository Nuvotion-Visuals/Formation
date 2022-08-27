import React, { useState } from 'react'
import styled from 'styled-components'

import Div100vh from 'react-div-100vh'

import { SwipeableViews } from './SwipeableViews'
import { useBreakpoint } from '../../internal'
import { SpaceSidebar } from './SpaceSidebar'
import { NavBottom } from './NavBottom'
import { NavTop } from './NavTop'
import { SpacesSidebar } from './SpacesSidebar'

interface Props {
  activeSwipeIndex: number,
  onSwipe: (index: number) => void,
  secondPage: React.ReactNode,
  thirdPage: React.ReactNode,
  spaces: any,
  activeSpaceIndex: number,
  onSetActiveSpacesIndex: (index: number) => void,
  navsPrimary: any,
  navsSecondary: any,
  channels: any
}

export const NavSpaces = ({ 
  activeSwipeIndex, 
  onSwipe,
  secondPage,
  thirdPage,
  spaces,
  activeSpaceIndex,
  onSetActiveSpacesIndex,
  navsPrimary,
  navsSecondary,
  channels
}: Props) => {
  const { isDesktop, isTablet, isMobile } = useBreakpoint()

  const renderFirstPage = () => {
    return <>
      <S.MainScroll>
        <SpacesSidebar 
          spaces={spaces}
          activeSpaceIndex={activeSpaceIndex}
          onClickIndex={index => onSetActiveSpacesIndex(index)}
        />
        <SpaceSidebar 
          title={spaces[activeSpaceIndex].title}
          src={spaces[activeSpaceIndex].src}
          dateString={
            spaces[activeSpaceIndex]
              .date?.toLocaleString('en-us', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
          location={spaces[activeSpaceIndex].location}
          channels={channels}
        />
      </S.MainScroll>
      <NavBottom
        trimRight={true}
        navs={navsPrimary}
      />
    </>
  }
  
  const renderSecondPage = () => {
    return secondPage
  }

  const renderThirdPage = () => {
    return thirdPage
  }

  const renderContentMobile = () => {
    return (<>
      <SwipeableViews
        activeSwipeIndex={activeSwipeIndex}
        onSwipe={index => onSwipe(index)}
        onIncrement={() => onSwipe(activeSwipeIndex + 1)}
      >

        <S.PagePlaceholder>
          <S.Expand>
            {
              renderFirstPage()
            }
          </S.Expand>
        </S.PagePlaceholder>

        <S.PagePlaceholder>
          <S.Expand>
            <NavTop
              title={spaces[activeSpaceIndex].title}
              src={spaces[activeSpaceIndex].src}
              date={spaces[activeSpaceIndex].date}
              onBack={() => onSwipe(activeSwipeIndex - 1)}            
            />

            <S.Scroll doubleHeader={true}>
              {
                renderSecondPage()
              }
              <S.HeaderSpacerY />
              <S.HeaderSpacerY />
            </S.Scroll>
            <NavBottom
              navs={navsSecondary}
            />
          </S.Expand>
        </S.PagePlaceholder>

        <S.PagePlaceholder>
          <S.Expand>
            <NavTop
              title={spaces[activeSpaceIndex].title}
              src={spaces[activeSpaceIndex].src}
              date={spaces[activeSpaceIndex].date}
              onBack={() => onSwipe(activeSwipeIndex - 1)}
            />
            <S.Scroll doubleHeader={false}>
              {
                renderThirdPage()
              }
            </S.Scroll>
          </S.Expand>
        </S.PagePlaceholder>
        
      </SwipeableViews>
    </>)
  }

  const renderContentTablet = () => {
    return (<>
      <S.Container>

        <S.SidebarContainer>
          {
            renderFirstPage()
          }
        </S.SidebarContainer>

        <SwipeableViews
          activeSwipeIndex={activeSwipeIndex}
          onSwipe={index => onSwipe(index)}
          onIncrement={() => onSwipe(activeSwipeIndex + 1)}
        >
          <S.PagePlaceholder >
            <S.Expand>
              <S.Scroll noHeaders={false}>
                {
                  renderSecondPage()
                }
                <S.HeaderSpacerY />
              </S.Scroll>
              
            </S.Expand>
          </S.PagePlaceholder>

          <S.PagePlaceholder>
            <S.Expand>
              <NavTop
                onBack={() => onSwipe(activeSwipeIndex - 1)}
                title={spaces[activeSpaceIndex].title}
                src={spaces[activeSpaceIndex].src}
                hideContext={true}
              />
              <S.Scroll noHeaders={true}>
                {
                  renderThirdPage()
                }
              </S.Scroll>
            </S.Expand>
          </S.PagePlaceholder>
        </SwipeableViews>

      </S.Container>
    </>)
  }


  const renderContentDesktop = () => {
    return (<>
      <S.Container>
        <S.SidebarContainer>
          {
            renderFirstPage()
          }
        </S.SidebarContainer>

        <S.MainContent>
          <S.Scroll>
            {
              renderSecondPage()
            }
          </S.Scroll>
        </S.MainContent>

        <S.SecondaryContent>
          <NavTop
            title={spaces[activeSpaceIndex].title}
            src={spaces[activeSpaceIndex].src}
            date={spaces[activeSpaceIndex].date}
            onBack={() => onSwipe(activeSwipeIndex - 1)}  
            hideReturnContext={true}          
          />
          <S.Scroll doubleHeader={false}>
            {
              renderThirdPage()
            }
          </S.Scroll>
        </S.SecondaryContent>
      </S.Container>
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

const S = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
  `,
  SidebarContainer: styled.div`
    min-width: 320px;
    max-width: 320px;
    display: flex;
    position: relative;
  `,
  MainContent: styled.div`
    width: var(100vw - 640px);
    display: flex;
    flex-grow: 1;
    position: relative;
  `,
  SecondaryContent: styled.div`
    max-width: 320px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border-left: 2px solid var(--F_Surface);
    min-width: 320px;

    @media (min-width: 1400px) {
      min-width: 600px;
      max-width: 600px;
    }
  `,
  PagePlaceholder: styled.div`
    height: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    z-index: 1;
    overflow: hidden;
  `,
  Expand: styled(Div100vh)`
    width: 100%;
  `,
  Scroll: styled.div<{
    noHeaders?: boolean,
    doubleHeader?: boolean
  }>`
    height: calc(100vh - calc(var(--F_Header_Height) * 2));
    height: ${props => props.noHeaders
      ? '100vh'
      : `calc(100vh - calc(var(--F_Header_Height) * ${ props.doubleHeader ? 2 : 1 }));`};
    width: 100%;
    overflow-y: auto;
  `,
  MainScroll: styled.div`
    display: flex;
    height: calc(100vh - var(--F_Header_Height));
    width: 100%;
    overflow-y: auto;
  `,
  HeaderSpacerY: styled.div`
    height: var(--F_Header_Height);
    width: 100%;
  `
}