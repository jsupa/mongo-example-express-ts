import { Request, Response, NextFunction } from 'express'

const index = (req: Request, res: Response, next: NextFunction) => {
  res.json({ time: new Date() })
}

export default {
  index,
}
