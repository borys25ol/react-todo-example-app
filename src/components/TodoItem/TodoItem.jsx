import React from 'react'
import { useDispatch } from 'react-redux'

import { ReactComponent as IconRemove } from 'assets/icon-cross.svg'
import { ReactComponent as IconCheck } from 'assets/icon-check.svg'
import { Wrapper, Flex, CheckboxWrapper, TodoText, RemoveButton, Mock } from 'components/TodoItem'
import { deleteTodo, updateTodo } from 'store/slices/todoSlice'

function TodoItem({ todo }) {
  const dispatch = useDispatch()

  const toggleCompleted = () => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }))
  }

  const handleTodoRemove = todo => {
    dispatch(deleteTodo(todo.id))
  }

  return (
    <Wrapper>
      <Flex>
        <CheckboxWrapper completed={todo.completed} onClick={() => toggleCompleted()}>
          {todo.completed ? <IconCheck /> : <Mock />}
        </CheckboxWrapper>
        <TodoText completed={todo.completed}>{todo.text}</TodoText>
      </Flex>
      <RemoveButton onClick={() => handleTodoRemove(todo)}>
        <IconRemove />
      </RemoveButton>
    </Wrapper>
  )
}

export { TodoItem }
