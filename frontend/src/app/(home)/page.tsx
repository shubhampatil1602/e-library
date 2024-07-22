import Banner from './components/Banner';
import BookList from './components/BookList';

export default async function Home() {
  const response = await fetch(`${process.env.BACKEND_URL}/books`);
  if (!response.ok) {
    throw new Error(`An error occured while fetching the books.`);
  }

  const books = await response.json();
  console.log(books);
  return (
    <main>
      <div className='lg:max-w-5xl w-[90%] mx-auto flex flex-col gap-8'>
        <Banner />
        <BookList books={books} />
      </div>
    </main>
  );
}
