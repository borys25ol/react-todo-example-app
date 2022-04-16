import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from 'App'
import store from 'store'
import { fetchTodos } from 'store/slices/todoSlice'

import 'index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

store.dispatch(fetchTodos())

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
)
