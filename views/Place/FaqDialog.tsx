import Dialog from 'components/Dialog'
import { linkify } from 'hooks/useTextTransformToHTML'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import { getTranslation } from 'utils/translation'
import { useUserContext } from 'contexts/userContext'
import { CollapsableSection } from './components'
import { translations } from 'utils/translations'
import { Place } from 'contexts/types'

export default ({
  selectedPlace,
  handleClose
}: {
  selectedPlace: Place | null
  handleClose: (bool) => void
}) => {
  const { language } = useUserContext()
  return (
    <FaqDialogComponent onClose={() => handleClose(false)}>
      {/* I have some spare time, how can I help? */}
      {selectedPlace?.placeLink?.signup && (
        <CollapsableSection
          opened
          title={getTranslation(language, translations['faqTitle_7'])}
          content={
            <span
              dangerouslySetInnerHTML={{
                __html: linkify(
                  getTranslation(language, translations['faqText_7']).replace(
                    '{link}',
                    selectedPlace?.placeLink?.signup
                  )
                )
              }}
            />
          }
        />
      )}
      {/* I live abroad, how can I help? */}
      <CollapsableSection
        opened
        title={getTranslation(language, translations['faqTitle_4'])}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: getTranslation(language, translations['faqText_4'])
              .replace(
                '{bankAccountNumber}',
                linkify(selectedPlace?.bankAccount || '')
              )
              .replace(
                '{fundraising}',
                linkify(selectedPlace?.placeLink?.fundraising || '')
              )
              .replace(
                '{contact}',
                selectedPlace?.email || selectedPlace?.phone
                  ? `email: ${selectedPlace?.email || '---'}, tel: ${
                      selectedPlace?.phone || '---'
                    }`
                  : ''
              )
              .replace(
                '{address}',
                `${selectedPlace?.city}, ${selectedPlace?.street || ''} ${
                  selectedPlace?.buildingNumber || ''
                } ${
                  selectedPlace?.apartment ? `/${selectedPlace?.apartment}` : ''
                }`
              )
              .replace('{workingHours}', selectedPlace?.workingHours || '---')
          }}
        />
      </CollapsableSection>
      {/* I want to donate money, how can I do it? */}
      {selectedPlace?.bankAccount && (
        <CollapsableSection
          opened
          title={getTranslation(language, translations['faqTitle_1'])}
          content={
            <span
              dangerouslySetInnerHTML={{
                __html: linkify(
                  getTranslation(language, translations['faqText_1']).replace(
                    '{bankAccountNumber}',
                    selectedPlace?.bankAccount || ''
                  )
                )
              }}
            />
          }
        />
      )}
      {/* I want to donate goods, how can I do it? */}
      <CollapsableSection
        title={getTranslation(language, translations['faqTitle_2'])}
        content={
          <span
            dangerouslySetInnerHTML={{
              __html: linkify(
                getTranslation(language, translations['faqText_2'])
                  .replace(
                    '{address}',
                    `${selectedPlace?.city}, ${selectedPlace?.street || ''} ${
                      selectedPlace?.buildingNumber || ''
                    } ${
                      selectedPlace?.apartment
                        ? `/${selectedPlace?.apartment}`
                        : ''
                    }`
                  )
                  .replace(
                    '{workingHours}',
                    selectedPlace?.workingHours || '---'
                  )
              )
            }}
          />
        }
      />
    </FaqDialogComponent>
  )
}

const FaqDialogComponent = styled(Dialog)`
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
