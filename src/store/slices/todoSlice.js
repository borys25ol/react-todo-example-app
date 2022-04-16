import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { CREATE_TODO_URL, DELETE_TODO_URL, GET_TODOS_URL, UPDATE_TODO_URL } from 'config'

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(GET_TODOS_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic dGVzdC11c2VyOndlZWtwYXNzd29yZA==',
        },
      })
      const jsonData = await response.json()
      if (!jsonData.success) {
        throw new Error(jsonData.message)
      }
      return { tasks: jsonData.data }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async function (text, { rejectWithValue }) {
    try {
      const response = await fetch(CREATE_TODO_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: 'Basic dGVzdC11c2VyOndlZWtwYXNzd29yZA==',
        },
        body: JSON.stringify({ title: text }),
      })
      const jsonData = await response.json()
      if (!jsonData.success) {
        throw new Error(jsonData.message)
      }
      const createdTask = jsonData.data
      return { task: { id: createdTask.id, text: createdTask.title, completed: createdTask.done } }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async function (taskId, { rejectWithValue }) {
    try {
      const response = await fetch(DELETE_TODO_URL(taskId), {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic dGVzdC11c2VyOndlZWtwYXNzd29yZA==',
        },
      })
      const jsonData = await response.json()
      if (!jsonData.success) {
        throw new Error(jsonData.message)
      }
      return { taskId }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async function (task, { rejectWithValue }) {
    try {
      const response = await fetch(UPDATE_TODO_URL(task.id), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: 'Basic dGVzdC11c2VyOndlZWtwYXNzd29yZA==',
        },
        body: JSON.stringify({ title: task.text, done: task.completed }),
      })
      const jsonData = await response.json()
      if (!jsonData.success) {
        throw new Error(jsonData.message)
      }
      return { task }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchTodos.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.todos = action.payload.tasks.map(task => ({
        id: task.id,
        text: task.title,
        completed: task.done,
      }))
    },
    [createTodo.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [createTodo.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [createTodo.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.todos = [action.payload.task, ...state.todos]
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [updateTodo.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.todos = state.todos.map(task => {
        if (task.id === action.payload.task.id) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task
      })
    },
    [updateTodo.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [deleteTodo.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.todos = state.todos.filter(task => task.id !== action.payload.taskId)
    },
    [deleteTodo.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const todosSelector = state => state.todos

export default todoSlice.reducer
