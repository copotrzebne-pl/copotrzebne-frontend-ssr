import format from 'date-fns/format'

export const dateWithTimeFormat = 'dd.MM.Y HH:mm'

export const dateFormat = 'dd.MM.Y'

export const formatDateWithTime = (date: string): string =>
  format(Date.parse(date), dateWithTimeFormat)

export const formatDate = (date: string): string =>
  format(Date.parse(date), dateFormat)
