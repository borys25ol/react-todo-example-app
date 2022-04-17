import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from 'App'
import store from 'store'

import 'index.css'
import { LoginWrapper } from 'components/Wrapper'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <LoginWrapper>
          <App />
        </LoginWrapper>
      </Provider>
    </React.StrictMode>
  </Router>
)
