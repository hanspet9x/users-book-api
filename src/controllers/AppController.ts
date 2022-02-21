import express from 'express';
import BookController from './book/BookController';

const AppController = express.Router();

AppController.use('/books', BookController);
export default AppController;
