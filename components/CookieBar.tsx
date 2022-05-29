import { useCallback } from 'react'
import styled from 'styled-components'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'

type CookiesConsentType = {
  analysisEnabled: boolean
}

export const CookieBar = () => {
  const [cookiesState, setCookiesState] = useLocalStorage<CookiesConsentType>(
    '_cookie_choices',
    {
      analysisEnabled: false
    }
  )

  const handleConsentSave = useCallback(() => {
    const consents = {
      ...cookiesState,
      analysisEnabled: true
    }
    setCookiesState(consents)
  }, [cookiesState, setCookiesState])

  if (cookiesState.analysisEnabled) {
    return null
  }

  return (
    <CookieBarComponent>
      <GeneralCookieInfo>
        <TranslatedText value="cookiesBarDescription" />
      </GeneralCookieInfo>
      <ButtonsWrapper>
        <Button onClick={() => handleConsentSave()}>Ok</Button>
      </ButtonsWrapper>
    </CookieBarComponent>
  )
}

export const CookieBarComponent = styled.div`
  position: fixed;
  bottom: 1.2rem;
  left: 1.2rem;
  width: calc(100% - 2.4rem);
  margin: 0;
  max-width: 380px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.black};
  z-index: 1000;
  max-height: calc(96% - 1.2rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
  ${breakpoint.s`
    padding: 1.6rem;
  `}
`

export const SectionDescription = styled.div`
  color: ${({ theme }) => theme.colors.white};
  & > * {
    display: inline-block;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.white};
    line-height: 1.5;
    margin-bottom: 0;
    ${breakpoint.s`
      font-size: 0.85rem;
    `}
  }
`

export const GeneralCookieInfo = styled(SectionDescription)`
  margin-bottom: 0.2rem;
  ${breakpoint.s`
    margin-bottom: 1.2rem;
  `}
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.2rem;
  ${breakpoint.s`
    margin-top: 0.2rem;
  `}
`

export const Button = styled.button`
  border: none;
  width: 100%;
  display: inline-block;
  height: 34px;
  line-height: 34px;
  vertical-align: middle;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 32px;
  font-size: 0.85rem;
`
