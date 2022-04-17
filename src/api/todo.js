import {
  GET_TODOS_URL,
  CREATE_TODO_URL,
  UPDATE_TODO_URL,
  DELETE_TODO_URL,
  DELETE_TODOS_URL,
  LOCALSTORAGE_TOKEN_KEY,
} from 'config'
import { getValue } from 'utils/localStorage'

class TodoAPIService {
  get headers() {
    return {
      Accept: 'application/json',
      Authorization: `Basic ${getValue(LOCALSTORAGE_TOKEN_KEY)}`,
      'Content-type': 'application/json',
    }
  }

  async fetchTodos() {
    const response = await fetch(GET_TODOS_URL, {
      method: 'GET',
      headers: this.headers,
    })
    return await response.json()
  }

  async createTodo(todoText) {
    const response = await fetch(CREATE_TODO_URL, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ title: todoText }),
    })
    return await response.json()
  }

  async updateTodo(todo) {
    const response = await fetch(UPDATE_TODO_URL(todo.id), {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ title: todo.text, done: todo.completed }),
    })
    return await response.json()
  }

  async deleteTodo(todoId) {
    const response = await fetch(DELETE_TODO_URL(todoId), {
      method: 'DELETE',
      headers: this.headers,
    })
    return await response.json()
  }

  async deleteTodos(todoIds) {
    const response = await fetch(DELETE_TODOS_URL, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({ ids: todoIds }),
    })
    return await response.json()
  }
}

export default new TodoAPIService()
