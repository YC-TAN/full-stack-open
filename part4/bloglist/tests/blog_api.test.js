const {test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// const blogList = require('./helpers/data')
const helper = require('./helpers/utils')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => { 
    let insertedBlogs
    let user
    let token
    let token2

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        
        const userOne = await helper.createUser({
            username: 'testuser',
            name: 'Test user'
        })
        user = userOne.user
        token = userOne.token
        insertedBlogs = await helper.createBlogs(user)
        
        const userTwo = await helper.createUser({
            username: 'newuser',
            name: 'New user'
        })
        token2 = userTwo.token
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, insertedBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)
        assert(titles.includes('React patterns'))
    })

    test('blog contains user data', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert.strictEqual(blog.user.id, user._id.toString())
            assert.strictEqual(blog.user.name, user.name)
            assert.strictEqual(blog.user.username, user.username)
        })
    })

    describe('viewing a specific blog', () => {
        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToView = blogsAtStart[0]
            const response = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(response.body, blogToView)
        })

        test('fails with status code 404 if blog does not exists', async () => {
            const validNonExistingId = await helper.nonExistingId(user)

            await api.get(`/api/blogs/${validNonExistingId}`).expect(404)
        })

        test('fails with status code 400 if id is invalid', async () => {
            const invalidId = "iaminvalid"

            await api.get(`/api/blogs/${invalidId}`).expect(400)
        })
    })

    describe('addition of new blog', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                title: "Add new blog test",
                author: "test author",
                url: "some url",
                likes: 100,
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length + 1)

            const titles = blogsAtEnd.map(b => b.title)
            assert(titles.includes(newBlog.title))
        })

        test('a valid new blog without likes property will set likes value to 0', async () => {
            const newBlogID = await helper.blogWithoutLikesId(user)

            const blogsAtEnd = await helper.blogsInDB()
            const newAdded = blogsAtEnd.find(b => b.id === newBlogID)
            assert.strictEqual(newAdded.likes, 0)
        })

        test('fails with status code 400 if no title provided', async () => {
            const noTitle = {
                author: "an author",
                url: "an url",
                likes: 100,
            }

            await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(noTitle)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length)
        })

        test('fails with status code 400 if no url provided', async () => {
            const noUrl = {
                title: "blog without url",
                author: "an author",
                likes: 100,
            }

            await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(noUrl)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDB()
            const ids = blogsAtEnd.map(b => b.id)

            assert(!ids.includes(blogToDelete.id))
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length - 1)
        })

        test('fails with status code 404 if blog does not exist', async () => {
            const nonExistingBlogID = await helper.nonExistingId(user)

            await api
                .delete(`/api/blogs/${nonExistingBlogID}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404)

            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length)
        })

        test('fails with status code 400 if id invalid', async () => {
            const invalidID = "iaminvalidid"

            await api
                .delete(`/api/blogs/${invalidID}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length)
        })

        test('fails with status code 401 if user is not creator', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token2}`)
                .expect(401)

            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogsAtEnd.length, insertedBlogs.length)
        })
    })

    describe('updating a blog', () => {
        test('succeeds with status code 200 if valid data', async () => {
            const newLikes = {
                likes: 50
            }

            const blogs = await helper.blogsInDB()
            const blogToUpdate = blogs[0]
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(newLikes)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAfterUpdate = await helper.blogsInDB()
            const updated = blogsAfterUpdate.find(b => b.id === blogToUpdate.id)

            assert.strictEqual(updated.likes, newLikes.likes)
        })

        test('fails with status code 400 if id does not exists', async () => {
            const nonExistingId = await helper.nonExistingId
            const newLikes = {
                likes: 50
            }
            
            await api
                .put(`/api/blogs/${nonExistingId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(newLikes)
                .expect(400)
        })

        test('fails with status code 400 if invalid id', async () => {
            const invalidId = "invalid"
            const newLikes = {
                likes: 50
            }
            
            await api
                .put(`/api/blogs/${invalidId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(newLikes)
                .expect(400)
        })

        test('fails with status code 400 if invalid data type', async () => {
            const newLikes = {
                likes: "five"
            }

            const blogs = await helper.blogsInDB()
            const blogToUpdate = blogs[0]
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(newLikes)
                .expect(400)
        })

        test('fails with status code 400 if data out of range', async () => {
            const newLikes = {
                likes: -1
            }

            const blogs = await helper.blogsInDB()
            const blogToUpdate = blogs[0]
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(newLikes)
                .expect(400)
        })

        test('fails with status code 401 if user is not creator', async () => {
            const newLikes = {
                likes: 50
            }

            const blogs = await helper.blogsInDB()
            const blogToUpdate = blogs[0]
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token2}`)
                .send(newLikes)
                .expect(401)

            const blogsAfterUpdate = await helper.blogsInDB()
            const updated = blogsAfterUpdate.find(b => b.id === blogToUpdate.id)

            assert.strictEqual(updated.likes, blogToUpdate.likes)
        })

    })
})

after(async() => {
    await mongoose.connection.close()
})