import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { TodoAPIService } from 'api'

const token = localStorage.getItem('token')

const service = new TodoAPIService(token)

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await service.fetchTodos()
      if (!response.success) {
        throw new Error(response.message)
      }
      return { tasks: response.data }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async function (text, { rejectWithValue }) {
    try {
      const response = await service.createTodo(text)
      if (!response.success) {
        throw new Error(response.message)
      }
      return {
        task: { id: response.data.id, text: response.data.title, completed: response.data.done },
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async function (todo, { rejectWithValue }) {
    try {
      const response = await service.updateTodo(todo)
      if (!response.success) {
        throw new Error(response.message)
      }
      return { todo }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async function (todoId, { rejectWithValue }) {
    try {
      const response = await service.deleteTodo(todoId)
      if (!response.success) {
        throw new Error(response.message)
      }
      return { todoId }
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
        if (task.id === action.payload.todo.id) {
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
      state.todos = state.todos.filter(task => task.id !== action.payload.todoId)
    },
    [deleteTodo.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export const todosSelector = state => state.todos

export default todoSlice.reducer
