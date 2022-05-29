import styled from 'styled-components'
import {
  LoginForm,
  FormGroup,
  Label,
  TextInput,
  LoginButton
} from './components'
import { useUserContext } from 'contexts/userContext'
import PageTitle from 'components/PageTitle'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { SyntheticEvent, useCallback, useState } from 'react'
import { PrismicRichText } from '@prismicio/react'

export default ({page}: {page: any}) => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login: loginUser } = useUserContext()
  const handleLogin = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      if (!login || !password) return
      loginUser(login, password)
    },
    [login, password, loginUser]
  )

  return (
    <>
      <Container>
        <PageTitle>
          <PrismicRichText field={page.title} />
        </PageTitle>
        <LoginForm onSubmit={handleLogin}>
          <FormGroup>
            <Label>
              <TranslatedText value="email" />
            </Label>
            <TextInput
              autoComplete="on"
              id="login"
              type="email"
              placeholder="Email"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="password" />
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <LoginButton type="submit" onClick={handleLogin}>
              <TranslatedText value="logIn" />
            </LoginButton>
          </FormGroup>
        </LoginForm>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`
