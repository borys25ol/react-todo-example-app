import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'

import { Heading, Main } from 'components/Layout'
import { TodoForm } from 'components/TodoForm'
import { TodoList } from 'components/TodoList'
import { Footer } from 'components/Footer'
import { todosSelector } from 'store/slices/todoSlice'

function Todo() {
  const [loading, setLoading] = useState(true)
  const { status } = useSelector(todosSelector)

  const currentTheme = document.body.getAttribute('data-theme')
  const spinnerColor = currentTheme === 'light' ? 'black' : 'white'

  useEffect(() => {
    if (status !== 'resolved') {
      return
    }
    setLoading(false)
  }, [status])

  return (
    <>
      <Main>
        <Heading>To-do application</Heading>
        <TodoForm />
        {loading ? <ThreeDots color={spinnerColor} wrapperClass="spinner" /> : <TodoList />}
      </Main>
      <Footer />
    </>
  )
}

export { Todo }
