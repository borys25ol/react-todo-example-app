const BASE_API_URL = `${process.env.REACT_APP_BASE_API_URL}/api/v1`

export const GET_TODOS_URL = `${BASE_API_URL}/tasks`
export const CREATE_TODO_URL = `${BASE_API_URL}/tasks`
export const DELETE_TODOS_URL = `${BASE_API_URL}/tasks`

export const UPDATE_TODO_URL = taskId => `${BASE_API_URL}/tasks/${taskId}`
export const DELETE_TODO_URL = taskId => `${BASE_API_URL}/tasks/${taskId}`
