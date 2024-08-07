import path from 'node:path';
import { Router } from 'express';
import {
  createBook,
  updateBook,
  listBooks,
  getSingleBook,
  deleteBook,
} from './bookController';
import multer from 'multer';
import authenticate from '../middlewares/authenticate';

const bookRouter = Router();

const upload = multer({
  dest: path.resolve(__dirname, '../../public/data/uploads'),
  limits: { fileSize: 1e7 }, // 10 * 1024 * 1024 => 10MB
});

// Routes
bookRouter.post(
  '/',
  authenticate,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  createBook
);
bookRouter.patch(
  '/:bookId',
  authenticate,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  updateBook
);
bookRouter.get('/:bookId', getSingleBook);
bookRouter.get('/', listBooks);
bookRouter.delete('/:bookId', authenticate, deleteBook);

export default bookRouter;
