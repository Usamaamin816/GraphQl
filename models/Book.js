const mongoose = require('mongoose')
const bookSchema=  mongoose.Schema({
    name:{
        type: String
    },
    genre:{
        type:String
    },
    authorId:{
        type:String
    }
})
const Book= mongoose.model('Book',bookSchema)
module.exports = Book