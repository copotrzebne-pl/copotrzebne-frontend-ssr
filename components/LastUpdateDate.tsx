import styled from 'styled-components'

import { formatDateWithTime } from 'utils/date'
import TranslatedText from 'components/TranslatedText'

export default ({ lastUpdatedAt }: { lastUpdatedAt?: string }) => (
  <LastUpdate>
    <span>
      <TranslatedText value="lastUpdate" />{' '}
      {lastUpdatedAt ? formatDateWithTime(lastUpdatedAt) : '-'}
    </span>
  </LastUpdate>
)

const LastUpdate = styled.div`
  width: auto;
  margin: 1.2rem 2.2rem 0.2rem;
`
