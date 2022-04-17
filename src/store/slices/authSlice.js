import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { AuthAPIService } from 'api/auth'
import { LOCALSTORAGE_TOKEN_KEY } from 'config'

const service = new AuthAPIService()

export const login = createAsyncThunk(
  'auth/login',
  async function ({ username, password }, { rejectWithValue }) {
    const response = await service.login(username, password)
    return { response }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async function ({ username, email, fullName, password }, { rejectWithValue }) {
    const response = await service.register(username, email, fullName, password)
    return { response }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    isLoggedIn: null,
    loginSuccess: null,
    loginMessage: null,
    registerSuccess: null,
    registerMessage: null,
  },
  reducers: {
    setAuthorized(state) {
      state.isLoggedIn = true
    },
    setUnauthorized(state) {
      state.status = 'resolved'
      state.isLoggedIn = false
    },
  },
  extraReducers: {
    [login.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.isLoggedIn = action.payload.response.success
      state.loginSuccess = action.payload.response.success
      state.loginMessage = action.payload.response.message
      if (action.payload.response.success) {
        const token = action.payload.response.data.token
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
      }
    },
    [register.pending]: state => {
      state.status = 'loading'
    },
    [register.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.registerSuccess = action.payload.response.success
      state.registerMessage = action.payload.response.message
    },
  },
})

export const { setAuthorized, setUnauthorized } = authSlice.actions

export const authSelector = state => state.auth

export default authSlice.reducer
