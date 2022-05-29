import styled from 'styled-components'
import facebookIconSrc from 'assets/facebook-icon.svg'
import { ReactNode } from 'react'

const FacebookShareButton = ({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) => (
  <div
    className={className}
    onClick={() => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        'facebook-share-dialog',
        'width=800,height=600'
      )
    }}
  >
    <FacebookIcon src={facebookIconSrc} alt="facebook icon" />
    {children}
  </div>
)

export default styled(FacebookShareButton)`
  border: none;
  outline: none;
  padding: 0.8rem 1.8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 10px;
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
`

const FacebookIcon = styled.img`
  display: inline-block;
  width: 20px;
  height: auto;
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
`
