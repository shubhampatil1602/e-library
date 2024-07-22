import mongoose from 'mongoose';
import { Books } from './bookTypes';

const bookSchema = new mongoose.Schema<Books>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Books>('Book', bookSchema);
