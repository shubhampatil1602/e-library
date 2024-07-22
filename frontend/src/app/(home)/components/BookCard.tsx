import { Book } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className='w-full md:max-w-[400px] border rounded-lg flex gap-4 px-2 py-4 shadow'>
      <div className='w-[40%]'>
        <Image
          src={book.coverImage || '/book.avif'}
          alt={book.author.name}
          width={200}
          height={200}
          className='rounded-lg object-cover '
        />
      </div>
      <div className='w-[60%]'>
        <h3 className='font-bold text-lg text-orange-600 text-balance'>
          {book.title}
        </h3>
        <h4 className='font-semibold text-sm mb-3'>{book.author.name}</h4>
        <Link
          href={`/book/${book._id}`}
          className='rounded-md border border-orange-500 px-3 py-1.5 text-sm font-medium text-orange-500 transition-all bg-white hover:border-orange-100 hover:bg-orange-100 active:border-orange-200 active:bg-orange-100'
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
