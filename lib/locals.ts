import { Request, Response, NextFunction } from 'express'

const locals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user
  res.locals.version = process.env.npm_package_version
  res.locals.truncate = truncate

  stringTranslate(req)

  next()
}

export default locals

const truncate = (str: string, len: number) => {
  if (str.length > len && str.length > 0) {
    let newStr = str + ' '
    newStr = str.substr(0, len)
    newStr = str.substr(0, newStr.lastIndexOf(' '))
    newStr = newStr.length > 0 ? newStr : str.substr(0, len)
    return newStr + '...'
  }
  return str
}

const stringTranslate = (req: Request) => {
  if ('t' in String.prototype) {
    delete (String.prototype as any).t
  }

  Object.defineProperty(String.prototype, 't', {
    get: function () {
      return req.__(this.toString())
    },
    configurable: true,
  })
}
