import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/Book.js';

mongoose.connect('mongodb://localhost/bookapi');

const app = express();
const port = 3037;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('<h1>Book Site API</h1>');
});

app.post('/book', async (req, res) => {
	const book = new Book(req.body);
	await book.save();
	res.status(200).json({ message: 'added book', book });
});

app.delete('/book/:id', async (req, res) => {
	const id = req.params.id;
	const book = await Book.find({ _id: id });
	await Book.deleteOne({ _id: id });
	console.log(book);
	res.status(200).json({ message: 'deleted book', book });
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
