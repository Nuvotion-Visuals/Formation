import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import React, { forwardRef, useContext, useMemo } from 'react'
import styled, { css } from 'styled-components'

import { Box, Break, Spacer, getLabelColor, LabelColor, Link as IntLink, LineBreak } from '../../internal'
import { SpaceIcon } from '../NavSpaces/SpaceIcon'

import { 
  Avatar, 
  getInitials, 
  LinkContext
} from '../../internal'

export type ItemProps = {
  name?: string,
  onClick?: (e: React.MouseEvent) => void,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  minimalIcon?: boolean,
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
  prefix?: React.ReactNode,
  children?: React.ReactNode,
  content?: React.ReactNode,
  emphasize?: boolean,
  indent?: boolean,
  pageTitle?: string,
  newTab?: boolean,
  value?: any,
  disableBreak?: boolean,
  compact?: boolean,
  disablePadding?: boolean,
  index?: number,
  disableTextWrap?: boolean,
  absoluteRightChildren?: boolean
}

/**
 * `Item` is a flexible component that can represent a list item or an interactive element. It supports various configurations such as avatars, icons, labels, and custom content, and can be used as a navigation item or interactive list element.
 *
 * @component
 * @param {string} [name] - The main text or name to be displayed in the item.
 * @param {function} [onClick] - The click event handler for the item.
 * @param {IconName} [icon] - The FontAwesome icon name to display.
 * @param {IconPrefix} [iconPrefix] - The FontAwesome icon prefix, defaults to 'fas'.
 * @param {boolean} [minimalIcon] - Determines if the icon should be rendered in a minimal style.
 * @param {string} [src] - The image source URL, if the item includes an avatar or image.
 * @param {string} [text] - Additional text to be displayed alongside the name.
 * @param {LabelColor} [labelColor] - The label color type for styling the text or icon.
 * @param {string} [label] - A label to be displayed, usually in a styled badge or tag.
 * @param {string} [subtitle] - A secondary text, displayed below or after the name.
 * @param {string} [dateString] - A formatted date string to display, if relevant.
 * @param {Date} [date] - A Date object, used when the item includes date information.
 * @param {boolean} [small] - If true, the item will be styled in a smaller size.
 * @param {string} [href] - The URL to be used for navigation if the item is a link.
 * @param {boolean} [active] - If true, the item will be styled to indicate it is currently active or selected.
 * @param {boolean} [spaceIcon] - If true, a space icon will be used in place of the regular avatar or image.
 * @param {React.ReactNode} [prefix] - Custom content to be displayed before the main text.
 * @param {React.ReactNode} [children] - Custom content or additional components to render within the item.
 * @param {React.ReactNode} [content] - Main content to be rendered inside the item.
 * @param {boolean} [emphasize] - If true, the item will be styled to stand out, usually for emphasis or priority.
 * @param {boolean} [indent] - If true, the item will include an indentation, often used in nested lists.
 * @param {string} [pageTitle] - A title to be displayed prominently, often used for page headers or section titles.
 * @param {boolean} [newTab] - If true and the item is a link, clicking it will open the href in a new tab.
 * @param {boolean} [disableBreak] - If true, line breaks will be suppressed, keeping the content on one line.
 * @param {boolean} [compact] - If true, the item will have a more compact layout with less padding and spacing.
 * @param {boolean} [disablePadding] - If true, the item will not have padding applied to its container.
 * @param {number} [index] - The index of the Item, to be used to help distingish Items in an ordered list.
 * @param {boolean} [disableTextWrap] - Disable text wrap for all text in the Item.
 * @returns {JSX.Element} - The rendered component.
 *
 * @example
 * // Basic item with text and an icon
 * <Item name="Item Name" icon="user" />
 *
 * @example
 * // Item as a clickable link with a subtitle and custom prefix content
 * <Item href="/profile" name="Profile" subtitle="View your profile" prefix={<CustomIcon />} />
 */
export const Item = forwardRef<HTMLDivElement, ItemProps>(({
  name,
  label,
  subtitle,
  onClick,
  icon,
  iconPrefix,
  minimalIcon,
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
  newTab,
  disableBreak,
  value,
  prefix,
  compact,
  disablePadding,
  index,
  disableTextWrap,
  absoluteRightChildren
}: ItemProps, ref): JSX.Element => {
  const Link: any = useContext(LinkContext) || IntLink;

  const renderItem = () => (
    <Box width='100%' maxWidth={'100%'}>
      {
        indent
          ? <S.Indent active={active} />
          : null
      }
      {
        spaceIcon && 
          <Box mr={disablePadding ? 0 : -.25}>
            <SpaceIcon
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
          </Box>
      }

      {
        index !== undefined && <S.Index>{`${index + 1}`}</S.Index>
      }
      
      {
        (name || icon || src) && !spaceIcon
          ? <Box mr={disablePadding ? 0 : -.25}>
              <S.AvatarContainer active={active}>
                <Avatar
                  name={name ? getInitials(name) : '?'}
                  labelColor={labelColor}
                  icon={icon}
                  iconPrefix={iconPrefix}
                  minimalIcon={minimalIcon}
                  src={src}
                />
              </S.AvatarContainer>
            </Box> 
          : null
      }

      {
        prefix
      }

      <S.Flex minimal={minimalIcon} indent={index !== undefined}>
        {
          name && <S.Text active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap}>{ name }</S.Text>
        }

        {
          !disableBreak && <Break />
        }

        {
          label && <S.Text active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap}>{ label }</S.Text>
        }

        {
          !disableBreak && <Break />
        }

        {
          pageTitle && <S.PageTitle active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap}>{ pageTitle }</S.PageTitle>
        }

        {
          !disableBreak && <Break />
        }

        {
          title && <S.Title active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap}>{ title }</S.Title>
        }

        {
          !disableBreak && <Break />
        }
        
        {
          text && <S.Text active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap}>{ text }</S.Text>
        }

        {
          !disableBreak && <Break />
        }

        {
          subtitle && <S.Subtitle active={active} disablePadding={disablePadding} disableTextWrap={disableTextWrap}>{ subtitle }</S.Subtitle>
        }

        {
          content && <>{ content }</>
        }
      </S.Flex>

      <Spacer />

      {
        children
          ? absoluteRightChildren
            ? <S.AbsoluteRight>
                {
                  children
                }
              </S.AbsoluteRight>
            : children
          : null
      }
    </Box>
  )

  return (<S.Container ref={ref}>
    <S.ListItem 
      onClick={onClick} 
      active={active} 
      emphasize={emphasize}
      showHover={onClick !== undefined || href !== undefined}
      pageTitle={pageTitle}
      compact={compact}
      disablePadding={disablePadding}
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
})

const S = {
  ListItem: React.memo(styled.span<{
    active?: boolean,
    emphasize?: boolean,
    showHover?: boolean,
    pageTitle?: string,
    compact?: boolean,
    disablePadding?: boolean
  }>`
     width: ${props => 
      props.disablePadding
        ? '100%'
        : props.pageTitle
          ? 'calc(100% - 1rem)'
          : props.compact
            ? 'calc(100% - 0.35rem)'
            : 'calc(100% - 0.35rem)'
    };
    padding: ${props => 
      props.disablePadding
        ? '0'
        : props.pageTitle 
          ? '0 .5rem' 
          : props.compact
            ? '0 .175rem'
            : '.175rem'
    };
    height: ${props => 
      props.compact
        ? 'var(--F_Input_Height_Compact)'
        : props.pageTitle 
            ? 'var(--F_Header_Height)' 
            : 'auto'
    };
    max-height: ${props => 
      props.compact
        ? 'var(--F_Input_Height_Compact)'
        : 'auto'
    };
    overflow: ${props => 
      props.compact
        ? 'hidden'
        : 'auto'
    };
   
    display: flex;
    align-items: center;
    position: relative;
    cursor: ${props => props.showHover ? 'pointer' : 'auto'};
    background: ${props => 
      props.active 
        ? 'var(--F_Surface_2)' 
        : props.emphasize
          ? 'var(--F_Emphasize)'
          : 'none'
    };
    &:hover {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface_2)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface_1)'
          : props.emphasize
            ? 'var(--F_Emphasize)'
            : 'none'
      };
    }
    &:active {
      background: ${props => 
        props.showHover
          ? props.active 
              ? 'var(--F_Surface_2)' 
              : props.emphasize
                ? 'var(--F_Emphasize_Hover)'
                : 'var(--F_Surface_1)'
          : 'none'
      };
    }
    a {
      width: 100%;
    }
  `),
  Flex: React.memo(styled.div<{
    minimal?: boolean,
    indent?: boolean
  }>`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    left: ${props => props.indent ? '1.55rem' : 'auto'};
  `),
  AvatarContainer: React.memo(styled.div<{
    active?: boolean
  }>`
    height: 100%;
    display: flex;
    align-items: center;
    * {
      color: ${props => props.active ? 'var(--F_Font_Color)' : 'auto'};
    }
  `),
  Text: React.memo(styled.div<{
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean
  }>`
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color);
    line-height: 1.33;
    padding: ${props => props.disablePadding ? '0' : '0 .5rem'};
    font-weight: ${props => props.active ? '400' : '400'};
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
  `),
  Absolute: React.memo(styled.div`
    position: absolute;
    height: 100%;
    right: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  `),
  Title: React.memo(styled.div<{
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    padding: ${props => props.disablePadding ? '0' : '0 .5rem'};
    color: var(--F_Font_Color);
    font-weight: ${props => props.active ? '400' : '400'};
    max-width: 100%;
    overflow: hidden;
    line-height: 1.33;
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
  `),
  Subtitle: React.memo(styled.div<{
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean
  }>`
    font-size: var(--F_Font_Size_Label);
    color: ${props => props.active ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    padding: ${props => props.disablePadding ? '0' : '0 .5rem'};
    line-height: 1.33;
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
  `),
  PageTitle: React.memo(styled.div<{
    active?: boolean,
    disablePadding?: boolean,
    disableTextWrap?: boolean
  }>`
    font-size: var(--F_Font_Size_Title);
    color: var(--F_Font_Color);
    font-weight: 600;
    padding: ${props => props.disablePadding ? '0' : '0 .5rem'};
    line-height: 1.33;
    ${props => props.disableTextWrap && css`
      overflow: hidden;
      white-space: nowrap;
    `}
  `),
  DropdownSpacer: React.memo(styled.div<{
    spaces: number
  }>`
    height: 100%;
    padding: ${props => `calc(${props.spaces} * 0.75rem)`};
  `),
  Indent: React.memo(styled.div<{
    active?: boolean
  }>`
    width: .5rem;
    min-width: .5rem;
    background: ${props => props.active ? 'var(--F_Surface)' : 'var(--F_Background)'};
  `),
  Container: React.memo(styled.div`
    display: flex;
    width: 100%;
  `),
  Index: styled.div`
    font-size: var(--F_Font_Size_Label);
    font-family: monospace;
    color: var(--F_Font_Color);
    font-weight: 600;
    position: absolute;
    width: 1rem;
    min-width: .75rem;
    text-align: center;
    left: .3rem;
  `,
  AbsoluteRight: styled.div`
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    height: 100%;
    align-items: center;
  `
}