import '../../index.css'

import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import React from 'react'

interface Props {
  prefix?: string,
  icon?: string,
  rotate?: boolean
}

const Icon = React.memo(({ prefix, icon, rotate } : Props) => {
  return (<>
    {
      icon
        ? <S_Icon 
            icon={[
              (prefix as IconPrefix)
                ? (prefix as IconPrefix)
                : ('far' as IconPrefix),
                (icon as IconName)
            ]} 
            
            rotate={rotate}
          />
        : null
    }
  </>)
})

export default Icon

const S_Icon = styled(FontAwesomeIcon)`
  color: var(--Font_Color);
  transform : ${(props : Props) => props.rotate ? 'rotate(-90deg)' : 'none'}; 
`