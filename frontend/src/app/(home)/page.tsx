import { Suspense } from 'react';
import Banner from './components/Banner';
import BookList from './components/BookList';

export default function Home() {
  return (
    <main>
      <div className='lg:max-w-5xl w-[90%] mx-auto flex flex-col gap-8'>
        <Banner />
        <Suspense fallback={'Loading...'}>
          <BookList />
        </Suspense>
      </div>
    </main>
  );
}
