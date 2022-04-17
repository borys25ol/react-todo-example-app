export function getValue(key) {
  return localStorage.getItem(key)
}

export function setValue(key, value) {
  return localStorage.setItem(key, value)
}
