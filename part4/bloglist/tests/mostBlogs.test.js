const { test, describe } = require('node:test')
const assert = require('node:assert/strict')

const {
    emptyBlogs, 
    listWithOneBlog, 
    blogs
} = require('./helpers/data')

const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blogs', () => {
    test('empty list return empty object', () => {
        assert.deepStrictEqual(mostBlogs(emptyBlogs), {})
    })

    test('when list has only one blog, return that author', () => {
        assert.deepStrictEqual(mostBlogs(listWithOneBlog), {author: 'Edsger W. Dijkstra', blogs: 1})
    })

    test('return correct author and blogs count of bigger list', () => {
        assert.deepStrictEqual(
            mostBlogs(blogs), 
            {author: "Robert C. Martin", blogs: 3})
    })
})