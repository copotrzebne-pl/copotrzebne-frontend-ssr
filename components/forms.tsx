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

export const TextArea = styled.textarea`
  display: inline-block;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 1rem 1rem;
  resize: vertical;
  min-height: 5rem;

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

export const FormGroup = styled.div<{ isRelative?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  padding: 0 1.8rem;
  ${props => props.isRelative && 'position: relative'};
`

export const FormGroupRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
`

export const RowLabel = styled.div`
  display: inline-block;
  margin-right: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
  min-width: 20px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
`

export const FormError = styled.div`
  display: inline-block;
  color: red;
  margin: 1rem 0;
`

export const RequiredDecorator = styled.span`
  color: red;
  font-size: 0.9rem;
`
