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
import { authSelector, register } from 'store/slices/authSlice'

function Register() {
  const dispatch = useDispatch()

  const { isLoggedIn, registerSuccess, registerMessage } = useSelector(authSelector)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(register({ username, email, fullName, password }))
    setPassword('')
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  if (registerSuccess) {
    return <Redirect to="/login" />
  }

  return (
    <Wrapper>
      {isLoggedIn === false && (
        <>
          <Header>
            <Heading>Sign up</Heading>
            <Description>
              <NavLink to="/login">Have an account?</NavLink>
            </Description>
            {registerSuccess === false && <ResponseMessage>{registerMessage}</ResponseMessage>}
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
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
              <Button>Sign up</Button>
            </ButtonWrapper>
          </Form>
        </>
      )}
    </Wrapper>
  )
}

export { Register }
