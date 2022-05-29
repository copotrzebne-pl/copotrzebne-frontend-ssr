import { ReactNode } from 'react'
import styled from 'styled-components'

const PageTitle = ({
  className,
  children
}: {
  className?: string
  children: ReactNode
  hasBackIcon?: boolean
}) => <div className={className}>{children}</div>

export default styled(PageTitle)`
  width: 100%;
  padding: 1.4rem 1.2rem;
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 1.45rem;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`
