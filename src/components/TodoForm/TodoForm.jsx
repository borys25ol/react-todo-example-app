import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { CheckboxWrapper, Input, Wrapper } from 'components/TodoForm'
import { createTodo } from 'store/slices/todoSlice'

function TodoForm() {
  const dispatch = useDispatch()

  const [value, setValue] = useState('')

  const addTodo = () => {
    if (value.trim()) {
      dispatch(createTodo(value))
      setValue('')
    }
  }

  return (
    <Wrapper>
      <CheckboxWrapper />
      <Input
        type="text"
        placeholder="Create a new todo…"
        value={value}
        onChange={event => setValue(event.target.value)}
        onKeyPress={e => e.key === 'Enter' && addTodo()}
      />
    </Wrapper>
  )
}

export { TodoForm }
