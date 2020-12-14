const request = require('supertest')
const app = require('../server')
describe('login Endpoints', () => {
    it('login user', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'santamaria.wolfgang@gmail.com',
                password: '12345678',

            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('accessToken');
    })

    it('login user', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'carlos',
                password: 'micontraseña',

            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('accessToken');
    })

    it('can not login user with invalid password', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'santamaria.wolfgang@gmail.com',
                password: '123456789',

            })
        expect(res.statusCode).toEqual(401)
    })

    it('can not login user with invalid password', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'carlos',
                password: 'micontrasena',

            })
        expect(res.statusCode).toEqual(401)
    })

    it('can not login user with invalid username', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'santamaria.wolfgangJ@gmail.com',
                password: '12345678',

            })
        expect(res.statusCode).toEqual(404)
    })

    it('can not login user with invalid username', async() => {
        const res = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'carlosL',
                password: 'micontraseña',

            })
        expect(res.statusCode).toEqual(404)
    })
})