import express, { request } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";
import cors from 'cors';

const app = express()

// Middleware for parsin request body.
app.use(express.json());

// Middleware for CORS POLICY
// Option 1: Allow all origins with default of cors(*) - This is not recommended to use unless necessary!
// app.use(cors());
// Option 2: Allow custom origins - better for security reasons I believe
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Mern stack tutorial!');
});

app.use('/books', booksRoute);

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