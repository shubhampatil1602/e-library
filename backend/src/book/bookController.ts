import path from 'node:path';
import fs from 'node:fs';
import { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import createHttpError from 'http-errors';
import bookModel from './bookModel';
import { AuthRequest } from '../middlewares/authenticate';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre, description } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    '../../public/data/uploads',
    fileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: 'book-covers',
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      '../../public/data/uploads',
      bookFileName
    );
    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: 'raw',
        filename_override: bookFileName,
        folder: 'book-pdfs',
        format: 'pdf',
      }
    );

    const _req = req as AuthRequest;
    const newBook = await bookModel.create({
      title,
      genre,
      description,
      author: _req.userId,
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res.status(201).json({
      message: 'Book created successfully.',
      id: newBook._id,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, 'Error while uploading the files.'));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre, description } = req.body;
  const bookId = req.params.bookId;

  try {
    const book = await bookModel.findOne({ _id: bookId });

    if (!book) {
      return next(createHttpError(404, 'Book not found.'));
    }

    // Check access
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, 'Unauthorized.'));
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // image field
    let completeCoverImage = '';
    if (files.coverImage) {
      const fileName = files.coverImage[0].filename;
      const coverMimeType = files.coverImage[0].mimetype.split('/').at(-1);
      const filePath = path.resolve(
        __dirname,
        '../../public/data/uploads',
        fileName
      );
      completeCoverImage = fileName;
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: completeCoverImage,
        folder: 'book-covers',
        format: coverMimeType,
      });

      completeCoverImage = uploadResult.secure_url;
      await fs.promises.unlink(filePath);
    }

    // file field
    let completeFileName = '';
    if (files.file) {
      const bookFilePath = path.resolve(
        __dirname,
        '../../public/data/uploads/' + files.file[0].filename
      );

      const bookFileName = files.file[0].filename;
      completeFileName = bookFileName;

      const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: 'raw',
        filename_override: completeFileName,
        folder: 'book-pdfs',
        format: 'pdf',
      });

      completeFileName = uploadResultPdf.secure_url;
      await fs.promises.unlink(bookFilePath);
    }

    const updatedBook = await bookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        title: title,
        description: description,
        genre: genre,
        coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
        file: completeFileName ? completeFileName : book.file,
      },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    return next(createHttpError(500, 'Error while updating.'));
  }
};

const listBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookModel.find();
    res.json(books);
  } catch (error) {
    next(createHttpError(500, 'Error while getting book'));
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookModel.findOne({ _id: bookId });
    if (!book) {
      return next(createHttpError(404, 'Book not found.'));
    }
    return res.json(book);
  } catch (error) {
    next(createHttpError(500, 'Error while getting book'));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookModel.findOne({ _id: bookId });
    if (!book) {
      return next(createHttpError(404, 'Book not found.'));
    }

    // Check access
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, 'Unauthorized.'));
    }

    const coverFileSplits = book.coverImage.split('/');
    const coverImagePublicId =
      coverFileSplits.at(-2) + '/' + coverFileSplits.at(-1)?.split('.').at(-2);

    const bookFileSplits = book.file.split('/');
    const bookFilePublicId =
      bookFileSplits.at(-2) + '/' + bookFileSplits.at(-1);
    await cloudinary.uploader.destroy(coverImagePublicId);
    await cloudinary.uploader.destroy(bookFilePublicId, {
      resource_type: 'raw',
    });

    await bookModel.deleteOne({ _id: bookId });

    return res.status(204).json({
      message: 'Book deleted successfully',
      _id: bookId,
    });
  } catch (error) {
    next(createHttpError(500, 'Error while deleting book'));
  }
};

export { createBook, updateBook, listBooks, getSingleBook, deleteBook };
