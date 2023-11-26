import { body, header } from 'express-validator'

export const registerValidator = [
  body('email').exists().withMessage('required').isEmail().withMessage('not_valid'),
  body('password').exists().withMessage('required').isStrongPassword().withMessage('not_strong'),
]

export const loginValidator = [
  body('email').exists().withMessage('required').isEmail().withMessage('not_valid'),
  body('password').exists().withMessage('required'),
]
