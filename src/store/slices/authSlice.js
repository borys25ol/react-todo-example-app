import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { LOCALSTORAGE_TOKEN_KEY } from 'config'
import { AuthAPIService } from 'api/auth'
import { getValue, setValue } from 'utils/localStorage'

const service = new AuthAPIService()

export const login = createAsyncThunk('auth/login', async function ({ username, password }) {
  const response = await service.login(username, password)
  return { response }
})

export const register = createAsyncThunk(
  'auth/register',
  async function ({ username, email, fullName, password }) {
    const response = await service.register(username, email, fullName, password)
    return { response }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: null,
    isLoggedIn: null,
    loginSuccess: null,
    loginMessage: null,
    registerSuccess: null,
    registerMessage: null,
  },
  reducers: {
    setAuthorized(state) {
      state.isLoggedIn = !!getValue(LOCALSTORAGE_TOKEN_KEY)
    },
    clearLoginData(state) {
      state.loginSuccess = null
      state.loginMessage = null
    },
    clearRegisterData(state) {
      state.registerSuccess = null
      state.registerMessage = null
    },
  },
  extraReducers: {
    [login.pending]: state => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.isLoggedIn = action.payload.response.success
      state.loginSuccess = action.payload.response.success
      state.loginMessage = action.payload.response.message
      if (action.payload.response.success) {
        const token = action.payload.response.data.token
        setValue(LOCALSTORAGE_TOKEN_KEY, token)
      }
    },
    [register.pending]: state => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      state.registerSuccess = action.payload.response.success
      state.registerMessage = action.payload.response.message
    },
  },
})

export const { setAuthorized, clearLoginData, clearRegisterData } = authSlice.actions

export const authSelector = state => state.auth

export default authSlice.reducer
