const { test, describe } = require('node:test')
const assert = require('node:assert/strict')

const {
    emptyBlogs, 
    listWithOneBlog, 
    blogs
} = require('./helpers/data')

const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
    test('empty list return empty object', () => {
        assert.deepStrictEqual(mostLikes(emptyBlogs), {})
    })

    test('when list has only one blog, return that author', () => {
        assert.deepStrictEqual(mostLikes(listWithOneBlog), {author: 'Edsger W. Dijkstra', likes: 5})
    })

    test('return correct author and likes count of bigger list', () => {
        assert.deepStrictEqual(
            mostLikes(blogs), 
            {author: "Edsger W. Dijkstra", likes: 17})
    })
})