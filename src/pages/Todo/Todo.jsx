import React, { useEffect, useState } from 'react'

import { Heading, Main } from 'components/Layout'
import { TodoForm } from 'components/TodoForm'
import { TodoList } from 'components/TodoList'
import { Footer } from 'components/Footer'
import { filterActiveTasks, filterCompletedTasks, getTaskId } from 'utils'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { DEFAULT_TODOS, TASK_STATE } from 'const'

function Todo() {
  const { storedValue, setValue } = useLocalStorage('todos', { todos: DEFAULT_TODOS })
  const [todos, setTodos] = useState(storedValue.todos)
  const [filteredTodos, setFilteredTodos] = useState(storedValue.todos)
  const [currentState, setCurrentState] = useState(TASK_STATE.All)
  const [activeTasks, setActiveTasks] = useState(0)

  const handleStateChange = state => {
    setCurrentState(state)
  }

  const handleTodoAdd = todoText => {
    const taskId = getTaskId(todos)
    const newTask = { id: taskId, text: todoText, completed: false }
    setTodos(currentTodos => [newTask, ...currentTodos])
    setCurrentState(TASK_STATE.All)
  }

  const handleTodoComplete = taskId => {
    const updatedTodos = todos.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        }
      }
      return task
    })
    setTodos(updatedTodos)
  }

  const handleTodoRemove = taskId => {
    const filteredTodosList = todos.filter(task => task.id !== taskId)
    setTodos(filteredTodosList)
  }

  const handleCompletedRemove = () => {
    const notCompletedTodos = filterActiveTasks(todos)
    setTodos(notCompletedTodos)
  }

  useEffect(() => {
    switch (currentState) {
      case TASK_STATE.All:
        setFilteredTodos(todos)
        break
      case TASK_STATE.Completed:
        setFilteredTodos(filterCompletedTasks(todos))
        break
      case TASK_STATE.Active:
        setFilteredTodos(filterActiveTasks(todos))
        break
      default:
        setFilteredTodos(todos)
    }
  }, [currentState, todos])

  useEffect(() => {
    const tasks = filterActiveTasks(todos)
    setActiveTasks(tasks.length)
  }, [todos])

  useEffect(() => {
    setValue({ todos })
  }, [todos, setValue])

  return (
    <>
      <Main>
        <Heading>To-do application</Heading>
        <TodoForm todosList={todos} handleTodoAdd={handleTodoAdd} />
        <TodoList
          states={Object.values(TASK_STATE)}
          todosList={filteredTodos}
          currentState={currentState}
          activeTasks={activeTasks}
          handleReorder={setTodos}
          handleStateChange={handleStateChange}
          handleTodoRemove={handleTodoRemove}
          handleTodoComplete={handleTodoComplete}
          handleCompletedRemove={handleCompletedRemove}
        />
      </Main>
      <Footer />
    </>
  )
}

export { Todo }
