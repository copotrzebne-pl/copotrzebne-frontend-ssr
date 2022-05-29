import styled from 'styled-components'
import sanitize from 'sanitize-html'
import { isAfter } from 'date-fns'

import { InternalAnnouncement, PublicAnnouncement } from 'types/types'
import { formatDate, formatDateWithTime } from 'utils/date'
import { Place } from 'contexts/types'
import Comments from './Comments'
import TranslatedText from 'components/TranslatedText'
import { Language } from 'contexts/types'
import { useUserContext } from 'contexts/userContext'

const Announcement = ({
  announcement,
  className,
  place,
  type
}:
  | {
      className?: string
      announcement: InternalAnnouncement
      place?: Place
      type: 'internal'
    }
  | {
      className?: string
      announcement: PublicAnnouncement
      place?: Place
      type: 'public'
    }) => {
  const { language } = useUserContext()
  const isInactive =
    type === 'internal' &&
    announcement.endDate &&
    isAfter(new Date(), new Date(announcement.endDate))

  return (
    <div className={`${className}${isInactive ? ' inactive' : ''}`}>
      <Row>
        <div>
          {type === 'internal' && <Title>{announcement.title}</Title>}
          <PlaceName>
            <TranslatedText value="author" />:{' '}
            {place?.name[language] || place?.name[Language.PL] || '-'}
          </PlaceName>
        </div>

        <Dates>
          <DateText>
            <TranslatedText value="addedAt" />{' '}
            {formatDateWithTime(announcement.createdAt)}
          </DateText>
          {type === 'internal' && announcement.endDate && (
            <DateText>
              <TranslatedText value="validUntil" />{' '}
              {formatDate(announcement.endDate)}
            </DateText>
          )}
        </Dates>
      </Row>
      <Text>{sanitize(announcement.message)}</Text>

      {type === 'internal' && (
        <>
          <Text>
            <b>
              <TranslatedText value="contactInformation" />
            </b>
            <div>{sanitize(announcement.contactInfo)}</div>
          </Text>
          <Comments
            comments={announcement.announcementComments}
            announcementId={announcement.id}
          />
        </>
      )}
    </div>
  )
}

const Row = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.05rem;
`

const Text = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  color: ${({ theme }) => theme.colors.grey600};
  white-space: pre-line;

  b {
    display: inline-block;
    font-weight: 500;
    text-decoration: underline;
    margin: 0.7rem 0 0.5rem;
  }
`

const Dates = styled.div`
  flex-shrink: 0;
  padding-bottom: 0.5rem;
`

const DateText = styled(Text)`
  font-size: 0.7rem;
  margin-bottom: 0.25rem;
`

const Title = styled(Text)`
  font-weight: 500;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey900};
  margin-bottom: 0.7rem;
  padding-right: 0.5rem;
`

const PlaceName = styled(DateText)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-weight: 500;
`

export default styled(Announcement)`
  display: flex;
  flex-direction: column;

  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  border-radius: 15px;
  margin-bottom: 2rem;
  padding: 1rem 1.2rem 0;

  &.inactive {
    color: ${({ theme }) => theme.colors.grey300};

    ${PlaceName}, ${Title}, ${Text} {
      color: ${({ theme }) => theme.colors.grey400};
    }
  }
`
