import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { authSelector, setAuthorized, setUnauthorized } from 'store/slices/authSlice'
import { fetchTodos, todosSelector } from 'store/slices/todoSlice'

function LoginWrapper({ children }) {
  const dispatch = useDispatch()
  const [token] = useLocalStorage('token')
  const { todos } = useSelector(todosSelector)
  const { isLoggedIn } = useSelector(authSelector)

  useEffect(() => {
    if (!token) {
      dispatch(setUnauthorized())
    } else {
      dispatch(setAuthorized())
    }
  }, [token, dispatch])

  useEffect(() => {
    if (isLoggedIn && !todos) {
      dispatch(fetchTodos())
    }
  }, [isLoggedIn, todos, dispatch])

  return children
}

export { LoginWrapper }
