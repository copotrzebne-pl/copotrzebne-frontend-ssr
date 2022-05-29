import { ReactNode, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { ReactComponent as ArrowIcon } from 'assets/down-arrow.svg'
import { breakpoint } from 'themes/breakpoints'
import FacebookShareButton from 'components/FacebookShareButton'
import mapPlaceholderUrl from 'assets/map-background.svg'
import Dialog from 'components/Dialog'
import PageTitle from 'components/PageTitle'

const CollapsableComponent = ({
  className,
  opened,
  title,
  content,
  children
}: {
  className?: string
  opened?: boolean
  title?: string
  content?: ReactNode
  children?: ReactNode
}) => {
  const [sectionOpened, setSectionOpened] = useState<boolean>(
    opened !== undefined ? opened : false
  )
  return (
    <div className={className}>
      <SectionTitle onClick={() => setSectionOpened(!sectionOpened)}>
        {title}
        <ToggleIcon opened={sectionOpened}>
          <ArrowIcon />
        </ToggleIcon>
      </SectionTitle>
      {sectionOpened && (
        <>
          <SectionContent>
            {content} {children}
          </SectionContent>
        </>
      )}
    </div>
  )
}

export const CollapsableSection = styled(CollapsableComponent)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: bold;
  display: flex;
  font-size: 1.05rem;
  padding: 0.7rem;
  color: #333333;
  border-radius: 12px;
  background-color: #0076ff1f;
  position: relative;
  cursor: pointer;
  padding-right: 2rem;
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.7rem;
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`

const ToggleIcon = styled.div<{ opened: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) ${({ opened }) => opened && 'rotate(180deg)'};
  margin-top: 4px;
  ${({ opened }) =>
    opened &&
    `
    margin-top: -2px;
  `}
`

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  padding-bottom: 4.8rem;
  ${breakpoint.sm`
    padding-bottom: 0;
  `}
`

export const PlaceDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey100};
  padding: 1rem;
  padding-bottom: 0.4rem;
  ${breakpoint.sm`
    width: 58%;
    flex-shrink: 0;
    padding: 3.2rem 8%;
    border-right: 2px solid ${({ theme }) => theme.colors.grey200};
  `}
  ${breakpoint.lm`
    padding: 3.2rem 10%;
  `}
`
export const PlaceDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const PlaceDescription = styled.p`
  display: inline-block;
  text-align: left;
  line-height: 1.4;
  width: 100%;
  color: ${({ theme }) => theme.colors.grey500};
  font-size: 0.8rem;
  font-weight: 400;
  overflow-wrap: break-word;
  margin: 0.4rem 0;
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`

export const PlaceAddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const PlaceAddress = styled.div`
  display: flex;
  flex-direction: column;

  span {
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.grey800};
    font-size: 0.85rem;
    font-weight: 400;
    margin: 0.4rem 0;
  }
`

export const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const LastUpdate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    color: #8d99b2;
    font-size: 0.7rem;
    font-weight: 400;
    margin: 0.1rem 0;
  }

  h3 {
    color: #8d99b2;
    font-size: 0.78rem;
    font-weight: 500;
    margin: 0.1rem 0;
  }
`

export const BankAccount = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey800};
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  span {
    display: inline-block;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.2;
  }
  & > span {
    width: 100%;
  }
`

export const Links = styled.div`
  margin: 0.5rem 0;
  color: #8d99b2;
  font-size: 0.8rem;
  font-weight: 400;

  div {
    margin: 0.5rem 0;
  }

  a {
    color: #0076ff;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0.2rem 0;
  }

  a:hover {
    color: #0055ff;
  }
`

export const DemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem 3.2rem;
  width: 100%;
  ${breakpoint.sm`
    max-width: 980px;
    margin: 0 auto;
  `}
`

export const DemandsListTitle = styled.h4`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #333333;
  justify-content: center;
`

export const DemandsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.2rem;
  margin: 0;
  ${breakpoint.sm`
    padding-bottom: 4.2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1.2rem;
    grid-row-gap: 10px;
    justify-content: center;
  `}
`

export const DemandComponent = styled.div`
  margin: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #999;

  & > span {
    color: #999;
  }

  & > b {
    color: #333;
    font-weight: 600;
  }
`

export const DemandInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: #333333;
  }
`

export const DemandComment = styled.div`
  margin-top: 0.2rem;
  color: #999999;
`

export const StyledFacebookButton = styled(FacebookShareButton)`
  max-width: 90%;
  cursor: pointer;
  z-index: 130;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  ${breakpoint.sm`
    bottom: 2rem;
    right: 1rem;
    left: unset;
    transform: unset;
    max-width: 35%;
  `}
`

export const CategoryHeader = styled.span`
  font-weight: bold;
  display: flex;
  width: calc(100% + 48px);
  font-size: 1.05rem;
  padding: 0.7rem;
  color: #333333;
  border-radius: 12px;
  background-color: #0076ff1f;
  margin: 0.4rem -24px;
  ${breakpoint.sm`
    width: 100%;
    margin: 0.4rem 0;
  `}
`

export const PlaceNameLabel = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey500};
`

export const StyledPageTitle = styled(PageTitle)`
  padding-top: 0;
  flex-direction: column;
  padding: 0 0 0.6rem 0;
`

export const ShowOnMapButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 34px;
  padding: 0.8rem 1.8rem;
  outline: none;
  background-color: transparent;
  background-image: url(${mapPlaceholderUrl});
  background-position: center center;
  background-size: cover;
  color: black;
  font-size: 0.85rem;
  font-weight: 600;
  border-top: 2px solid white;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

export const UrgentDemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const UrgentDemandsTitle = styled.div`
  margin-top: 0.4rem;
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};
`

export const UrgentDemandsList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  padding: 0.4rem 0 0.8rem 0;
  ${breakpoint.sm`
    overflow-x: hidden;
  `}
`

export const UrgentDemand = styled.div`
  display: flex;
  padding: 0.2rem 0.4rem;
  background-color: #0076ff2b;
  border-radius: 8px;
  flex-shrink: 0;
  font-size: 0.75rem;
  margin-right: 0.4rem;
`

export const OrganisationLink = styled.a`
  display: inline-block;
  padding: 0 0.4rem;
  svg {
    fill: ${({ theme }) => theme.colors.gray800};
  }
`

export const PlaceName = styled.span`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const gradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

export const HowCanIHelpButton = styled.button`
  border: none;
  outline: none;
  padding: 0.8rem 1.8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 10px;
  height: 38px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  animation: ${gradient} 20s ease infinite;
  background: linear-gradient(
      -45deg,
      rgb(107, 25, 216),
      rgb(7, 210, 179),
      ${({ theme }) => theme.colors.blue}
    )
    0% 0%/600% 600%;
`

export const FaqDialog = styled(Dialog)`
  & > div {
    & > div {
      padding: 4.2rem 1.2rem 0;
      overflow-y: auto;
      padding-bottom: 10rem;
      ${breakpoint.sm`
        width: 520px;
        max-height: 80%;
        box-shadow: ${({ theme }) => theme.boxShadows.medium};
      `}
    }
  }
`
