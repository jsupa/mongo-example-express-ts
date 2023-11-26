import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user.model'

export const apiErrorFormatter = (error: any) => {
  return {
    error: error.msg,
    path: error.path,
    value: error.value,
    message: `attr.${error.path}`.t + ' ' + `error.${error.msg}`.t,
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken) return res.status(401).json({ message: 'Unauthorized'.t })

  const token = bearerToken.split(' ')
  const parsedToken = token[token.length - 1]

  try {
    const decoded = jwt.verify(parsedToken, config.jwtSecret) as jwt.JwtPayload

    if (!decoded) throw new Error()
    if (!decoded.user_id) throw new Error()
    const user = await User.findOne({ id: decoded.user_id, token: parsedToken })

    if (!user) throw new Error()

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized'.t })
  }
}
