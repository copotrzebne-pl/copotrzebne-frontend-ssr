import React, { ReactNode, useRef } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { useClickOutside } from 'hooks/useClickOutside'
import { useDocumentChild } from 'hooks/useDocumentChild'
import { breakpoint } from 'themes/breakpoints'

const Dialog = ({
  className,
  children,
  onClose
}: {
  className?: string
  children: ReactNode
  onClose: () => void
}) => {
  const dialogRef = useRef(null)
  const target = useDocumentChild('modal-root')
  useClickOutside(dialogRef, onClose)

  return createPortal(
    <div className={className}>
      <Overlay>
        <Content ref={dialogRef}>
          <CloseIcon onClick={onClose} />
          {children}
        </Content>
      </Overlay>
    </div>,
    target
  )
}

export default styled(Dialog)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Overlay = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 18px;
  box-sizing: border-box;
  line-height: 1.48;
  font-size: 0.85rem;
  position: relative;
  height: 100%;
  ${breakpoint.sm`
    max-width: 450px;
    width: calc(100% - 45px);
    min-height: 300px;
    padding: 1.6rem;
  `}
`

const CloseIcon = styled.button`
  display: flex;
  position: absolute;
  right: 18px;
  top: 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  border: none;
  background-color: transparent;
  color: black;
  transition: color 0.6s;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  &:after {
    content: '✕';
    font-size: 1.6rem;
  }
  &:hover,
  &:focus {
    color: rgba(0, 0, 0, 0.4);
  }
`
