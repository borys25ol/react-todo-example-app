const API_ENV_URL =
  (window.__RUNTIME_CONFIG__ && window.__RUNTIME_CONFIG__.REACT_APP_BASE_API_URL) ||
  process.env.REACT_APP_BASE_API_URL

const BASE_API_URL = `${API_ENV_URL}/api/v1`

export const REGISTER_URL = `${BASE_API_URL}/user`
export const LOGIN_URL = `${BASE_API_URL}/user/login`

export const LOCALSTORAGE_TOKEN_KEY = 'token'
