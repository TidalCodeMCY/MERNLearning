import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express()

// Middleware for parsin request body.
app.use(express.json());

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Mern stack tutorial!');
});

// Route to save a new book
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title,author,publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route to get all books from the database
app.get('/books', async (request, response) => {
    try{
        const books = await Book.find({});

        return response.status(200).json({
           count: books.length,
           data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get one book from the database by id
app.get('/books/:id', async (request, response) => {
    try{
        const{ id } = request.params;

        const books = await Book.findById(id);

        return response.status(200).json(books);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to update the book
app.get('/books/:id', async (request, response) => {
    try{

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to database!');
        app.listen(PORT, () => {
            console.log(`Your app is listening on ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })