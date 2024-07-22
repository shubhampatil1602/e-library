import { Book } from '@/types';
import BookCard from './BookCard';

const BookList = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/books`, {
    next: {
      revalidate: 3600,
    },
  });
  if (!response.ok) {
    throw new Error(`An error occured while fetching the books.`);
  }

  const books: Book[] = await response.json();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto'>
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
