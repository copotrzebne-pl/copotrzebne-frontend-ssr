import { useUserContext } from 'contexts/userContext'
import { Translations } from 'types/types'
import { getTranslation } from 'utils/translation'

export default ({ entry }: { entry: Translations }) => {
  const { language } = useUserContext()

  if (!entry) return null
  const translation = getTranslation(language, entry)

  return <>{translation}</>
}
