import { configureStore } from '@reduxjs/toolkit'

import todoSlice from 'store/slices/todoSlice'

export default configureStore({
  reducer: {
    todos: todoSlice,
  },
})
