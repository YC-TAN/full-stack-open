const blog = require("../models/blog");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {

    return blogs.length === 0
        ? 0
        : blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) return {};

    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max);
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) return {};

    const counts = blogs.reduce((acc, blog) => {
        const existing = acc.find( a => a.author === blog.author)
        
        if (existing) {
            existing.blogs++
        } else {
            acc.push({author: blog.author, blogs: 1})
        }
        return acc
    }, [])

    return counts.reduce((max, count) => count.blogs > max.blogs ? count : max)
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {};

    const counts = blogs.reduce((acc, blog) => {
        const existing = acc.find( a => a.author === blog.author)
        
        if (existing) {
            existing.likes += blog.likes
        } else {
            acc.push({author: blog.author, likes: blog.likes})
        }
        return acc
    }, [])

    return counts.reduce((max, count) => count.likes > max.likes ? count : max)
}

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes,
}