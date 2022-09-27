import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

import { Lists } from './Lists'

export interface Assignee {
  name: string,
  color: string,
  assigned: boolean
}

export interface ListItemType {
  name?: string,
  type?: string,
  avatar?: boolean,
  unassigned?: boolean,
  background?: boolean,
  status?: string,
  statusColor?: string,
  label?: string,
  dueDate?: string,
  assignees?: Assignee[],
  showProfilePic?: boolean
}

export interface ListType {
  name?: string,
  guid?: string,
  avatar?: boolean,
  listItems?: ListItemType[]
}

export type ListsType = ListType[]

export enum ListItemMode {
  counter = 'counter',
  add = 'add',
  remove = 'remove',
  assignPositions = 'assignPositions',
  assignContact = 'assignContact',
  task = 'task'
}

export enum CircleButtonType {
  add = 'add',
  remove = 'remove',
  assignee = 'assignee',
  selectContact = 'selectContact',
  assignContact = 'assignContact',
  task = 'add'
}

export const CircleButtonColors = {
  red: '#c00c00',
  blue: '#47808D',
  green: 'var(--EC_Primary_300)',
  yellow: '#F0C135',
  violet: '#674FA6',
  orange: '#E5903A',
  cyan: '#4084C5',
  fuchsia: '#A44E78'
}


export type PositionInviteStatus =
  'confirmed' |
  'awaitingResponse' |
  'inviteDenied' |
  'inviteNotSent' |
  'applicationReceived' |
  'applicationDenied'   

interface Props {
  value: ListsType,
  onChange: (value: ListsType) => void,
  onRemoveFunction?: (index: number) => void,
  calculateRecommendationLists?: () => ListsType,
  calculateRecentLists?: () => ListsType,
  isCreating: boolean,
  label?: string
}

export const MultiExpandableList = ({
  value,
  onChange,
  onRemoveFunction,
  label
}: Props) => {


  const [lastAddedIndex, set_lastAddedIndex] = useState<number>(0)


  
  const onCreate = (textValue: string, countValue: number, index: number) => {

    if (textValue.length === 0) {
      return false;
    } else { 
      onChange([
        ...value,
        {
          name: textValue,
          guid: '',
          listItems: new Array(countValue).fill(0).map(() => ({
            name: '',
            avatar: false
          }))
        }
      ])
      // setIsCreating(false)
      set_lastAddedIndex(value.length)
    }
  }

  const onRemove = (index : number) => {
    if (onRemoveFunction) {
      onRemoveFunction(index)
    }
    onChange(value.filter((list, listIndex) => index != listIndex ))
  }
  
  return (
    <S.ListEditor>
      <Lists
        lists={value}
        onRemove={(index) => onRemove(index)}
        onAdd={(name, index) => {}}
        lastAddedIndex={lastAddedIndex}
      />
    </S.ListEditor>
  )
}

const S = {
  ListEditor: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `,
  FixedWrapper: styled.div`
    width: 100%;
    z-index: 1;
  `
}