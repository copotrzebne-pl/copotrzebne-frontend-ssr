import { translations } from 'utils/translations'
import TranslatedEntry from './TranslatedEntry'

export default ({ value }: { value: string }) => {
  const entry = translations[value]

  if (!entry) {
    console.error(`Key "${value}" is incorrect. Translation entry not found.`)
  }

  return <TranslatedEntry entry={entry} />
}
