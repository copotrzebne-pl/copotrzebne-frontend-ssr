import { useEffect } from 'react'
import styled from 'styled-components'
import { useUserContext } from 'contexts/userContext'
import AdminPanel from './components/AdminPanel'
import PlaceManagerPanel from './components/PlaceManagerPanel'
import { breakpoint } from 'themes/breakpoints'
import { useCheckIfAuthorized } from 'hooks/useCheckIfAuthorized'

export default () => {
  useCheckIfAuthorized()
  const { user, fetchUser } = useUserContext()
  useEffect(() => {
    // whoimi - get logged in user data
    fetchUser()
  }, [])
  return (
    <Container>
      {user?.role === 'admin' && <AdminPanel />}
      {user?.role === 'place_manager' && <PlaceManagerPanel />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 70vh;
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`
