const supertest = require('supertest')
const app = require('../src/server/index.js')
const request = supertest(app)

it('Gets the test endpoint', async done => {
    // Sends GET Request to /test endpoint
    const res = await request.get('/test')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('pass!')
    done()
})


