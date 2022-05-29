import { ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyles from './globalStyles'
import ResetStyles from './resetStyles'
import theme from './theme'

export default ({
  children,
  className
}: {
  className?: string
  children: ReactNode
}) => (
  <>
    <ResetStyles />
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Container className={className}>{children}</Container>
    </ThemeProvider>
  </>
)

const Container = styled.div`
  width: 100%;
  height: 100%;
`
