import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { ListItemEditor } from './ListItemEditor'
import { ListItems } from './ListItems'

export interface Assignee {
  name: string,
  color: string,
  assigned: boolean
}

export interface ListItem {
  name?: string,
  type?: string,
  title?: string,
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

export interface List {
  title?: string,
  guid?: string,
  avatar?: boolean,
  listItems?: ListItem[]
}

export type Lists = List[]

export enum ListItemType {
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
  calculateInitialValue: () => Lists,
  onChange: (lists: Lists) => void,
  onRemoveFunction?: (index: number) => void,
  calculateRecommendationLists?: () => Lists,
  calculateRecentLists?: () => Lists,
  isCreating: boolean
}

export const ListEditor = ({
  calculateInitialValue,
  onChange,
  onRemoveFunction,
  calculateRecommendationLists,
  calculateRecentLists,
  isCreating
}: Props) => {

  // List Management State
  const [lists, setLists] = useState<Lists>([])
  const [recommendedLists, setRecommendedLists] = useState([])
  const [recentLists, setRecentLists] = useState([])
  
  const [isEditing, setIsEditing] = useState(false)
  const [lastAddedIndex, set_lastAddedIndex] = useState<number>(0)

  useEffect(() => {
    onChange(lists)
  }, [lists])
  
  const onCreate = (textValue: string, countValue: number, index: number) => {

    if (textValue.length === 0) {
      return false;
    } else { 
      setLists([
        ...lists,
        {
          title: textValue,
          guid: '',
          listItems: new Array(countValue).fill(0).map(() => ({
            title: '',
            avatar: false
          }))
        }
      ])
      // setIsCreating(false)
      set_lastAddedIndex(lists.length)
    }
  }

  const onAddFromRecommended = (title: string, index: number) => {
    setLists([
      ...lists,
      {
        title: title,
        guid: '',
        listItems: new Array(1).fill(0).map(() => ({
          title: '',
          avatar: false
        })
        )
      }
    ])
    setRecommendedLists(recommendedLists.filter((list, listIndex) => index != listIndex))
    set_lastAddedIndex(lists.length)
  }

  const onRemove = (index : number) => {
    if (onRemoveFunction) {
      onRemoveFunction(index)
    }
    setLists(lists.filter((list, listIndex) => index != listIndex ))
  }
  
  return (
    <S.ListEditor>
      <S.FixedWrapper>
        <ListItemEditor
          lists={lists} 
          hide={!isCreating} 
          onCreate={onCreate} 
          onClose={() => {}}
        />
      </S.FixedWrapper>
      
      <ListItems
        lists={lists}
        onRemove={(index) => onRemove(index)}
        onAdd={(title, index) => onAddFromRecommended(title, index)}
        hide={isCreating}
        lastAddedIndex={lastAddedIndex}
      />
      {/* <ListItems
        lists={recommendedLists}
        onRemove={(index) => onRemove(index)}
        onAdd={(title, index) => onAddFromRecommended(title, index)}
        hide={!isCreating}
      /> */}
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