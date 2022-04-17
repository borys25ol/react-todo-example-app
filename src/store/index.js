import { configureStore } from '@reduxjs/toolkit'

import todoSlice from 'store/slices/todoSlice'
import authSlice from 'store/slices/authSlice'

export default configureStore({
  reducer: {
    todos: todoSlice,
    auth: authSlice,
  },
})
