const mongoose= require('mongoose');
const {Schema}=mongoose;

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    comments: [String]});

const Book=mongoose.model('Book', bookSchema);

exports.Book = Book;