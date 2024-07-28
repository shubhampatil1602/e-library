import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const HomePage = () => {
  return (
    <>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
      </div>
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='text-2xl font-bold tracking-tight'>Welcome.</h3>
            <p className='text-sm text-muted-foreground'>
              You can add or view books added by you here.
            </p>
          </div>
          <div className='flex gap-4'>
            <Button variant={'secondary'} className='mt-4'>
              <Link to={'/dashboard/books/create'}>Add Book</Link>
            </Button>
            <Button variant={'outline'} className='mt-4'>
              <Link to={'/dashboard/books'}>View Books</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
