import TranslatedText from './TranslatedText'
import PanelButton from './PanelButton'

export default ({
  onClick,
  isDisabled
}: {
  onClick: () => void
  isDisabled: boolean
}) => (
  <PanelButton onClick={onClick} disabled={isDisabled}>
    <TranslatedText value="updatePlaceLastUpdatedDate" />
  </PanelButton>
)
