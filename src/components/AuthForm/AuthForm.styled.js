import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 40px;
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
    margin-top: 15px;
    padding: 22px 24px;
  }
`

export const Field = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Heading = styled.h1`
  font-size: 36px;
`

export const Description = styled.p`
  font-size: 16px;
  margin-top: 15px;
  color: var(--footer-blue-color);
`

export const ResponseMessage = styled.p`
  margin-top: 25px;
  font-weight: var(--fw-bold);
`

export const Form = styled.form``

export const Input = styled.input`
  padding: 20px 10px;
  display: block;
  width: 100%;
  line-height: 12px;
  font-size: var(--fs);
  color: var(--todo-color);
  border: 1px solid var(--border-color);
  border-radius: 5px;

  &::placeholder {
    padding-left: 5px;
    font-size: var(--fs);
    color: var(--input-placeholder-color);
    letter-spacing: -0.17px;
  }

  &:focus {
    outline: none;
    box-shadow: none;
    border: 2px solid var(--footer-blue-color);
  }
`

export const ErrorMessage = styled.li`
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: var(--fw-bold);
  color: red;
`

export const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  border-radius: 5px;

  @media screen and (min-width: 768px) {
    justify-content: right;
  }

  @media screen and (min-width: 1024px) {
    justify-content: right;
  }
`

export const Button = styled.button`
  width: 100%;
  height: 50px;
  border: 2px solid var(--footer-blue-color);
  border-radius: inherit;
  cursor: pointer;

  background-color: white;

  &:active {
    background-color: var(--auth-button-active-color);
  }

  &:disabled {
    color: black;
    opacity: 0.8;
    background-color: white !important;
    cursor: not-allowed;
  }

  @media screen and (min-width: 768px) {
    width: 120px;
  }

  @media screen and (min-width: 1024px) {
    width: 120px;
  }
`
