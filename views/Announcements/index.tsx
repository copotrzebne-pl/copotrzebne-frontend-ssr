import styled from 'styled-components'
import { useEffect, useState } from 'react'

import PageTitle from 'components/PageTitle'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { Subtitle } from '../../components/Subtitle'
import AnnouncementForm from './AnnouncementForm'
import Announcement from './Announcement'
import { usePanelContext } from '../../contexts/panelContext'
import { Place } from '../../contexts/types'
import { useAnnouncementsContext } from '../../contexts/announcementsContext'

export default () => {
  const [placesIdsMap, setPlacesIdsMap] = useState<Record<string, Place>>({})
  const {
    internalAnnouncements,
    publicAnnouncements,
    fetchAnnouncements,
    currentAnnouncementsType,
    setCurrentAnnouncementsType,
    resetContext
  } = useAnnouncementsContext()
  const { places, fetchPlaces } = usePanelContext()

  useEffect(() => {
    fetchPlaces()
    fetchAnnouncements()

    return () => {
      resetContext()
    }
  }, [])

  useEffect(() => {
    if (places && places.length > 0) {
      const castedPlaces = places as (Place & { id: string })[]
      const pIdMap = castedPlaces.reduce<
        Record<string, Place & { id: string }>
      >((acc, p) => {
        acc[p.id] = p
        return acc
      }, {})
      setPlacesIdsMap(pIdMap)
    }
  }, [places, internalAnnouncements, publicAnnouncements])

  const announcementsToDisplay =
    currentAnnouncementsType === 'internal'
      ? internalAnnouncements
      : publicAnnouncements

  return (
    <>
      <Container>
        <PageTitle hasBackIcon={false}>
          <TranslatedText value="internalAnnouncementsTitle" />
        </PageTitle>
        <Subtitle>
          <TranslatedText value="internalAnnouncementsSubtitle" />
          <br />
          <br />
          <TranslatedText value="internalAnnouncementsSubtitle2" />
        </Subtitle>
      </Container>
      <TypeToggle>
        <div
          onClick={() => setCurrentAnnouncementsType('internal')}
          className={currentAnnouncementsType === 'internal' ? 'selected' : ''}
        >
          <TranslatedText value="internalAnnouncements" />
        </div>
        <div
          onClick={() => setCurrentAnnouncementsType('public')}
          className={currentAnnouncementsType === 'public' ? 'selected' : ''}
        >
          <TranslatedText value="publicAnnouncements" />
        </div>
      </TypeToggle>
      <AnnouncementForm type={currentAnnouncementsType} />
      <AnnouncementsList>
        {announcementsToDisplay.map(a => (
          <Announcement
            type={currentAnnouncementsType}
            key={`ia_${a.id}`}
            announcement={a}
            place={placesIdsMap[a.placeId]}
          />
        ))}
      </AnnouncementsList>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${breakpoint.sm`
    max-width: 700px;
    margin: 0 auto;
  `}
`

const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 2rem 2.2rem;
  box-sizing: border-box;

  ${breakpoint.sm`
      width: 100%;
      margin: 2rem auto;
      max-width: 700px;
  `}
`

const TypeToggle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 2.2rem;

  ${breakpoint.sm`
    width: 100%;
    margin: 2rem auto;
    max-width: 700px;
  `}

  div {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    width: 50%;
    cursor: pointer;
    border-bottom: 2px solid #ffffff;
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  }

  .selected {
    color: #0076ff;
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue};
  }
`
