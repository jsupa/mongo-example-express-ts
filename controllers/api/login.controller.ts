import { Request, Response, NextFunction } from 'express'

import { apiErrorFormatter } from '../../lib/helper'
import { validationResult } from 'express-validator'
import User, { IUser } from '../../models/user.model'

interface CustomRequest extends Request {
  user?: IUser
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    const errors = validationResult(req)
    if (!errors.isEmpty()) throw errors.array()

    const user = await User.findOne({ email })

    if (user) throw [{ msg: 'already_exist', path: 'email', value: email }]

    const newUser = await User.create({ email, password })

    const token = await newUser.generateToken()

    res.status(200).json({ message: 'Success'.t, data: newUser })
  } catch (error: any) {
    const errors = error.map((e: any) => apiErrorFormatter(e))
    res.status(400).json({ message: 'Bad Request'.t, errors })
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    const errors = validationResult(req)
    if (!errors.isEmpty()) throw errors.array()

    const user = await User.findOne({ email })

    if (!user) throw [{ msg: 'not_found', path: 'email', value: email }]

    const isMatch = await user.comparePassword(password)

    if (!isMatch) throw [{ msg: 'not_match', path: 'password', value: password }]

    const token = await user.generateToken()

    res.status(200).json({ message: 'Success'.t, data: user })
  } catch (error: any) {
    const errors = error.map((e: any) => apiErrorFormatter(e))
    res.status(400).json({ message: 'Bad Request'.t, errors })
  }
}

const renew = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized'.t })

  const user = req.user as IUser
  const token = await user.generateToken()

  res.status(200).json({ message: 'Success'.t, token })
}

export default {
  register,
  login,
  renew,
}
