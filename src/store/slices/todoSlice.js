import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import TodoService from 'api/todo'

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async function (_, { rejectWithValue }) {
    const response = await TodoService.fetchTodos()
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    return { todos: response.data }
  }
)

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async function (text, { rejectWithValue }) {
    const response = await TodoService.createTodo(text)
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    return {
      todo: { id: response.data.id, text: response.data.title, completed: response.data.done },
    }
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async function (todo, { rejectWithValue }) {
    const response = await TodoService.updateTodo(todo)
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    return { todo }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async function (todoId, { rejectWithValue }) {
    const response = await TodoService.deleteTodo(todoId)
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    return { todoId }
  }
)

export const deleteTodos = createAsyncThunk(
  'todo/deleteTodos',
  async function (todoIds, { rejectWithValue }) {
    const response = await TodoService.deleteTodos(todoIds)
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    return { todoIds }
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: null,
    todos: null,
    isError: null,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [fetchTodos.pending]: state => {
      state.loading = true
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.loading = false
      state.isError = false
      state.todos = action.payload.todos.map(todo => ({
        id: todo.id,
        text: todo.title,
        completed: todo.done,
      }))
    },
    [fetchTodos.rejected]: (state, action) => {
      state.loading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
    [createTodo.pending]: state => {
      state.loading = true
    },
    [createTodo.fulfilled]: (state, action) => {
      state.loading = false
      state.isError = false
      state.todos = [action.payload.todo, ...state.todos]
    },
    [createTodo.rejected]: (state, action) => {
      state.loading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
    [updateTodo.pending]: state => {
      state.loading = true
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.loading = false
      state.isError = false
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
      state.loading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
    [deleteTodo.pending]: state => {
      state.loading = true
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false
      state.isError = false
      state.todos = state.todos.filter(todo => todo.id !== action.payload.todoId)
    },
    [deleteTodo.rejected]: (state, action) => {
      state.loading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
    [deleteTodos.pending]: state => {
      state.loading = true
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.loading = false
      state.isError = false
      state.todos = state.todos.filter(todo => !action.payload.todoIds.includes(todo.id))
    },
    [deleteTodos.rejected]: (state, action) => {
      state.loading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
  },
})

export const todosSelector = state => state.todos

export default todoSlice.reducer
