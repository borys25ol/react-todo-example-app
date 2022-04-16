import React, { useState } from 'react'

import {
  Button,
  ButtonWrapper,
  Description,
  Field,
  Header,
  Heading,
  Input,
  Wrapper,
} from 'components/AuthForm'

function AuthForm() {
  const [value, setValue] = useState('')

  return (
    <Wrapper>
      <Header>
        <Heading>Sign in</Heading>
        <Description>Need an account?</Description>
      </Header>
      <Field>
        <Input
          type="text"
          placeholder="Username"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </Field>
      <Field>
        <Input
          type="text"
          placeholder="Password"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </Field>

      <ButtonWrapper>
        <Button>Sign in</Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export { AuthForm }
