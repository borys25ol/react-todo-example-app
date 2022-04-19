import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { LOCALSTORAGE_TOKEN_KEY } from 'config'
import { getValue, setValue } from 'utils/localStorage'
import AuthAPIService from 'api/auth'

export const login = createAsyncThunk(
  'auth/login',
  async function ({ username, password }, { rejectWithValue }) {
    const response = await AuthAPIService.login(username, password)
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    setValue(LOCALSTORAGE_TOKEN_KEY, response.data.token)
    return { message: response.message }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async function ({ username, email, fullName, password }, { rejectWithValue }) {
    const response = await AuthAPIService.register(username, email, fullName, password)
    if (!response.success) {
      return rejectWithValue({ message: response.message })
    }
    return { message: response.message }
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
      state.isLoggedIn = true
      state.loginSuccess = true
      state.loginMessage = action.payload.message
    },
    [login.rejected]: (state, action) => {
      state.loginSuccess = false
      state.loginMessage = action.payload.message
    },
    [register.pending]: state => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      state.registerSuccess = true
      state.registerMessage = action.payload.message
    },
    [register.rejected]: (state, action) => {
      state.registerSuccess = false
      state.registerMessage = action.payload.message
    },
  },
})

export const { setAuthorized, clearLoginData, clearRegisterData } = authSlice.actions

export const authSelector = state => state.auth

export default authSlice.reducer
