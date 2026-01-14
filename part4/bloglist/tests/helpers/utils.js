const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blog = require('../../models/blog')
const User = require('../../models/user')

// Generate token for a user
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.SECRET,
    { expiresIn: 60*60 }
  );
};

// Create a test user directly in DB
const createUser = async ({username, name}) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password123', saltRounds)

    const user = new User({
        username: username,
        name: name,
        passwordHash
    })

    const savedUser = await user.save()
    const token = generateToken(savedUser._id)

    return {user: savedUser, token}
}

// Create blogs in DB
const createBlogs = async (user) => {

    const blogs = await Blog.insertMany(
        [
            {
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                user: user._id
            },
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                user: user._id
            },
        ]
    )

    user.blogs = blogs.map(b => b._id)

    await user.save()
    return blogs
}

// Get all users in DB
const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

// Get all blogs in DB
const blogsInDB = async () => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    return blogs.map(blog => blog.toJSON())
}

const blogWithoutLikesId = async (user) => {
    const blog = new Blog({
        title: "New blog without likes",
        author: "test author",
        url: "some url",
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return blog._id.toString()
}

// valid but nonexisting
const nonExistingId = async (user) => {
    const blog = new Blog({
        title: "New blog without likes",
        author: "test author",
        url: "some url",
        user: user._id
    })

    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}


module.exports = {
    createBlogs,
    createUser,
    blogsInDB,
    blogWithoutLikesId,
    nonExistingId,
    usersInDB,
}