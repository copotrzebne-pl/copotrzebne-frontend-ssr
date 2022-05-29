import { Place } from 'contexts/types'
import { useState } from 'react'
import Link from 'next/link';
import { Page, routes } from 'utils/routes'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import { PlaceBox as PlaceDetailedBox } from 'components/PlaceBox'
import TranslatedText from 'components/TranslatedText'
import { ReactComponent as SearchIcon } from 'assets/search-icon.svg'
import { useUserContext } from 'contexts/userContext'
import { Language } from 'contexts/types'

const StyledLink = styled.a`
  width: 100%;
  height: 100%;
  display: inline-grid;
  ${breakpoint.sm`
    margin-right: 0.8rem;
  `}
`

const ShowMore = styled.button`
  display: block;
  width: 100%;
  max-width: 250px;
  margin: 0 auto 1em auto;
  padding: 0.8em;
  border: 1px solid #fed500;
  border-radius: 10px;
  background-color: #fff;
  color: #fed500;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #fed500;
    color: #fff;
  }
`

export const WrappedPlacesComponent = ({
  places,
  initialNumber,
  className
}: {
  className?: string
  places: Place[]
  initialNumber: number
}) => {
  const { language } = useUserContext()
  const [showMore, setShowMore] = useState<boolean>(false)
  return (
    <div>
      <div className={className}>
        {places
          .slice(0, showMore ? places.length : initialNumber)
          .map(place => (
            <Link 
              passHref 
              href={`${routes[Page.PLACE]}/${
                place.nameSlug[language] || place.nameSlug[Language.PL]
              }`}>
              <StyledLink
              
              key={place.id}
            >
              <PlaceDetailedBox place={place} />
            </StyledLink>
            </Link>
          ))}
      </div>
      <div>
        {places.length > initialNumber && (
          <ShowMore onClick={() => setShowMore(!showMore)}>
            {showMore ? (
              <TranslatedText value="showLess" />
            ) : (
              <TranslatedText value="showMore" />
            )}
          </ShowMore>
        )}
      </div>
    </div>
  )
}

export const WrappedPlaces = styled(WrappedPlacesComponent)`
  padding: 0 1rem;
  padding-bottom: 2.2rem;
  display: grid;
  grid-auto-rows: max-content;
  grid-column-gap: 1rem;
  grid-row-gap: 1.6rem;
  grid-template-columns: 1fr;

  ${breakpoint.xs`
    grid-template-columns: 1fr 1fr;
  `}

  ${breakpoint.s`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  
  ${breakpoint.sm`
    grid-template-columns: 1fr;
  `}
  
  ${breakpoint.xm`
    grid-template-columns: 1fr 1fr;
  `}
  
  ${breakpoint.l`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`

const TextInputPlaceholderComponent = ({
  className,
  onClick
}: {
  className?: string
  onClick: () => void
}) => (
  <div className={className} onClick={onClick}>
    <PlaceholderTitle>
      <TranslatedText value="searchPlaceByName" />
    </PlaceholderTitle>
    <Row>
      <InputPlaceholder>
        <TranslatedText value="searchPlacePlaceholder" />
      </InputPlaceholder>
      <ButtonPlaceholder>
        <SearchIcon height="20px" color="white" />
      </ButtonPlaceholder>
    </Row>
  </div>
)

export const TextInputPlaceholder = styled(TextInputPlaceholderComponent)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2rem 0 1.2rem 0;
  cursor: pointer;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const PlaceholderTitle = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey600};
  margin-bottom: 0.4rem;
`

const InputPlaceholder = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 52px);
  height: 42px;
  background-color: white;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.grey400};
  font-size: 0.85rem;
  font-weight: 500;
  padding-left: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey300};
`

const ButtonPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 42px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.blue};
  svg {
    fill: white;
  }
`
