import { css, DefaultTheme, ThemedCssFunction } from 'styled-components'

type BreakpointsIndex =
  | 'df'
  | 'xxs'
  | 'xs'
  | 's'
  | 'sm'
  | 'm'
  | 'xm'
  | 'l'
  | 'lm'
  | 'xl'
  | 'xxl'
type BreakpointsType = { [k in BreakpointsIndex]: string }
type CssReturnType = ReturnType<ThemedCssFunction<DefaultTheme>>

export const breakpoints: BreakpointsType = {
  df: '0px',
  xxs: '400px',
  xs: '480px',
  s: '667px',
  sm: '992px',
  m: '1025px',
  xm: '1160px',
  l: '1280px',
  lm: '1440px',
  xl: '1600px',
  xxl: '2560px'
}

export const breakpoint = Object.keys(breakpoints).reduce((acc, label) => {
  const key = label as keyof BreakpointsType
  acc[key] = (...expr: Parameters<typeof css>): CssReturnType => css`
    @media (min-width: ${breakpoints[key]}) {
      ${css(...expr)}
    }
  `
  return acc
}, {} as Record<keyof BreakpointsType, (...expr: Parameters<typeof css>) => CssReturnType>)
