import React from 'react'

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

function TodoList({
  states,
  todosList,
  currentState,
  activeTasks,
  handleReorder,
  handleStateChange,
  handleTodoRemove,
  handleTodoComplete,
  handleCompletedRemove,
}) {
  return (
    <>
      <Wrapper>
        {todosList.length < 1 ? (
          <InfoText>
            There are no {currentState === TASK_STATE.All ? '' : currentState} tasks
          </InfoText>
        ) : (
          <List>
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                isCompleted={todo.completed}
                handleTodoRemove={handleTodoRemove}
                handleTodoComplete={handleTodoComplete}
              />
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
          <ClearButton onClick={() => handleCompletedRemove()}>Clear Completed</ClearButton>
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
