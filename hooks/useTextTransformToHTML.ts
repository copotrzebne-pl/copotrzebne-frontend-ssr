import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export function useTextTransformToHTML(value: string | undefined) {
  const [formattedText, setFormattedText] = useState<string | undefined>(value)

  useEffect(() => {
    if (!value) return

    const transformedText = DOMPurify.sanitize(value)
      .split(' ')
      .map(part =>
        URL_REGEX.test(part)
          ? `<a target='_blank' href='${part}'>${part}</a>`
          : `${part} `
      )
      .join('')
    setFormattedText(transformedText)
  }, [value])

  return formattedText
}

export const linkify = (text: string): string =>
  DOMPurify.sanitize(text)
    .split(' ')
    .map(part =>
      URL_REGEX.test(part)
        ? `<a target='_blank' href='${part}'>${part}</a>`
        : `${part} `
    )
    .join('')
