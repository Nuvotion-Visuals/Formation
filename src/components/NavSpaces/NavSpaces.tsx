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

/**
 * A navigation component that includes swipeable pages, sidebar, and content.
 *
 * @component
 * @param {Object} props - The props for the NavSpaces component.
 * @param {number} props.activeSwipeIndex - The active index of the swipeable pages.
 * @param {Function} props.onSwipe - A callback function to handle swiping between pages.
 * @param {React.ReactNode} props.firstPage - The content of the first page.
 * @param {React.ReactNode} props.secondPage - The content of the second page.
 * @param {React.ReactNode} props.thirdPage - The content of the third page.
 * @param {Space[]} props.spaces - An array of space objects.
 * @param {number} props.activeSpaceIndex - The active index of the spaces.
 * @param {Function} props.onSetActiveSpacesIndex - A callback function to set the active space index.
 * @param {Object[]} props.navsPrimary - An array of primary navigation items.
 * @param {Object[]} [props.navsSecondary] - An optional array of secondary navigation items.
 * @param {Object[]} props.channels - An array of channel objects.
 * @param {Object[]} props.dropdownOptions - An array of dropdown options.
 * @param {boolean} [props.hideSpaceName] - A flag to hide the space name.
 * @param {boolean} [props.disableTablet] - A flag to disable tablet view.
 * @param {string} [props.sidebarWidth] - The width of the sidebar.
 *
 * @returns {JSX.Element} The rendered NavSpaces component.
 *
 * @example
 * // Example usage:
 * <NavSpaces
 *   activeSwipeIndex={activeIndex}
 *   onSwipe={handleSwipe}
 *   firstPage={<FirstPage />}
 *   secondPage={<SecondPage />}
 *   thirdPage={<ThirdPage />}
 *   spaces={spaceData}
 *   activeSpaceIndex={activeSpaceIndex}
 *   onSetActiveSpacesIndex={handleSetActiveSpaceIndex}
 *   navsPrimary={primaryNavItems}
 *   navsSecondary={secondaryNavItems}
 *   channels={channelData}
 *   dropdownOptions={dropdownOptions}
 *   hideSpaceName={true}
 *   disableTablet={false}
 *   sidebarWidth="320px"
 * />
 */
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
  const { isTablet, isDesktop } = useBreakpoint({
    desktop: { minWidth: 1224 },
    tablet: { minWidth: 768, maxWidth: 1223 },
    mobile: { maxWidth: 767 }
  })

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

        <S.SecondPage>
          <S.Scroll 
            numberOfNavBars={0}
          >
            {
              secondPage
            }
          </S.Scroll>
        </S.SecondPage>

        <S.ThirdPage>
          <S.Scroll 
            numberOfNavBars={0} 
            subtractBorder={true}
          >
            {
              thirdPage
            }
          </S.Scroll>
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
  Container: styled.div`
    width: 100%;
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
  SecondPage: styled.div`
    width: var(100vw - 640px);
    display: flex;
    flex-grow: 1;
    position: relative;
  `,
  ThirdPage: styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border-left: 1px solid var(--F_Surface);
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