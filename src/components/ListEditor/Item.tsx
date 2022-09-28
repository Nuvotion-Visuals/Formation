import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import styled from 'styled-components'

import { Box, Break, Spacer } from '../../internal'
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
  color?: string,
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
  emphasize?: boolean
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
  color,
  title,
  date,
  small,
  href,
  active,
  spaceIcon,
  children,
  emphasize
}: Props): JSX.Element => {
  return (
    <S.ListItem 
      onClick={onClick} 
      active={active} 
      emphasize={emphasize}
      showHover={onClick !== undefined}
    >
      {
        spaceIcon && <SpaceIcon
          src={src}
          onClick={onClick}
          date={date}
          href={href}
          name={title}
          icon={icon}
          iconPrefix={iconPrefix}
          active={active}
        />
      }
      
      {
        (name || icon || src) && !spaceIcon
          ? <S.AvatarContainer>
              <Avatar
                name={name ? getInitials(name) : '?'}
                color={
                  color 
                    ? color
                    : name ? undefined : 'var(--F_Surface_2)'}
                icon={icon}
                iconPrefix={iconPrefix}
                src={src}
              />
            </S.AvatarContainer>
          : null
      }

      <S.Flex>

      {
        name && <><S.Text>{ name }</S.Text></>
      }

      {
        label && <><S.Text>{ label }</S.Text><Break /></>
      }

      {
        title && <><S.Title>{ title }</S.Title> { (text || subtitle) && <Break /> }</>
      }
      
      {
        text && <><S.Text>{ text }</S.Text></>
      }

      {
        subtitle && <><S.Text>{ subtitle }</S.Text></>
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
      
    </S.ListItem>
  )
}

const S = {
  ListItem: styled.div<{
    active?: boolean,
    emphasize?: boolean,
    showHover?: boolean
  }>`
    width: calc(100% - 1rem);
    padding: .5rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--F_Surface_0);
    position: relative;
    cursor: ${props => props.showHover ? 'pointer' : 'auto'};
    background: ${props => 
      props.active 
        ? 'var(--F_Surface_0)' 
        : props.emphasize
          ? 'var(--F_Emphasize)'
          : 'var(--F_Background)'
    };
    &:hover {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface_0)' 
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
              ? 'var(--F_Surface_0)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface)'
          : 'var(--F_Background)'
      };
    }
  `,
  Flex: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  AvatarContainer: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
  `,
  Avatar: styled.div`
    height: 1.75rem;
    min-width: 1.75rem;
    border-radius: 50%;
    background: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--F_Outline_Label);
    font-size: var(--F_Font_Size_Label);
  `,
  Text: styled.div`
    font-weight: 400;
    color: var(--F_Font_Color_Label);
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Label);
    line-height: 1.33;
    padding: 0 .5rem;
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
  DropdownSpacer: styled.div<{
    spaces: number
  }>`
    height: 100%;
    padding: ${props => `calc(${props.spaces} * 0.75rem)`};
  `
}