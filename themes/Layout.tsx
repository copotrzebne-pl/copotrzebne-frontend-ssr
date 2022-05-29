import { ReactNode } from 'react'
import styled from 'styled-components'
import Header from 'components/PageHeader'
import Copyright from 'components/Copyright'
import { CookieBar } from 'components/CookieBar'
import { useUserContext } from 'contexts/userContext'
import { getDefaultMenuItems } from 'utils/menus'
import { useCallback } from 'react'

export default ({ children } : { children: ReactNode }) => {
  const { authorized, setAuthorized } = useUserContext()

  const handleLogout = useCallback(() => {
    try {
      window.localStorage.removeItem('_token')
      setAuthorized(false)
      //TODO: navigate
    } catch {
      console.error('logout error')
    }
  }, [])

  return (
    <>
      <Header menuItems={getDefaultMenuItems({ authorized: false, handleLogout })} />
      <PageContent>
        {children}
      </PageContent>
      <CookieBar />
      <Copyright />
    </>
  )
}

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(
    100vh - ${({ theme }) => theme.dimensions.headerHeight} - 20px
  );
`
