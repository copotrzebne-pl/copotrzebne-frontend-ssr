import { useCallback, SyntheticEvent, useState } from 'react'
import styled from 'styled-components'

import Button from 'components/Button'
import {
  Form,
  FormError,
  FormGroup,
  FormGroupRow,
  Label,
  RequiredDecorator,
  RowLabel,
  TextInput
} from 'components/forms'
import PageTitle from 'components/PageTitle'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { useRequestPlaceContext } from 'contexts/requestPlaceContext'
import { isEmail } from 'utils/validators'
import { Language } from 'contexts/types'

export default () => {
  const {
    place,
    userEmail,
    setError,
    error,
    setUserEmail,
    isPlaceCreated,
    setPlaceValue,
    savePlace
  } = useRequestPlaceContext()

  const [userEmailValid, setUserEmailValid] = useState<boolean>(true)

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      if (isPlaceCreated) {
        return
      }

      if (!isEmail(userEmail)) {
        setError('notAnEmail')
        setUserEmailValid(false)
        return
      }
      setUserEmailValid(true)

      if (
        !userEmail ||
        !place.name ||
        !place.city ||
        !place.street ||
        !place.buildingNumber
      ) {
        setError('fulfillRequiredFields')
        return
      }
      savePlace()
    },
    [place, setError, userEmail, isPlaceCreated]
  )

  return (
    <Container>
      <PageTitle>
        <TranslatedText value="addNewPlace" />
      </PageTitle>
      <Wrapper>
        <TranslatedText value="addNewPlaceDescription" />
      </Wrapper>
      {!isPlaceCreated && (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <TranslatedText value="userEmail" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <TextInput
              id="login"
              type="text"
              placeholder="login"
              required
              value={userEmail}
              onChange={e => {
                setUserEmail(e.target.value)
                setUserEmailValid(true)
                setError(null)
              }}
            />
            {!userEmailValid && (
              <RequiredDecorator>
                <br />
                <TranslatedText value="notAnEmail" />
              </RequiredDecorator>
            )}
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="name" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <FormGroupRow>
              <RowLabel>PL</RowLabel>
              <TextInput
                id="name"
                type="text"
                placeholder="name"
                required
                value={place.name[Language.PL] || ''}
                onChange={e =>
                  setPlaceValue('name', { ...place.name, pl: e.target.value })
                }
              />
            </FormGroupRow>
            <FormGroupRow>
              <RowLabel>EN</RowLabel>
              <TextInput
                id="name"
                type="text"
                placeholder="name"
                required
                value={place.name[Language.EN] || ''}
                onChange={e =>
                  setPlaceValue('name', { ...place.name, en: e.target.value })
                }
              />
            </FormGroupRow>
            <FormGroupRow>
              <RowLabel>UA</RowLabel>
              <TextInput
                id="name"
                type="text"
                placeholder="name"
                required
                value={place.name[Language.UA] || ''}
                onChange={e =>
                  setPlaceValue('name', { ...place.name, ua: e.target.value })
                }
              />
            </FormGroupRow>
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="city" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <TextInput
              id="city"
              type="text"
              placeholder="city"
              required
              value={place.city || ''}
              onChange={e => setPlaceValue('city', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="street" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <TextInput
              id="street"
              type="text"
              placeholder="street"
              required
              value={place.street || ''}
              onChange={e => setPlaceValue('street', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="buildingNumber" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <TextInput
              id="buildingNumber"
              type="text"
              placeholder="buildingNumber"
              required
              value={place.buildingNumber || ''}
              onChange={e => setPlaceValue('buildingNumber', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="apartmentNumber" />
            </Label>
            <TextInput
              id="apartment"
              type="text"
              placeholder="apartment"
              value={place.apartment || ''}
              onChange={e => setPlaceValue('apartment', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="workingHours" />
            </Label>
            <TextInput
              id="workingHours"
              type="text"
              placeholder="working hours"
              value={place.workingHours || ''}
              onChange={e => setPlaceValue('workingHours', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="additionalDescription" />
            </Label>
            <TextInput
              id="description"
              type="text"
              placeholder="description"
              value={place.additionalDescription || ''}
              onChange={e =>
                setPlaceValue('additionalDescription', e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="email" />
            </Label>
            <TextInput
              id="email"
              type="text"
              placeholder="email"
              value={place.email || ''}
              onChange={e => setPlaceValue('email', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="phone" />
            </Label>
            <TextInput
              id="phone"
              type="text"
              placeholder="phone"
              value={place.phone || ''}
              onChange={e => setPlaceValue('phone', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="bankAccount" />
            </Label>
            <TextInput
              id="bankAccount"
              type="text"
              placeholder="Bank Account"
              value={place.bankAccount || ''}
              onChange={e => setPlaceValue('bankAccount', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="bankAccountDescription" />
            </Label>
            <TextInput
              id="bankAccountDescription"
              type="text"
              placeholder="Bank Account Description"
              value={place.bankAccountDescription || ''}
              onChange={e =>
                setPlaceValue('bankAccountDescription', e.target.value)
              }
            />
          </FormGroup>
          <Wrapper>
            {error && (
              <FormError>
                <TranslatedText value={error} />
              </FormError>
            )}
            <Button type="submit" onClick={handleSubmit}>
              <TranslatedText value="save" />
            </Button>
          </Wrapper>
        </Form>
      )}
      {isPlaceCreated && (
        <ConfirmationWrapper>
          <TranslatedText value="thanksForRequestingPlace" />
          <br />
          <TranslatedText value="credentialsWillBeSent" />
        </ConfirmationWrapper>
      )}
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

const Wrapper = styled.div`
  width: 100%;
  padding: 2.2rem 2rem 2rem;
  margin-bottom: 2rem;
`

const ConfirmationWrapper = styled(Wrapper)`
  color: green;
`
