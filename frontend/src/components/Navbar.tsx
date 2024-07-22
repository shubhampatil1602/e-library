import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='shadow py-4 mb-6'>
      <div className='lg:max-w-5xl w-[90%] mx-auto flex items-center justify-between'>
        <Link
          href={'/'}
          className='font-bold text-2xl italic font-serif text-orange-600'
        >
          e-lib
        </Link>

        <div className='flex gap-4'>
          <button className='h-10 rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition-all bg-white hover:border-orange-100 hover:bg-orange-100 active:border-orange-200 active:bg-orange-100'>
            Sign in
          </button>
          <button className='h-10 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600 active:bg-orange-700'>
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
