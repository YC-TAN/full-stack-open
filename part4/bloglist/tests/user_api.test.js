const {test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helpers/utils')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('user api', () => {
    let initialUsers

    beforeEach(async () => {
        await User.deleteMany({})
        const hashed = await bcrypt.hash('secrect', 10)

        initialUsers = [
            {
                username: "test user",
                name: "name of test user",
                passwordHash: hashed
            },
            {
                username: "test user two",
                name: "name of test user two",
                passwordHash: hashed
            }
        ]

        await User.insertMany(initialUsers)        
    })

    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')

        assert.strictEqual(response.body.length, initialUsers.length)
    })
    
    test('a specific user is within the returned users', async () => {
        const response = await api.get('/api/users')

        const usernames = response.body.map(u => u.username)
        assert(usernames.includes(initialUsers[1].username))
    })

    describe('user creation', () => {
        test('succeeds with status code 201 with valid data', async () => {
            
            const newUser = {
                username: 'newuser',
                name: 'new user',
                password: 'secret'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDB()
            assert.strictEqual(usersAtEnd.length, initialUsers.length + 1)

            const usernames = usersAtEnd.map( n => n.username)
            assert(usernames.includes(newUser.username))
        
        test('fails with status code 400 if username already exist', async () => {
            
            const newUser = {
                username: 'test user',
                name: 'new user',
                password: 'secret'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

            const usersAtEnd = await helper.usersInDB()
            assert.strictEqual(usersAtEnd.length, initialUsers.length)
        })  

        test('fails with status code 400 if username too short', async () => {
            
            const newUser = {
                username: 'tt',
                name: 'new user',
                password: 'secret'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

            const usersAtEnd = await helper.usersInDB()
            assert.strictEqual(usersAtEnd.length, initialUsers.length)
        })  

        test('fails with status code 400 if password too short', async () => {
            
            const newUser = {
                username: 'passwordtooshort',
                name: 'new user',
                password: 'se'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

            const usersAtEnd = await helper.usersInDB()
            assert.strictEqual(usersAtEnd.length, initialUsers.length)
        })
    })
  })
})

after(async() => {
    await mongoose.connection.close()
})