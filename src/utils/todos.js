export function filterActiveTodos(todos) {
  return todos.filter(todo => todo.completed === false)
}

export function filterCompletedTodos(todos) {
  return todos.filter(todo => todo.completed === true)
}
