import { Book } from '@/types';
import Image from 'next/image';
import DownloadButton from './components/DownloadButton';

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {
  let book: Book | null = null;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/books/${params.bookId}`,
      {
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      throw new Error(`An error occured while fetching the book.`);
    }
    book = await response.json();
  } catch (error) {
    throw new Error(`Error fetching book. ${error}`);
  }

  if (!book) {
    throw new Error('Book not found.');
  }
  return (
    <div className='lg:max-w-4xl h-full w-[90%] mx-auto flex flex-col-reverse gap-4 md:flex-row md:justify-between p-4'>
      <div className='min-h-[500px]'>
        <h1 className='font-bold text-4xl italic font-serif mb-3'>
          {book.title}
        </h1>
        <p className='text-slate-600 mb-3'>{book.description}</p>
        <DownloadButton fileLink={book.file} />
      </div>
      <div className='mt-4'>
        <Image
          src={book.coverImage || '/book.avif'}
          alt={book.author.name}
          width={200}
          height={200}
          className='rounded-lg object-cover mx-auto'
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
