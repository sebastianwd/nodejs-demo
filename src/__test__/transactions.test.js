import request from 'supertest'
import data from 'shared/data.json'
import app from '../app'

const expected = [
  {
    expenses: 1000,
    revenue: 500,
    user: 'a',
    transactions: [
      {
        value: 1000,
        type: 'expense',
        description: 'pet shop'
      },
      {
        value: 500,
        type: 'income',
        description: ''
      }
    ]
  }
]

describe('Transactions post endpoint', () => {
  it('should return processed data', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .send(data)
    expect(res.statusCode).toEqual(200)

    expect(res.body).toMatchObject(expected)
  })
})
