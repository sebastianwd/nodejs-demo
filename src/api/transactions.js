import { Router } from 'express'
import { has } from 'lodash'

const route = Router()

export default app => {
  app.use('/transactions', route)

  route.post('/', (req, res) => {
    const data = req.body

    const resume = []

    data.forEach(element => {
      const { id: userId, ...entry } = element

      const userResume = {
        expenses: 0,
        revenue: 0,
        user: userId
      }

      switch (entry.type) {
        case 'expense':
          userResume.expenses += entry.value
          break
        case 'income':
          userResume.revenue += entry.value
          break
        default:
          break
      }

      if (!has(entry, 'description')) {
        entry.description = ''
      }

      // check if user is already in the resume
      const foundUser = resume.find(item => {
        return item.user === userId
      })
      if (foundUser) {
        foundUser.expenses += userResume.expenses
        foundUser.revenue += userResume.revenue
        foundUser.transactions.push(entry)
        return
      }

      const transactions = [entry]

      resume.push({ ...userResume, transactions })
    })

    return res.json(resume).status(200)
  })
}
