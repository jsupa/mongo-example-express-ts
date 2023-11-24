import { Request, Response, NextFunction } from 'express'

const index = (req: Request, res: Response, next: NextFunction) => {
  res.render('home/index')
}

const addFlash = (req: Request, res: Response, next: NextFunction) => {
  req.flash('success', 'Flash message added')
  res.redirect('/')
}

export default {
  index,
  addFlash,
}
