import React from 'react'
import { useSelector } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'
import { Redirect } from 'react-router-dom'

import { Heading, Main } from 'components/Layout'
import { TodoForm } from 'components/TodoForm'
import { TodoList } from 'components/TodoList'
import { Footer } from 'components/Footer'
import { todosSelector } from 'store/slices/todoSlice'
import { authSelector } from 'store/slices/authSlice'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { getSpinnerColor } from 'const'

function Todo() {
  const [theme] = useLocalStorage('theme')

  const { isLoggedIn } = useSelector(authSelector)
  const { todos } = useSelector(todosSelector)

  if (isLoggedIn === false) {
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
