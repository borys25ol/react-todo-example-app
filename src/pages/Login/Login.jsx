import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import {
  Button,
  ButtonWrapper,
  Description,
  Field,
  Form,
  Header,
  Heading,
  Input,
  Wrapper,
} from 'components/AuthForm'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const user = { username, password }
    console.log(user)
  }

  return (
    <Wrapper>
      <Header>
        <Heading>Sign in</Heading>
        <Description>
          <NavLink to="/register">Need an account?</NavLink>
        </Description>
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
    </Wrapper>
  )
}

export { Login }
