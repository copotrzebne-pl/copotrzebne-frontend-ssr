import styled from 'styled-components'
import { useCallback, useEffect, useRef, useState } from 'react'

import menuIcon from 'assets/menu-icon.svg'
import closeIcon from 'assets/close-icon.svg'
import { breakpoint } from 'themes/breakpoints'
import { ItemMenu } from 'types/types'
import Link from 'next/link'
import { useClickOutside } from 'hooks/useClickOutside'
import { getPanelMenuItems, getDefaultMenuItems } from 'utils/menus'
import MainLogo from './MainLogo'
import TranslatedText from './TranslatedText'
import LanguagePicker from './LanguagePicker'
import { useUserContext } from 'contexts/userContext'

const PageHeader = ({
  className,
  menuItems
}: {
  className?: string
  menuItems: ItemMenu[]
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [headerMenuItems, setHeaderMenuItems] = useState<ItemMenu[]>(menuItems)
  const { authorized, setAuthorized } = useUserContext()
  const closeMenu = useCallback(() => {
    setOpened(false)
  }, [setOpened])
  const menuRef = useRef(null)
  useClickOutside(menuRef, () => setOpened(false))


  const handleLogout = useCallback(() => {
    try {
      window.localStorage.removeItem('_token')
      setAuthorized(false)
      //TODO: navigate
    } catch {
      console.error('logout error')
    }
  }, [])

  useEffect(() => {
    setHeaderMenuItems(authorized ? getPanelMenuItems({ authorized, handleLogout }) as ItemMenu[] : getDefaultMenuItems({ authorized, handleLogout }) as ItemMenu[])
  }, [authorized])

  const items = headerMenuItems.map(
    ({ route, translationKey, hidden, action, highlighted }, index) => {
      const onClick = () => {
        if (action) action()
        closeMenu()
      }

      const Item = highlighted ? HighlightedMenuItem : MenuItem
      return (
        !hidden && (
          <Link passHref href={route} key={`${route}-${index}`}>
            <Item onClick={onClick}>
              <TranslatedText value={translationKey} />
            </Item>
          </Link>
          
        )
      )
    }
  )

  return (
    <header className={className}>
      <MenuDesktop>
        <MainLogo onClick={closeMenu} />
        <MenuList>{items}</MenuList>
        <DesktopLanguagePickerWrapper>
          <LanguagePicker />
        </DesktopLanguagePickerWrapper>
      </MenuDesktop>
      <MenuMobile>
        <MainLogo onClick={closeMenu} />
        <Navigation>
          <MenuIcon
            src={menuIcon}
            alt="menu"
            onClick={() => setOpened(!opened)}
          />
        </Navigation>
        <Dropdown opened={opened} ref={menuRef}>
          <MenuHeader>
            <MainLogo onClick={closeMenu} />
            <MenuIcon
              src={closeIcon}
              alt="menu"
              onClick={() => setOpened(!opened)}
            />
          </MenuHeader>
          <MenuList>
            {items}
            <MobileLanguagePickerWrapper>
              <LanguagePicker />
            </MobileLanguagePickerWrapper>
          </MenuList>
        </Dropdown>
      </MenuMobile>
    </header>
  )
}

export default styled(PageHeader)`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.headerHeight};
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadows.small};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: relative;
  z-index: 1000;
`

const MenuDesktop = styled.div`
  display: none;
  font-weight: 400;
  align-items: center;
  justify-self: flex-end;
  width: 100%;

  ${breakpoint.sm`
    display: flex;
  `}
`

const MenuMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${breakpoint.sm`
    display: none;
  `}
`

const MenuHeader = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.headerHeight};
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid transparent;
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
`

const Dropdown = styled.div<{ opened: boolean }>`
  display: ${({ opened }) => (opened ? 'flex' : 'none')};
  background-color: white;
  flex-direction: column;
  //height: 246px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadows.small};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 120;
`

const MenuItem = styled.a`
  display: inline-block;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  padding: 0.6rem;
  white-space: nowrap;
`

const HighlightedMenuItem = styled(MenuItem)`
  color: ${({ theme }) => theme.colors.blue};
`

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  ${breakpoint.sm`
    flex-direction: row;
    justify-content: flex-end;
    padding: 0;
  `}
`

const MenuIcon = styled.img`
  height: 24px;
  width: auto;
  cursor: pointer;
`

const MobileLanguagePickerWrapper = styled.div`
  width: 100%;
  justify-items: center;
  display: flex;
  justify-content: center;
  margin: 1.2rem 0;

  ${breakpoint.sm`
    display: none;  
  `}
`

const DesktopLanguagePickerWrapper = styled.div`
  padding: 1.2rem 1.6rem;
  display: none;

  ${breakpoint.sm`
    display: flex;
  `}
`
