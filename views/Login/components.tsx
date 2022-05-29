import styled from 'styled-components'

export const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 0 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  padding: 0 1.8rem;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
`

export const LoginButton = styled.button`
  border: none;
  outline: none;
  padding: 0.8rem 1.8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 10px;
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 1.6rem;
`

export const RegisterPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.2rem;
  width: 100%;
  max-width: 320px;
`

export const RegisterTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  lin-height: 1.6;
  color: ${({ theme }) => theme.colors.grey900};
`
