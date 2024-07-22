import { Book } from '@/types';
import BookCard from './BookCard';

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto'>
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
