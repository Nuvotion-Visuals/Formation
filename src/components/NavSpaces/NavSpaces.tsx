import React from 'react'
import styled from 'styled-components'

import Div100vh from 'react-div-100vh'

import { SwipeableViews } from './SwipeableViews'
import { useBreakpoint, LabelColor } from '../../internal'
import { NavBottom } from './NavBottom'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

export interface Space {
  name?: string,
  date?: Date,
  location?: string,
  channels?: any,
  href?: string,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  src?: string,
  onClick?: (e: React.MouseEvent) => void,
  labelColor?: LabelColor,
}

interface Props {
  activeSwipeIndex: number,
  onSwipe: (index: number) => void,
  firstPage: React.ReactNode,
  secondPage: React.ReactNode,
  thirdPage: React.ReactNode,
  spaces: any,
  activeSpaceIndex: number,
  onSetActiveSpacesIndex: (index: number) => void,
  navsPrimary: any,
  navsSecondary?: any,
  channels: any,
  dropdownOptions: any,
  hideSpaceName?: boolean,
  disableTablet?: boolean,
  sidebarWidth?: string
}

export const NavSpaces = React.memo(({ 
  activeSwipeIndex, 
  onSwipe,
  firstPage,
  secondPage,
  thirdPage,
  spaces,
  activeSpaceIndex,
  navsPrimary,
  navsSecondary,
  hideSpaceName,
  disableTablet,
  sidebarWidth
}: Props) => {
  const { isDesktop, isTablet, isMobile } = useBreakpoint()

  interface ViewProps {
    children: React.ReactNode,
    width?: string
  }
  const View = ({ children, width } : ViewProps) =>  <S.PagePlaceholder width={width}>
    <S.Expand>
      {
        children
      }
    </S.Expand>
  </S.PagePlaceholder>

  const renderContentMobile = () => {
    return (<>
      <SwipeableViews
        activeSwipeIndex={activeSwipeIndex}
        onSwipe={index => onSwipe(index)}
        onIncrement={() => onSwipe(activeSwipeIndex + 1)}
      >
        <View>
          {
            firstPage
          }
          {
            navsPrimary &&
              <NavBottom
                navs={navsPrimary}
                trimRight={true}
              />
          }
        </View>

        <View>
          <S.Scroll 
            numberOfNavBars={0}
          >
            {
              secondPage
            }
            <S.HeaderSpacerY />
            <S.HeaderSpacerY />
          </S.Scroll>
         
          
        </View>

        <View>
        
          <S.Scroll 
            numberOfNavBars={0}
          >
            {
              thirdPage
            }
          </S.Scroll>
        </View>
        
      </SwipeableViews>
    </>)
  }

  const renderContentTablet = () => {
    return (<>
      <S.Container>

        <View width={sidebarWidth || '320px'}>
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
        </View>

        <SwipeableViews
          activeSwipeIndex={activeSwipeIndex}
          onSwipe={index => onSwipe(index)}
          onIncrement={() => onSwipe(activeSwipeIndex + 1)}
        >
          <View>
            <S.Scroll 
              numberOfNavBars={0}
            >
              {
                secondPage
              }
              <S.HeaderSpacerY />
            </S.Scroll>
            
          </View>

          <View>
            <S.Scroll 
              numberOfNavBars={0}
            >
              {
                thirdPage
              }
            </S.Scroll>
          </View>
        </SwipeableViews>

      </S.Container>
    </>)
  }


  const renderContentDesktop = () => {
    return (<>
      <S.Container>
        <View width={sidebarWidth || '320px'}>
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
        </View>

        <S.MainContent>
          <S.Scroll 
            numberOfNavBars={0}
          >
            {
              secondPage
            }
          </S.Scroll>
        </S.MainContent>

        <S.SecondaryContent>
          <S.Scroll 
            numberOfNavBars={0} 
            subtractBorder={true}
          >
            {
              thirdPage
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
  Container: styled.div`
    width: 100vw;
    display: flex;
  `,
  View: styled.div`
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
  PagePlaceholder: styled.div<{
    width?: string
  }>`
    height: 100%;
    width: 100%;
    min-width: ${props => props.width ? props.width : 'auto'};
    max-width: ${props => props.width ? props.width : 'auto'};
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
    numberOfNavBars: number,
    subtractBorder?: boolean
  }>`
    height: ${props => props.subtractBorder
      ? `calc(calc(100vh - calc(${props.numberOfNavBars} * var(--F_Header_Height))) - 2px)`
      : `calc(100vh - calc(${props.numberOfNavBars} * var(--F_Header_Height)))`
    };
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