import React, { useState } from 'react'
import styled from 'styled-components'

import { 
  Button, 
  Label, 
  LineBreak, 
  Box, 
  Spacer, 
  Dropdown, 
  LabelEditor, 
  Gap
} from '../../internal'
import { LabelType } from '../../types'

interface Props {
  value: LabelType[],
  onChange: (labels: LabelType[]) => void
}

export const LabelManager = ({ value, onChange }: Props) => {
  const [editingIndex, set_editingIndex] = useState<number | null>(null)

  return (<S.LabelManager>
    <Box p={.5}>
      <S.Description>{ value.length } Labels</S.Description>
      <Spacer />
      <Button
        text='New label'
        icon='plus'
        iconPrefix='fas'
        onClick={() => set_editingIndex(-1)}
      />
    </Box>
  
    <LineBreak />

    {
      editingIndex === -1
        ? <><Box p={.5} wrap={true}>
            <LabelEditor
              value={{
                name: '',
                description: '',
                color: 'gray'
              }}
              onChange={newLabel => onChange([...value, newLabel])}
              onClose={() => set_editingIndex(null)}
            />
            
          </Box>
          <LineBreak />
          </>
        : null
    }
  
    {
      value.map(({ name, description, color }, index) =>
      <>
        <Box p={.5}>
          <Gap autoWidth={true}>
          {
            editingIndex === index
              ? <LabelEditor
                  value={{
                    name,
                    description,
                    color
                  }}
                  onChange={newValue => 
                    onChange(value.map((item, itemIndex) => 
                      itemIndex === index
                        ? newValue
                        : item
                    ))}
                  onClose={() => set_editingIndex(null)}
                />
              : <Label
                  label={name}
                  color={color}
                  title={description}
                />
          }

          {
            editingIndex !== index
              ? <><S.Description>{ description }</S.Description></>
              : null
          }
          </Gap>

          <Spacer />
          <S.Absolute>
            <Dropdown
              options={[
                {
                  icon: 'ellipsis-vertical',
                  iconPrefix: 'fas',
                  dropDownOptions: [
                    {
                      icon: 'edit',
                      iconPrefix: 'fas',
                      text: 'Edit',
                      onClick: () => {
                        set_editingIndex(index)
                      }
                    },
                    {
                      icon: 'trash-alt',
                      text: 'Remove',
                      onClick: () => onChange(value.filter((i, itemIndex) => itemIndex !== index))
                    }
                  ]
                }
              ]}
            />
          </S.Absolute>
          
        </Box>
        <LineBreak />
      </>)
    }
  </S.LabelManager>)
}

const S = {
  LabelManager: styled.div`
    position: relative;
  `,
  Absolute: styled.div`
    position: absolute;
    right: .5rem;
    top: .325rem;
  `,
  Description: styled.div`
    display: flex;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Label);
  `
}