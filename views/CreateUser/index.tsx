import { useState, useCallback, SyntheticEvent } from 'react'
import Button from 'components/Button'
import {
  Form,
  FormGroup,
  Label,
  RequiredDecorator,
  TextInput
} from 'components/forms'
import PageTitle from 'components/PageTitle'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { getRestClient } from 'utils/restClient'
import { API } from 'utils/endpoints'
import { useCheckIfAuthorized } from 'hooks/useCheckIfAuthorized'

export default () => {
  useCheckIfAuthorized()
  const [user, setUser] = useState<{
    login: string
    password: string
    placeId: string
    role: string
  }>({
    login: '',
    password: '',
    placeId: '',
    role: 'place_manager'
  })

  const [success, setSuccess] = useState(false)

  const setValue = useCallback(
    (name: string, value: string) => {
      setUser({ ...user, [name]: value })
    },
    [user]
  )

  const saveUser = async (user: {
    login: string
    password: string
    placeId: string
    role: string
  }) => {
    const client = await getRestClient(process.env.NEXT_PUBLIC_API_URLL)

    await client.post(API.panel.users, user)
  }

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault()

      if (!user.login || !user.password || !user.placeId) {
        return
      }

      try {
        await saveUser(user)
        setSuccess(true)
      } catch (error) {
        alert(JSON.stringify(error))
      }
    },
    [user, saveUser]
  )

  return (
    <Container>
      <PageTitle hasBackIcon={false}>
        <TranslatedText value="createUser" />
      </PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <TranslatedText value="login" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="userLogin"
            type="text"
            placeholder="Login"
            required
            value={user.login}
            onChange={e => setValue('login', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="password" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="userPassword"
            type="text"
            placeholder="Password"
            required
            value={user.password}
            onChange={e => setValue('password', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="placeId" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="street"
            type="text"
            placeholder="street"
            required
            value={user.placeId}
            onChange={e => setValue('placeId', e.target.value)}
          />
        </FormGroup>
        <Button type="submit" onClick={handleSubmit}>
          <TranslatedText value="save" />
        </Button>
        <br />
        {success && 'USER CREATED'}
      </Form>
    </Container>
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
