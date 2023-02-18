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