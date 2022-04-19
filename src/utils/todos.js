import { isFalse, isTrue } from 'utils/bool'

export function filterActiveTodos(todos) {
  return todos.filter(todo => isFalse(todo.completed))
}

export function filterCompletedTodos(todos) {
  return todos.filter(todo => isTrue(todo.completed))
}
