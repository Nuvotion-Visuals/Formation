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
  thirdPage: React.ReactNode
}

export const SwipeableNavigation = ({ 
  activeSwipeIndex, 
  onSwipe,
  secondPage,
  thirdPage
}: Props) => {
  const { isDesktop, isTablet, isMobile } = useBreakpoint()

  const [spaces, set_spaces] = useState([
    {
      title: 'Jive DJs Cork',
      src: 'https://api.avsync.live/uploads/medium_jive_djs_d7e9e4490a.jpg',
      date: new Date(Date.parse('Sep 1, 2022')),
      location: 'Cypress Avenue, Cork'
    },
    {
      title: 'Kino Battle of the Bands',
      src: 'https://api.avsync.live/uploads/medium_Hero_ab87aace42.jpg',
      date: new Date(Date.parse('Sep 8, 2022')),
      location: 'Kino, Cork'
    },
    {
      title: 'The III Studios Session',
      src: 'https://api.avsync.live/uploads/medium_Poster_6ad4c91377.jpg',
      date: new Date(Date.parse('Oct 29, 2022')),
      location: 'The III Studios, Chicago'
    },
    {
      title: 'Society Chi Presents',
      src: 'https://api.avsync.live/uploads/2_82322a7fdb.jpg',
      date: new Date(Date.parse('Nov 29, 2022')),
      location: 'The Aux, Chicago'
    },
    {
      title: 'Pretty Happy',
      src: 'https://api.avsync.live/uploads/pretty_happy_95bcc1e160.jpg',
      date: new Date(Date.parse('Dec 4, 2022')),
      location: 'Kino, Chicago'
    },
    {
      title: 'Cyprus Avenue Hip Hop Festival',
      src: 'https://api.avsync.live/uploads/1_bc67779458.jpg',
      date: new Date(Date.parse('Dec 6, 2022')),
      location: 'Cypress Avenue, Cork'
    }
  ])
  const [activeSpaceIndex, set_activeSpaceIndex] = useState(0)

  const renderFirstPage = () => {
    return <>
      <S.MainScroll>
        <SpacesSidebar 
          spaces={spaces}
          activeSpaceIndex={activeSpaceIndex}
          onClickIndex={index => set_activeSpaceIndex(index)}
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
        />
      </S.MainScroll>
      <NavBottom
        trimRight={true}
        navs={[
          {
            icon: 'calendar-alt',
            iconPrefix: 'fas',
            title: 'All events',
            href: '#',
            active: true
          },
          {
            icon: 'check-square',
            iconPrefix: 'fas',
            title: 'Tasks',
            href: '#'
          },
          {
            icon: 'bell',
            iconPrefix: 'fas',
            title: 'Notifications',
            href: '#'
          },
          {
            icon: 'user',
            iconPrefix: 'fas',
            title: 'Profile',
            href: '#'
          }
        ]}
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
              title={'Unnamed event'}
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
              navs={[
                {
                  icon: 'info-circle',
                  iconPrefix: 'fas',
                  title: 'Details',
                  href: '#'
                },
                {
                  icon: 'users',
                  iconPrefix: 'fas',
                  title: 'People',
                  href: '#',
                  active: true
                },
                {
                  icon: 'check-square',
                  iconPrefix: 'fas',
                  title: 'Tasks',
                  href: '#'
                },
                {
                  icon: 'compass',
                  iconPrefix: 'fas',
                  title: 'Areas',
                  href: '#'
                }
              ]}
            />
          </S.Expand>
        </S.PagePlaceholder>

        <S.PagePlaceholder>
          <S.Expand>
            <NavTop
              title={'Unnamed event'}
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
                title={'Unnamed event'}
                onBack={() => onSwipe(activeSwipeIndex - 1)}
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