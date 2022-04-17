import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TodoItem } from 'components/TodoItem'
import {
  ClearButton,
  InfoText,
  ItemsLeft,
  List,
  StateButton,
  TodoFilterControl,
  TodoFiltersDesktop,
  TodoFiltersMobile,
  Wrapper,
} from 'components/TodoList'
import { TASK_STATE } from 'const'
import { deleteTodos, todosSelector } from 'store/slices/todoSlice'
import { filterActiveTodos, filterCompletedTodos } from 'utils/todos'

function TodoList() {
  const dispatch = useDispatch()

  const { todos } = useSelector(todosSelector)

  const [currentState, setCurrentState] = useState(TASK_STATE.All)
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [activeTasks, setActiveTasks] = useState(0)

  const states = Object.values(TASK_STATE)

  const handleStateChange = state => {
    setCurrentState(state)
  }

  const handleCompletedClear = () => {
    const completedTask = filterCompletedTodos(todos)
    const todoIds = completedTask.map(todo => todo.id)
    if (todoIds.length) {
      dispatch(deleteTodos(todoIds))
    }
  }

  useEffect(() => {
    switch (currentState) {
      case TASK_STATE.All:
        setFilteredTodos(todos)
        break
      case TASK_STATE.Completed:
        setFilteredTodos(filterCompletedTodos(todos))
        break
      case TASK_STATE.Active:
        setFilteredTodos(filterActiveTodos(todos))
        break
      default:
        setFilteredTodos(todos)
    }
  }, [currentState, todos])

  useEffect(() => {
    const tasks = filterActiveTodos(todos)
    setActiveTasks(tasks.length)
  }, [todos])

  return (
    <>
      <Wrapper>
        {!filteredTodos.length ? (
          <InfoText>
            There are no {currentState === TASK_STATE.All ? '' : currentState} tasks
          </InfoText>
        ) : (
          <List>
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </List>
        )}
        <TodoFilterControl>
          <ItemsLeft>{activeTasks} items left</ItemsLeft>
          <TodoFiltersDesktop>
            {states.map(state => (
              <StateButton
                key={state}
                active={state === currentState}
                onClick={() => handleStateChange(state)}
              >
                {state}
              </StateButton>
            ))}
          </TodoFiltersDesktop>
          <ClearButton onClick={() => handleCompletedClear()}>Clear Completed</ClearButton>
        </TodoFilterControl>
      </Wrapper>
      <TodoFiltersMobile>
        {states.map(state => (
          <StateButton
            key={state}
            active={state === currentState}
            onClick={() => handleStateChange(state)}
          >
            {state}
          </StateButton>
        ))}
      </TodoFiltersMobile>
    </>
  )
}

export { TodoList }
