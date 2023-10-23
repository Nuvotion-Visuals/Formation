import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box, TextInput, Button, Gap, Item, LineBreak, Spacer, Label, DropTarget, DragOrigin } from '../../internal'

export default {
  title: 'DND/DragAndDrop',
  component: DragOrigin,
} as ComponentMeta<typeof DragOrigin>


const GenericTemplate: ComponentStory<typeof DragOrigin> = () => {
  const [activeItems, setActiveItems] = useState<string[]>([])

  const availableItems = ['Drag Origin 1', 'Drag Origin 2', 'Drag Origin 3']

  const onDropHandler = (item: string) => {
    setActiveItems(prevState => [...prevState, item])
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <Box wrap>
        <Item title='Drag Origins' />
        <LineBreak />
        {
          availableItems.map((item, index) => (
            <DragOrigin key={index} data={{ origin: 'Generic', item }}>
              <Item text={item} />
            </DragOrigin>
          ))
        }
      </Box>

      <DropTarget
        onDrop={data => onDropHandler(data.item)}
        acceptedOrigins={['Generic']}
      >
        <Box wrap>
          <Item title='Drag Target' />
          <LineBreak />
          {
            activeItems.map((item, index) => (
              <Item key={`${item}-${index}`} text={`From ${item}`} />
            ))
          }
        </Box>
      </DropTarget>
    </div>
  )
}

export const BasicExample = GenericTemplate.bind({})
GenericTemplate.args = {}

const Template: ComponentStory<typeof DragOrigin> = () => {
  const [todo, setTodo] = useState([
    'Mix dry ingredients',
    'Beat eggs and sugar'
  ])
  
  const [inProgress, setInProgress] = useState([
    'Preheat oven',
    'Grease the cake pan'
  ])
  
  const [completed, setCompleted] = useState([
    'Choose cake recipe',
    'Check for required utensils',
    'Buy ingredients',
  ])

  const [newTask, setNewTask] = useState('')

  const removeTask = (column: string, task: string) => {
    switch (column) {
      case 'ToDo':
        setTodo(prevState => prevState.filter(t => t !== task))
        break
      case 'InProgress':
        setInProgress(prevState => prevState.filter(t => t !== task))
        break
      case 'Completed':
        setCompleted(prevState => prevState.filter(t => t !== task))
        break
      default:
        break
    }
  }

  const onDropHandler = (column: string, origin: string, task: string) => {
    if (column !== origin) {
      switch (column) {
        case 'ToDo':
          setTodo(prevState => [...prevState, task])
          break
        case 'InProgress':
          setInProgress(prevState => [...prevState, task])
          break
        case 'Completed':
          setCompleted(prevState => [...prevState, task])
          break
        default:
          break
      }
      removeTask(origin, task)
    }
  }

  const acceptedOrigins = ['ToDo', 'InProgress', 'Completed']

  const addTask = () => {
    setTodo(prevState => [...prevState, newTask])
    setNewTask('')
  }

  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
      <DropTarget
        onDrop={data => onDropHandler('ToDo', data.origin, data.task)}
        acceptedOrigins={acceptedOrigins}
      >
        <Box wrap>
          <Item title='To Do' children={<Label label={`${todo.length}`} labelColor='red'/>} />
          <LineBreak />
          <Box wrap width={'100%'}>
            {
              todo.map((task, index) => (
                <DragOrigin key={index} data={{ origin: 'ToDo', task }}>
                  <Item text={task} />
                </DragOrigin>
              ))
            }
            <Box pt={.25} width={'100%'}>
              <Gap disableWrap>
                <TextInput 
                  value={newTask} 
                  onChange={val => setNewTask(val)} 
                  compact 
                  placeholder='Add new To Do'
                />
                <Button onClick={addTask} icon='plus' iconPrefix='fas' compact disabled={newTask === ''} />
              </Gap>
            </Box>
            
          </Box>
        </Box>
      </DropTarget>

      <DropTarget
        onDrop={data => onDropHandler('InProgress', data.origin, data.task)}
        acceptedOrigins={acceptedOrigins}
      >
        <Box wrap>
          <Item title='In Progres' children={<Label label={`${inProgress.length}`} labelColor='yellow'/>} />
          <LineBreak />
          <Box wrap width={'100%'}>
            {
              inProgress.map((task, index) => (
                <DragOrigin key={index} data={{ origin: 'InProgress', task }}>
                  <Item text={task} />
                </DragOrigin>
              ))
            }
          </Box>
        </Box>
      </DropTarget>

      <Box height='100%' width={'100%'}>
      <DropTarget
        onDrop={data => onDropHandler('Completed', data.origin, data.task)}
        acceptedOrigins={acceptedOrigins}
      >
        <Box wrap>
          <Item title='Completed' children={<Label label={`${completed.length}`} labelColor='green'/>} />
          <LineBreak />
          <Box wrap width={'100%'}>
            {
              completed.map((task, index) => (
                <DragOrigin key={index} data={{ origin: 'Completed', task }}>
                  <Item text={task} />
                </DragOrigin>
              ))
            }
          </Box>
        </Box>
      </DropTarget>
      </Box>
    </div>
  )
}

export const KanbanBoard = Template.bind({})
KanbanBoard.args = {}
