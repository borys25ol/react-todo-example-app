import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { EMAIL_REGEX } from 'config'
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
import { authSelector, register } from 'store/slices/authSlice'

function Register() {
  const dispatch = useDispatch()
  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  const { isLoggedIn, registerSuccess, registerMessage } = useSelector(authSelector)

  const onSubmit = data => {
    dispatch(register(data))
    reset()
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

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Input
                {...registerField('username', {
                  required: 'Required field',
                  minLength: {
                    value: 5,
                    message: 'Should be minimum 5 symbols',
                  },
                })}
                type="text"
                placeholder="Username"
              />
              {errors.username && <ErrorMessage>{errors.username?.message}</ErrorMessage>}
            </Field>
            <Field>
              <Input
                {...registerField('email', {
                  required: 'Required field',
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Please enter a valid email',
                  },
                })}
                type="email"
                placeholder="Email"
              />
              {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
            </Field>
            <Field>
              <Input
                {...registerField('fullName', {
                  required: 'Required field',
                  minLength: {
                    value: 3,
                    message: 'Should be minimum 3 symbols',
                  },
                })}
                type="text"
                placeholder="Full Name"
              />
              {errors.fullName && <ErrorMessage>{errors.fullName?.message}</ErrorMessage>}
            </Field>
            <Field>
              <Input
                {...registerField('password', {
                  required: 'Required field',
                  minLength: {
                    value: 8,
                    message: 'Should be minimum 8 symbols',
                  },
                })}
                type="password"
                placeholder="Password"
              />
              {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
            </Field>
            <ButtonWrapper>
              <Button type="submit" disabled={!isValid}>
                Sign up
              </Button>
            </ButtonWrapper>
          </Form>
        </>
      )}
    </Wrapper>
  )
}

export { Register }
