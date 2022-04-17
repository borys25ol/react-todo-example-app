import React, { useEffect } from 'react'

function useLocalStorage(key, initialValue = '') {
  const [storedValue, setStoredValue] = React.useState(() => {
    return localStorage.getItem(key) || initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, storedValue.toString())
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export { useLocalStorage }
