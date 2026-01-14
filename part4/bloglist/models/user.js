const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    blogs: [
        {
        // ObjectId type = refers to another document
        type: mongoose.Schema.Types.ObjectId,
        // ref = name of the model being referenced
        ref: 'Blog'
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // password should never be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)