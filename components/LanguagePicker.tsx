import styled from 'styled-components'
import { ReactComponent as PolandFlag } from 'assets/poland-flag-square.svg'
import { ReactComponent as EnglandFlag } from 'assets/england-flag-square.svg'
import { ReactComponent as UkraineFlag } from 'assets/ukraine-flag-square.svg'
import { useUserContext } from 'contexts/userContext'

export default () => {
  const { language, changeLanguage } = useUserContext()

  return (
    <>
      <Language
        selected={language === 'pl'}
        onClick={() => changeLanguage('pl')}
      >
        <PolandFlag />
      </Language>
      <Language
        selected={language === 'ua'}
        onClick={() => changeLanguage('ua')}
      >
        <UkraineFlag />
      </Language>
      <Language
        selected={language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        <EnglandFlag />
      </Language>
    </>
  )
}

const Language = styled.div<{ selected: boolean }>`
  margin-left: 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transform: scale(1);
  transition: 0.3s;

  & > svg {
    width: 2.2rem;
    box-shadow: 0 0 3px #b0b0b0;
  }
`
