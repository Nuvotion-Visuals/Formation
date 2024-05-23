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
  Gap,
  LabelColor,
  LabelType
} from '../../internal'


interface Props {
  value: LabelType[],
  onChange: (labels: LabelType[]) => void
}

/**
 * `LabelManager` is a component that provides a user interface for managing a list of labels. It allows users to create new labels,
 * edit existing ones, and view a summary of the labels. Each label can be edited in place with an inline `LabelEditor`.
 *
 * @component
 * @param {LabelType[]} value - An array of label objects to be managed.
 * @param {function} onChange - Callback function to be called with the updated array of label objects when changes are made.
 *
 * @example
 * // Example usage of LabelManager for managing a list of labels
 * <LabelManager
 *   value={labelsArray}
 *   onChange={updatedLabels => console.log(updatedLabels)}
 * />
 */
export const LabelManager = ({ value, onChange }: Props) => {
  const [editingIndex, set_editingIndex] = useState<number | null>(null)

  return (<S.LabelManager>
    <Box p={.75}>
      <S.Description>{ value.length } Labels</S.Description>
      <Spacer />
      <Button
        text='New label'
        icon='plus'
        iconPrefix='fas'
        onClick={() => set_editingIndex(-1)}
        compact
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
                labelColor: 'gray'
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
      value.map(({ name, description, labelColor }, index) =>
      <>
        <Box p={.5} key={index}>
          <Gap autoWidth={true}>
          {
            editingIndex === index
              ? <LabelEditor
                  value={{
                    name,
                    description,
                    labelColor
                  }}
                  onChange={newValue => 
                    onChange(value.map((item, itemIndex) => 
                      itemIndex === index
                        ? newValue
                        : item
                    ))}
                  onClose={() => set_editingIndex(null)}
                  onDelete={() => onChange(value.filter((i, itemIndex) => itemIndex !== index))}
                />
              : <Label
                  label={name}
                  labelColor={labelColor}
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
            <Dropdown
              {...{
                icon: 'ellipsis-vertical',
                iconPrefix: 'fas',
                minimalIcon: true,
                minimal: true,
                circle: true,
                items: [
                  {
                    icon: 'edit',
                    title: 'Edit',
                    iconPrefix: 'fas',
                    onClick: () => {
                      editingIndex === null
                        ? set_editingIndex(index)
                        : set_editingIndex(null)
                    }
                  }
                ]
              }}
            />
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
    top: .5rem;
  `,
  Description: styled.div`
    display: flex;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color_Label);
  `
}