const { test, describe } = require('node:test')
const assert = require('node:assert/strict')

const {
    emptyBlogs, 
    listWithOneBlog, 
    blogs, 
    blogsWithDiffType
} = require('./helpers/blogs')

const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
    
    test('of empty list is empty object', () => {
        assert.deepStrictEqual(favoriteBlog(emptyBlogs), {})
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, 
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        )
    })

    test('of a bigger list is selected right', () => {
        const result = favoriteBlog(blogs)
        assert.deepStrictEqual(result, 
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }
        )
    })

    test('of wrong type is not selected', () => {
        assert.deepStrictEqual(favoriteBlog(blogsWithDiffType),
            {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        }
    )
    })
})