import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { Todo } from 'pages/Todo'
import { NotFound } from 'pages/NotFound'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Todo} exact />
      <Route component={NotFound} />
    </Switch>
  )
}
