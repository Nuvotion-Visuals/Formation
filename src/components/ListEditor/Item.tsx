import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

import { Box, Break, getLinkComponent, Spacer, getLabelColor, LabelColor } from '../../internal'
import { SpaceIcon } from '../NavSpaces/SpaceIcon'

import { 
  Dropdown, 
  Avatar, 
  getInitials, 
  OptionsType 
} from '../../internal'

export interface Props {
  name?: string,
  options?: OptionsType,
  onClick?: () => void,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  src?: string,
  text?: string,
  labelColor?: LabelColor,
  label?: string,
  subtitle?: string,
  dateString?: string,
  title?: string,
  date?: Date,
  small?: boolean,
  href?: string,
  active?: boolean,
  spaceIcon?: boolean,
  children?: React.ReactNode,
  content?: React.ReactNode,
  emphasize?: boolean,
  indent?: boolean,
  pageTitle?: string,
  newTab?: boolean
}

export const Item = ({ 
  name,
  label,
  subtitle,
  options,
  onClick,
  icon,
  iconPrefix,
  src,
  text,
  labelColor,
  title,
  date,
  small,
  href,
  active,
  spaceIcon,
  children,
  content,
  emphasize,
  indent,
  pageTitle,
  newTab
}: Props): JSX.Element => {
  const Link = getLinkComponent()

  const renderItem = () => (
    <Box width='100%'>
      {
        indent
          ? <S.Indent active={active} />
          : null
      }
      {
        spaceIcon && <SpaceIcon
          src={src}
          onClick={onClick}
          date={date}
          href={href}
          name={title ? title : '?'}
          icon={icon}
          iconPrefix={iconPrefix}
          active={active}
          labelColor={labelColor}
        />
      }
      
      {
        (name || icon || src) && !spaceIcon
          ? <S.AvatarContainer active={active}>
              <Avatar
                name={name ? getInitials(name) : '?'}
                labelColor={labelColor}
                icon={icon}
                iconPrefix={iconPrefix}
                src={src}
              />
            </S.AvatarContainer>
          : null
      }

      <S.Flex>

      {
        name && <><S.Text active={active}>{ name }</S.Text></>
      }

      {
        label && <><S.Text active={active}>{ label }</S.Text><Break /></>
      }

      {
        pageTitle && <><S.PageTitle active={active}>{ pageTitle }</S.PageTitle></>
      }

      {
        title && <><S.Title>{ title }</S.Title> { (text || subtitle) && <Break /> }</>
      }
      
      {
        text && <><S.Text active={active}>{ text }</S.Text></>
      }

      {
        subtitle && <><S.Text active={active}>{ subtitle }</S.Text></>
      }

      {
        content && <><S.Title>{ content }</S.Title></>
      }

    </S.Flex>

    <Spacer />

    {
      children
        ? <Box px={.5} >
            {
              children
            }
          </Box>
        : null
    }

    {
        options
          ? <>
                <Dropdown
                  options={options}
                />
            </>
          : null
      }
    </Box>
  )

  return (<S.Container>
    <S.ListItem 
      onClick={onClick} 
      active={active} 
      emphasize={emphasize}
      showHover={onClick !== undefined || href !== undefined}
      pageTitle={pageTitle}
    >
      {
        href !== undefined
          ? <Link href={href} newTab={newTab}>
              {
                renderItem()
              }
            </Link>
          : renderItem()
      }
    </S.ListItem>
  </S.Container>)
}

const S = {
  ListItem: styled.div<{
    active?: boolean,
    emphasize?: boolean,
    showHover?: boolean,
    pageTitle?: string
  }>`
    width: calc(100% - 1rem);
    height: ${props => props.pageTitle ? 'var(--F_Header_Height)' : 'auto'};
    padding: ${props => props.pageTitle ? '0 .5rem' : '.325rem .5rem'};
    display: flex;
    align-items: center;
    position: relative;
    cursor: ${props => props.showHover ? 'pointer' : 'auto'};
    background: ${props => 
      props.active 
        ? 'var(--F_Surface)' 
        : props.emphasize
          ? 'var(--F_Emphasize)'
          : 'var(--F_Background)'
    };
    &:hover {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface_0)'
          : props.emphasize
            ? 'var(--F_Emphasize)'
            : 'var(--F_Background)'
      };
    }
    &:active {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface_1)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface)'
          : 'var(--F_Background)'
      };
    }
    a {
      width: 100%;
    }
  `,
  Flex: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  AvatarContainer: styled.div<{
    active?: boolean
  }>`
    height: 100%;
    display: flex;
    align-items: center;
    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'auto'};
    }
  `,
  Text: styled.div<{
    active?: boolean
  }>`
    
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Label);
    line-height: 1.33;
    padding: 0 .5rem;
    color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    font-weight: ${props => props.active ? '600' : '400'};

  `,
  Absolute: styled.div`
    position: absolute;
    height: 100%;
    right: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `,
  Title: styled.div`
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color);
    padding: .325rem .5rem;
  `,
  PageTitle: styled.div<{
    active?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    font-weight: 600;
    padding: .325rem .5rem;
  `,
  DropdownSpacer: styled.div<{
    spaces: number
  }>`
    height: 100%;
    padding: ${props => `calc(${props.spaces} * 0.75rem)`};
  `,
  Indent: styled.div<{
    active?: boolean
  }>`
    width: 1.875rem;
    min-width: 1.875rem;
    background: ${props => props.active ? 'var(--F_Surface)' : 'var(--F_Background)'};
  `,
  Container: styled.div`
    display: flex;
    width: 100%;
  `
}