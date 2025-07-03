import { getRequestConfig } from 'next-intl/server'
import { getUserLocale } from './lib/locale'

export const localeLabels = {
  'en-US': 'English',
  'hi-HI': 'हिन्दी',
} as const

export const locales: (keyof typeof localeLabels)[] = Object.keys(
  localeLabels,
) as any
export type Locale = keyof typeof localeLabels
export type Locales = ReadonlyArray<Locale>
export const defaultLocale: Locale = 'en-US'

export default getRequestConfig(async () => {
  const locale = await getUserLocale()

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
