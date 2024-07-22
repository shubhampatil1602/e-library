import Image from 'next/image';

const Banner = () => {
  return (
    <div className='w-full shadow-lg'>
      <div className='relative'>
        <Image
          priority={false}
          src={'/paper-bg.jpg'}
          alt='billboard'
          className='h-72 w-full rounded-lg'
          height={0}
          width={0}
          sizes='100vw'
        />
        <div className='absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-40' />
        <Image
          priority={false}
          src={'/book.png'}
          alt='billboard'
          className='absolute bottom-0 right-5'
          height={0}
          width={0}
          sizes='100vw'
          style={{ width: 'auto', height: '18rem' }}
        />
        <h3 className='absolute left-10 top-1/2 w-2/3 bg-black bg-opacity-25 px-6 py-4 rounded-lg md:w-2/4 -translate-y-1/2 text-3xl md:text-4xl font-semibold tracking-tight text-white'>
          Connect, Share and Trade Your Favourite Reads...
        </h3>
      </div>
    </div>
  );
};

export default Banner;
