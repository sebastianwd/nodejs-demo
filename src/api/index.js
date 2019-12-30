import { Router } from 'express'
import transactions from './transactions'

// guaranteed to get dependencies
export default () => {
  const app = Router()
  transactions(app)

  return app
}
