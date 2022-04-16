import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--background-color);
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);

  @media screen and (min-width: 768px) {
    padding: 16px 22px;
  }

  @media screen and (min-width: 1024px) {
    padding: 22px 24px;
  }
`

const Field = styled.div`
  margin-top: 25px;
  display: flex;
  padding: 20px 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
`

const Header = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Heading = styled.h1`
  font-size: 36px;
`

const Description = styled.p`
  font-size: 16px;
  margin-top: 15px;
  color: var(--footer-blue-color);
`

const Form = styled.form``

const Input = styled.input`
  display: block;
  width: 100%;
  margin-left: 12px;
  font-size: var(--fs);
  line-height: 12px;
  color: var(--todo-color);

  border: none;
  outline: none;

  &::placeholder {
    font-size: var(--fs);
    color: var(--input-placeholder-color);
    letter-spacing: -0.17px;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: right;
  border-radius: 5px;
`

const Button = styled.button`
  width: 120px;
  height: 50px;
  border-color: var(--border-color);
  border-radius: inherit;
  cursor: pointer;

  &:active {
    background-color: #aaa;
  }
`

export { Header, Heading, Form, Description, Wrapper, Field, Input, Button, ButtonWrapper }
