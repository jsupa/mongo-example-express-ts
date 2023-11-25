import { Request, Response, NextFunction } from 'express'

const index = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'pong' })
}

export default {
  index,
}
