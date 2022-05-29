import styled from 'styled-components'

export default styled.button`
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
  &:disabled {
    background-color: #bababa;
  }
`
