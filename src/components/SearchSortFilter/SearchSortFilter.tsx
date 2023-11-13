import styled from 'styled-components'

import React from 'react'
import { Gap } from '../../internal'
import { Dropdown, Box, TextInput, Button } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

interface Props {
  value: string,
  onChange: (newValue: string) => void,
  expanded?: boolean,
  onExpand?: (newExpanded: boolean) => void,
  placeholder?: string,
  iconPrefix: IconPrefix,
  onEnter?: () => void,
  hideOutline?: boolean
}

/**
 * The `SearchSortFilter` component is an interactive text input element used for searching. It features an integrated dropdown button 
 * which toggles additional options for, for example, sorting or advanced filters. The search bar can be customized with a placeholder 
 * and specific icon. It also includes a callback function that is invoked when pressing the Enter key.
 * 
 * @param {string} value - The current value of the search field.
 * @param {Function} onChange - A callback function that fires when the search field value changes. 
 * @param {boolean} [expanded] - A flag to determine if the dropdown is expanded or not.
 * @param {Function} [onExpand] - A callback function that fires when the dropdown button is clicked. 
 * @param {string} [placeholder] - A placeholder text for the search field.
 * @param {string} iconPrefix - The Fontawesome icon prefix for the search button.
 * @param {Function} [onEnter] - A callback function that fires when the Enter key is pressed.
 * @param {boolean} hideOutline - A flag to decide whether to hide the input field outline.
 *
 * @component
 * @example
 * 
 * const getValue = value => {
 *   console.log(value);
 * }
 * 
 * const toggleExpand = newExpanded => {
 *   console.log(newExpanded);
 * }
 * 
 * return (
 *   <SearchSortFilter value="Search" onChange={getValue} expanded={true} onExpand={toggleExpand} placeholder="Search..." iconPrefix="far" hideOutline />
 * )
 */
export const SearchSortFilter = React.memo(({ 
  value,
  onChange,
  expanded,
  onExpand,
  placeholder,
  iconPrefix,
  onEnter,
  hideOutline
}: Props) => {

  const emptySearchTerm = value === ''

  return (
    <S.Search emptySearchTerm={emptySearchTerm}>
      <Box py={.125}>
        <Box width={.25} height='100%' />
        <Gap disableWrap>
        <S.NoOutline>
          <TextInput
            value={value}
            onChange={newValue => onChange(newValue)}
            compact
            icon='search'
            iconPrefix={iconPrefix}
            onEnter={onEnter}
            hideOutline={hideOutline}
          />
        </S.NoOutline>
        {
          onExpand && expanded !== undefined && 
            <Button
              icon={ expanded
                ? 'chevron-up'
                : 'chevron-down'}
              iconPrefix={iconPrefix}
              onClick={() => {
                onExpand(!expanded)
              }}
              minimal
            
          />
        }
        </Gap>
      </Box>
      </S.Search>
  )
})

const S = {
  Search: styled.div<{
    emptySearchTerm?: boolean
  }>`
    width: 100%;
    
  `,
  NoOutline: styled.div`
  * {
    box-shadow: none;
  }
  width: 100%;
  `
}