import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  ButtonWrapper,
  Description,
  Field,
  Form,
  Header,
  Heading,
  Input,
  ResponseMessage,
  Wrapper,
} from 'components/AuthForm'
import { authSelector, login } from 'store/slices/authSlice'

function Login() {
  const dispatch = useDispatch()

  const { registerSuccess, registerMessage } = useSelector(authSelector)
  const { isLoggedIn, loginSuccess, loginMessage } = useSelector(authSelector)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(login({ username, password }))
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <Wrapper>
      {isLoggedIn === false && (
        <>
          <Header>
            <Heading>Sign in</Heading>
            <Description>
              <NavLink to="/register">Need an account?</NavLink>
            </Description>
            {registerSuccess && <ResponseMessage>{registerMessage}</ResponseMessage>}
            {loginSuccess === false && <ResponseMessage>{loginMessage}</ResponseMessage>}
          </Header>

          <Form onSubmit={e => handleSubmit(e)}>
            <Field>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Field>
            <Field>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Field>
            <ButtonWrapper>
              <Button>Sign in</Button>
            </ButtonWrapper>
          </Form>
        </>
      )}
    </Wrapper>
  )
}

export { Login }
