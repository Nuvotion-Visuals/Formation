import React from 'react'
import styled from 'styled-components'

import Div100vh from 'react-div-100vh'

import { SwipeableViews } from './SwipeableViews'
import { useBreakpoint } from '../../internal'
import { NavBottom } from './NavBottom'

interface Props {
  activeSwipeIndex: number,
  onSwipe: (index: number) => void,
  firstPage: React.ReactNode,
  secondPage: React.ReactNode,
  thirdPage: React.ReactNode,
  navsPrimary: any,
  disableTablet?: boolean,
  sidebarWidth?: string
}

/**
 * A navigation component that includes swipeable pages.
 */
export const NavSpaces = React.memo(({ 
  activeSwipeIndex, 
  onSwipe,
  firstPage,
  secondPage,
  thirdPage,
  navsPrimary,
  disableTablet,
  sidebarWidth
}: Props) => {
  const { isTablet, isDesktop } = useBreakpoint({
    desktop: { minWidth: 1221 },
    tablet: { minWidth: 901, maxWidth: 1220 },
    mobile: { maxWidth: 900 }
  })


  const renderContentMobile = () => {
    return (<>
    <S.Container>
      <SwipeableViews
        activeSwipeIndex={activeSwipeIndex}
        onSwipe={index => onSwipe(index)}
        onIncrement={() => onSwipe(activeSwipeIndex + 1)}
      >
        <S.View>
          <S.MainScroll>
            {
              firstPage
            }
          </S.MainScroll>
          {
            navsPrimary &&
              <NavBottom
                navs={navsPrimary}
                trimRight={true}
              />
          }
        </S.View>

        <S.View>
          {
            secondPage
          }
        </S.View>
        <S.View>
          {
            thirdPage
          }
        </S.View>
      </SwipeableViews>
      </S.Container>
    </>)
  }

  const renderContentTablet = () => {
    return (<>
      <S.Container>
        <S.View width={sidebarWidth || '320px'}>
          <S.MainScroll>
            {
              firstPage
            }
          </S.MainScroll>
          {
            navsPrimary &&
            <NavBottom
              navs={navsPrimary}
              trimRight={true}
            />
          }
        </S.View>

        <SwipeableViews
          activeSwipeIndex={activeSwipeIndex}
          onSwipe={index => onSwipe(index)}
          onIncrement={() => onSwipe(activeSwipeIndex + 1)}
        >
          <S.View>
            {
              secondPage
            }
          </S.View>
          <S.View>
            {
              thirdPage
            }
          </S.View>
        </SwipeableViews>

      </S.Container>
    </>)
  }


  const renderContentDesktop = () => {
    return (<>
      <S.Container>
        <S.View width={sidebarWidth || '380px'}>
          <S.MainScroll>
            {
              firstPage
            }
          </S.MainScroll>
          {
            navsPrimary &&
              <NavBottom
                navs={navsPrimary}
                trimRight={true}
              />
          }
        </S.View>

        <S.SecondPage>
          {
            secondPage
          }
        </S.SecondPage>

        <S.ThirdPage>
          {
            thirdPage
          }
        </S.ThirdPage>
      </S.Container>
    </>)
  }

  const renderContent = () => {
    if (isDesktop) {
      return renderContentDesktop()
    }
    else if (isTablet && !disableTablet) {
      return renderContentTablet()
    }
    else {
      return renderContentMobile()
    }  
  }

  return renderContent()
})

const S = {
  Container: styled(Div100vh)`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  SecondPage: styled.div`
    width: var(100vw - 640px);
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    height: 100%;
  `,
  View: styled.div<{
    width?: string
  }>`
    width: ${props => props.width ? props.width  : '100%'};
    min-width: ${props => props.width ? props.width  : '100%'};
    height: 100%;
  `,
  ThirdPage: styled.div`
    border-left: 1px solid var(--F_Surface);
    overflow-y: auto;
    height: 100%;
    width: 380px;
    max-width: 380px;
    @media (min-width: 1600px) {
      width: 500px;
      max-width: 500px;
    }
  `,
  PagePlaceholder: styled.div<{
    width?: string
  }>`
    height: 100%;
    width: 100%;
    min-width: ${props => props.width ? props.width : 'auto'};
    max-width: ${props => props.width ? props.width : 'auto'};
    height: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
  `,
  MainScroll: styled.div`
    display: flex;
    height: calc(100% - var(--F_Header_Height) - 6px);
    width: 100%;
    overflow-y: auto;
  `
}