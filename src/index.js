import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from 'App'
import store from 'store'

import 'index.css'
import { setAuthorized } from 'store/slices/authSlice'

const root = ReactDOM.createRoot(document.getElementById('root'))

store.dispatch(setAuthorized())

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
