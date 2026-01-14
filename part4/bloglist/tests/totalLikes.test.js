const { test, describe } = require('node:test')
const assert = require('node:assert')

const {
    emptyBlogs, 
    listWithOneBlog, 
    blogs
} = require('./helpers/data')

const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {

    test('of empty list is zero', () => {
        assert.strictEqual(totalLikes(emptyBlogs), 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})