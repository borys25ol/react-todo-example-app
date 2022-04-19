import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'
import { Redirect } from 'react-router-dom'

import { Heading, Main } from 'components/Layout'
import { TodoForm } from 'components/TodoForm'
import { TodoList } from 'components/TodoList'
import { Footer } from 'components/Footer'
import { fetchTodos, todosSelector } from 'store/slices/todoSlice'
import { authSelector } from 'store/slices/authSlice'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { getSpinnerColor } from 'const'
import { isFalse } from '../../utils/bool'

function Todo() {
  const dispatch = useDispatch()
  const [theme] = useLocalStorage('theme')

  const { isLoggedIn } = useSelector(authSelector)
  const { todos } = useSelector(todosSelector)

  useEffect(() => {
    if (isLoggedIn && !todos) {
      dispatch(fetchTodos())
    }
  }, [todos, isLoggedIn, dispatch])

  if (isFalse(isLoggedIn)) {
    return <Redirect to="/login" />
  }

  return (
    <>
      {isLoggedIn && (
        <>
          <Main>
            <Heading>To-do application</Heading>
            <TodoForm />
            {!todos ? (
              <ThreeDots color={getSpinnerColor(theme)} wrapperClass="spinner" />
            ) : (
              <TodoList />
            )}
          </Main>
          <Footer />
        </>
      )}
    </>
  )
}

export { Todo }
