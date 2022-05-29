import styled from 'styled-components'

export const Subtitle = styled.h3`
  width: 100%;
  max-width: 600px;
  font-weight: 300;
  font-size: 17px;
  text-align: center;
  line-height: 1.5;
  color ${({ theme }) => theme.colors.grey600};
  margin: 0 auto 1rem;
  padding: 0 1rem;
`
