import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  ButtonWrapper,
  Description,
  ErrorMessage,
  Field,
  Form,
  Header,
  Heading,
  Input,
  ResponseMessage,
  Wrapper,
} from 'components/AuthForm'
import { authSelector, login } from 'store/slices/authSlice'
import { useForm } from 'react-hook-form'

function Login() {
  const dispatch = useDispatch()
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' })

  const { registerSuccess, registerMessage } = useSelector(authSelector)
  const { isLoggedIn, loginSuccess, loginMessage } = useSelector(authSelector)

  const onSubmit = data => {
    dispatch(login(data))
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

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Input
                {...registerField('username', {
                  required: 'Required field',
                  minLength: {
                    value: 5,
                    message: 'Username field should be minimum 5 symbols',
                  },
                })}
                type="text"
                placeholder="Username"
              />
              {errors.username && <ErrorMessage>{errors.username?.message}</ErrorMessage>}
            </Field>
            <Field>
              <Input
                {...registerField('password', {
                  required: 'Required field',
                  minLength: {
                    value: 8,
                    message: 'Password field should be minimum 8 symbols',
                  },
                })}
                type="password"
                placeholder="Password"
              />
              {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
            </Field>
            <ButtonWrapper>
              <Button type="submit">Sign in</Button>
            </ButtonWrapper>
          </Form>
        </>
      )}
    </Wrapper>
  )
}

export { Login }
