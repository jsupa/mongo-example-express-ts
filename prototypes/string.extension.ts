import { Request } from 'express'
import parser from 'accept-language-parser'
import { I18n } from 'i18n'
import YAML from 'yaml'

export {}

declare global {
  interface String {
    t(): string
  }
}

const settings = {
  avaliableLocales: ['en', 'sk'],
}

const i18n = new I18n({
  locales: settings.avaliableLocales,
  directory: `./locales`,
  extension: '.yml',
  parser: YAML,
})

export const setLocaleByRequest = (req: Request) => {
  const acceptLanguage = parser.pick(settings.avaliableLocales, req.headers['accept-language'] || 'en')
  const locale = (req.headers['language'] as string) || acceptLanguage || 'en'

  i18n.setLocale(locale)
}

const StringExtension = {
  install() {
    Object.defineProperty(String.prototype, 't', {
      get: function () {
        return i18n.__(this)
      },
    })
  },
}

StringExtension.install()
