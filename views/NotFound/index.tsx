import styled from 'styled-components'
import TranslatedText from 'components/TranslatedText'

const NotFoundPage = ({ className }: { className?: string }) => (
  <div className={className}>
    <span>
      <TranslatedText value="pageNotFound" />
    </span>
  </div>
)

export default styled(NotFoundPage)`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > span {
    font-weight: 500;
  }
`
